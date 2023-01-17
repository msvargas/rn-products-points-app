import React from 'react';
import {H2, Text, ScrollView, Image, Box} from 'dripsy';
import Button from '../components/Button';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Product} from '../types/Product.types';
import {formatDate} from '../helpers';

export default function ProductDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const product = (route.params as {product: Product})?.product;

  return (
    <Box variant="layout.screen">
      <Box sx={{bg: '#CFD6FF', height: 150, justifyContent: 'flex-end'}}>
        <H2 sx={{mx: 20, mb: '$3', pb: '$2'}}>{product.product}</H2>
      </Box>
      {/* @ts-ignore bad type */}
      <ScrollView
        contentContainerSx={{
          px: 20,
        }}>
        <Box
          sx={{
            mt: '$3',
            boxShadow: 'md',
            bg: '$white',
            height: 350,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Image
            source={{
              uri: product.image,
            }}
            sx={{
              width: isImageLoading ? 200 : '100%',
              height: isImageLoading ? 200 : '100%',
              borderRadius: 10,
            }}
            defaultSource={require('../../assets/placeholder-image.png')}
            onLoadEnd={() => setIsImageLoading(false)}
          />
        </Box>
        <Text variant="label" sx={{mt: '$4'}}>
          Detalles del producto:
        </Text>
        <Text sx={{fontWeight: '800', fontSize: 16}}>
          Comprado el{' '}
          {formatDate(product.createdAt, {
            month: 'long',
            day: 'numeric',
          })}
          {', '}
          {formatDate(product.createdAt, {
            year: 'numeric',
          })}
        </Text>
        <Text variant="label" sx={{pb: '$4'}}>
          Con esta compra acumulaste:
        </Text>
        <Text sx={{fontWeight: '800', fontSize: 24, lineHeight: 33}}>
          {product.points} puntos
        </Text>
      </ScrollView>
      <Button sx={{my: 40, mx: 20}} onPress={navigation.goBack}>
        Aceptar
      </Button>
    </Box>
  );
}
