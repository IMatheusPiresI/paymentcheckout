import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, HStack, Text, IButtonProps} from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {useSelector} from 'react-redux';
import {ReduxStep} from '../../../@types/redux';

type ButtonStatusProps = {
  stepNumber: number;
  title: ReduxStep;
};

export const ButtonStatus: React.FC<ButtonStatusProps> = ({
  stepNumber,
  title,
}) => {
  const state = useSelector((state: any) => state.checkoutReducer);

  const applyOpacity = useCallback(() => {
    console.log(state.steps);
    if (
      !state.steps[title.toLowerCase()].complete &&
      state.currentStep !== title
    ) {
      return 0.5;
    } else {
      return 1;
    }
  }, [state]);

  useEffect(() => {
    console.log(state.steps.payment.data.paymentType);
  }, []);

  return (
    <HStack alignItems="center" opacity={applyOpacity()}>
      <Box
        w="7"
        h="7"
        alignItems="center"
        justifyContent="center"
        borderRadius="full"
        bgColor={
          state.steps[title.toLowerCase()].complete ? 'emerald.500' : 'black'
        }>
        {state.steps[title.toLowerCase()].complete ? (
          <IconFontAwesome name="check" size={15} color="#FFF" />
        ) : (
          <Text fontSize={14} color="#FFF">
            {stepNumber}
          </Text>
        )}
      </Box>
      <Text ml="2">{title}</Text>
    </HStack>
  );
};
