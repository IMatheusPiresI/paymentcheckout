import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Text, VStack, StatusBar, Button} from 'native-base';

export const Home: React.FC = () => {
  const navigation = useNavigation();

  const handleGoCheckout = () => {
    navigation.navigate('Checkout');
  };

  return (
    <VStack flex={1} bgColor="#fff" alignItems="center" justifyContent="center">
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text fontSize="3xl" marginBottom="12">
        Payment Flow
      </Text>
      <Button onPress={handleGoCheckout}>Go to checkout</Button>
    </VStack>
  );
};
