import {Box, Text, VStack} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {ButtonConfirm} from '../../../ButtonConfirm';
import {useNavigation} from '@react-navigation/native';
import {Creators} from '../../../../../store/ducks/checkout';

export const Complete: React.FC = () => {
  const {steps} = useSelector((state: any) => state.checkoutReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleGoBackHome = () => {
    navigation.navigate('Home');
    dispatch(
      Creators.completeStep({
        currentStep: 'Complete',
      }),
    );
  };
  return (
    <VStack flex="1" justifyContent="center" bgColor="white">
      <VStack alignItems="center" justifyContent="center" w="full" flex="1">
        <Box borderWidth="1" borderColor="green.400" p="8" borderRadius="xl">
          <IconAntDesign name="checkcircle" size={40} color="#2dcc42" />
        </Box>
        <Text fontWeight="bold" fontSize="3xl" mt="5" mb="5">
          We're on it!
        </Text>
        <Text textAlign="center" mb="4">
          Your payment has been received and you'll {'\n'}
          get notifications for your order's state.
        </Text>
      </VStack>
      <ButtonConfirm title="Go back to home" onPress={handleGoBackHome} />
    </VStack>
  );
};
