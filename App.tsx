import React from 'react';
import {DripsyProvider} from 'dripsy';
import {theme} from './src/theme';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home.screen';
import ProductDetailScreen from './src/screens/ProductDetails.screen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DripsyProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DripsyProvider>
  );
}
