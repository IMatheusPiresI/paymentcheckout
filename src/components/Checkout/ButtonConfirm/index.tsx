import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

import {Box, Button, IButtonProps, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type ButtonConfirmProps = {
  title: string;
} & IButtonProps;

export const ButtonConfirm: React.FC<ButtonConfirmProps> = ({
  title,
  ...rest
}) => {
  const heightValue = useSharedValue(128);

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
        heightValue.value = withTiming(128, {duration: 600});
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
        },
      ]}>
      <Button
        width="full"
        bgColor="black"
        mt="5"
        leftIcon={<MaterialIcons name="chevron-left" size={20} color="#FFF" />}
        rightIcon={
          <MaterialIcons name="chevron-right" size={20} color="#FFF" />
        }
        {...rest}>
        <Text color="#FFF" bottom="1px">
          {title}
        </Text>
      </Button>
    </Animated.View>
  );
};
