import React from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  Row,
  Image,
  Box,
  ActivityIndicator,
} from 'dripsy';
import Button from '../components/Button';
import TouchableOpacityBox from '../components/TouchableOpacityBox';
import {useNavigation} from '@react-navigation/native';
import useFetch from '../hooks/useFetch';
import {API_BASE_URL} from '../constants';
import {ProductList} from '../types/Product.types';
import {formatDate, formatNumber} from '../helpers';

enum MovementsType {
  all = 'all',
  earned = 'earned',
  redeemed = 'redeemed',
}

export default function HomeScreen() {
  const {data: products, isLoading} = useFetch<ProductList>(
    `${API_BASE_URL}/products`,
  );
  const navigation = useNavigation();
  const [movementsType, setMovementsType] = React.useState<MovementsType>(
    MovementsType.earned,
  );
  const totalPoints = React.useMemo(
    () =>
      products?.reduce(
        (acc, item) =>
          item.is_redemption ? acc - item.points : acc + item.points,
        0,
      ),
    [products],
  );

  const renderFooter = () => {
    switch (movementsType) {
      case MovementsType.all:
        return (
          <Row sx={{my: '$2', mt: 43}}>
            <Button
              sx={{flex: 1, mr: '$2'}}
              onPress={() => setMovementsType(MovementsType.earned)}>
              Ganados
            </Button>
            <Button
              sx={{flex: 1, ml: '$1'}}
              onPress={() => setMovementsType(MovementsType.redeemed)}>
              Canjeados
            </Button>
          </Row>
        );
      default:
        return (
          <Button
            sx={{my: '$2', mt: 43}}
            onPress={() => setMovementsType(MovementsType.all)}>
            Todos
          </Button>
        );
    }
  };

  return (
    <SafeAreaView variant="layout.screen">
      <Box
        sx={{
          flex: 1,
          px: 20,
        }}>
        <Text sx={{fontSize: '$3', mt: '$3'}}>
          <Text
            sx={{
              fontWeight: '800',
              fontSize: 20,
            }}>
            Bienvenido de vuelta! {'\n'}
          </Text>
          Ruben Rodriguez
        </Text>
        <Text variant="label">TUS PUNTOS</Text>
        <Box
          sx={{
            width: '100%',
            maxWidth: 286,
            alignSelf: 'center',
            height: 143,
            bg: '$primary',
            borderRadius: 20,
            boxShadow: 'md',
            p: '$3',
          }}>
          <Text
            sx={{
              color: '$white',
              fontWeight: '800',
              fontSize: '$3',
              lineHeight: 22,
              p: '$2',
              textTransform: 'capitalize',
            }}>
            {formatDate(new Date(), {month: 'long'})}
          </Text>
          {isLoading ? (
            <ActivityIndicator color="$white" sx={{my: '$3'}} />
          ) : (
            <Text
              sx={{
                fontWeight: '800',
                fontSize: '$6',
                lineHeight: 44,
                color: '$white',
                textAlign: 'center',
              }}>
              {formatNumber(totalPoints, {
                style: 'decimal',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
              {' pts'}
            </Text>
          )}
        </Box>
        <Text variant="label">TUS MOVIMIENTOS</Text>
        {/* @ts-ignore bad type */}
        <ScrollView sx={{bg: '$white', borderRadius: 10, maxHeight: 350}}>
          {isLoading && (
            <ActivityIndicator
              size="large"
              sx={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            />
          )}
          {products
            ?.filter(product =>
              movementsType === MovementsType.all
                ? true
                : movementsType === MovementsType.redeemed
                ? product.is_redemption
                : !product.is_redemption,
            )
            ?.map((product, index) => (
              <TouchableOpacityBox
                key={product.id}
                accessibilityRole="button"
                onPress={() => {
                  // @ts-ignore bad type
                  navigation.navigate('ProductDetails', {product});
                }}
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Row
                  sx={{
                    alignItems: 'center',
                    mt: index === 0 ? 23 : '$1',
                    mb: index === products.length - 1 ? 20 : '$1',
                    height: 55,
                  }}>
                  <Image
                    source={{
                      uri: product.image,
                    }}
                    defaultSource={require('../../assets/placeholder-image.png')}
                    sx={{
                      borderRadius: 10,
                      ml: 10,
                    }}
                    width={55}
                    height={55}
                  />
                  <Box
                    sx={{
                      px: '$2',
                      flexGrow: 0,
                      flexShrink: 1,
                      alignSelf: 'flex-start',
                    }}>
                    <Text
                      numberOfLines={2}
                      sx={{
                        fontSize: '$1',
                        fontWeight: '800',
                        mb: 3,
                      }}>
                      {product.product}
                    </Text>
                    <Text>
                      {formatDate(product.createdAt, {
                        month: 'long',
                        day: 'numeric',
                      })}
                      {', '}
                      {formatDate(product.createdAt, {
                        year: 'numeric',
                      })}
                    </Text>
                  </Box>
                </Row>
                <Row
                  sx={{
                    alignItems: 'center',
                    mr: 10,
                  }}>
                  <Text sx={{pr: '$3', fontWeight: '800', fontSize: 16}}>
                    <Text
                      sx={{
                        color: product.is_redemption ? '$red' : '$green',
                        fontWeight: '800',
                      }}>
                      {product.is_redemption ? '-' : '+'}
                    </Text>
                    {product.points}
                  </Text>
                  <Image
                    source={require('../../assets/arrow-right.png')}
                    width={10}
                    height={10}
                  />
                </Row>
              </TouchableOpacityBox>
            ))}
        </ScrollView>
        {renderFooter()}
      </Box>
    </SafeAreaView>
  );
}
