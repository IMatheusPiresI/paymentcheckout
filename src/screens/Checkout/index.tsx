import {useNavigation} from '@react-navigation/native';
import {Button, HStack, StatusBar, Text, VStack} from 'native-base';
import React from 'react';
import {Form} from '../../components/Checkout/Forms';
import {HeaderStatus} from '../../components/Checkout/HeaderStatus';

export const Checkout: React.FC = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <VStack flex="1">
      <StatusBar barStyle={'light-content'} backgroundColor="#000" />
      <HStack
        justifyContent="center"
        backgroundColor="#000"
        height="20"
        alignItems="center">
        <Button
          position="absolute"
          left="2"
          variant="ghost"
          backgroundColor="transparent"
          onPress={handleGoBack}>
          <Text color="#fff8">Cancel</Text>
        </Button>

        <Text color="#FFF" fontSize="2xl">
          Checkout
        </Text>
      </HStack>
      <HeaderStatus />
      <Form />
    </VStack>
  );
};
