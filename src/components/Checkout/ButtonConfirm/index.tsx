import React, {useEffect} from 'react';
import {Keyboard} from 'react-native';

import {Box, Button, HStack, IButtonProps, Text, VStack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useSelector} from 'react-redux';
import {ReduxState} from '../../../@types/redux';

type ButtonConfirmProps = {
  title: string;
} & IButtonProps;

export const ButtonConfirm: React.FC<ButtonConfirmProps> = ({
  title,
  ...rest
}) => {
  const state = useSelector((state: ReduxState) => state.checkoutReducer);
  const renderHeight = state.currentStep === 'Review' ? 255 : 95;
  const heightValue = useSharedValue(renderHeight);

  const reanimatedStyleContainer = useAnimatedStyle(() => ({
    height: heightValue.value,
  }));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        heightValue.value = withTiming(0, {duration: 600});
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        heightValue.value = withTiming(renderHeight, {duration: 600});
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <Animated.View
      style={[
        reanimatedStyleContainer,
        {
          backgroundColor: '#fff',
          paddingHorizontal: 32,
          justifyContent: 'flex-end',
          overflow: 'hidden',
        },
      ]}>
      {state.currentStep === 'Review' && (
        <VStack
          borderWidth="1"
          borderColor="gray.300"
          bgColor="gray.100"
          p="4"
          mb="2"
          borderRadius="xl">
          <Text fontWeight="bold" fontSize={17} mb="2">
            Order summary
          </Text>
          <HStack justifyContent="space-between" mb="2">
            <Text color="gray.600">Subtotal</Text>
            <Text fontWeight="bold">$86.70</Text>
          </HStack>
          <HStack justifyContent="space-between" mb="2">
            <Text color="gray.600">Delivery</Text>
            <Text fontWeight="bold">$9.90</Text>
          </HStack>
          <HStack justifyContent="space-between" mb="2">
            <Text fontWeight="bold">Total</Text>
            <Text fontWeight="bold">$9.90</Text>
          </HStack>
        </VStack>
      )}
      <Box>
        <Button
          width="full"
          bgColor="black"
          mb="10"
          leftIcon={
            state.currentStep === 'Complete' ? (
              <MaterialIcons name="chevron-left" size={20} color="#FFF" />
            ) : undefined
          }
          rightIcon={
            state.currentStep !== 'Complete' ? (
              <MaterialIcons name="chevron-right" size={20} color="#FFF" />
            ) : undefined
          }
          {...rest}>
          <Text color="#FFF" bottom="1px">
            {title}
          </Text>
        </Button>
      </Box>
    </Animated.View>
  );
};
