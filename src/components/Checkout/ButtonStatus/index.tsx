import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, HStack, Text, IButtonProps} from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {useDispatch, useSelector} from 'react-redux';
import {ReduxStep} from '../../../@types/redux';
import {Creators} from '../../../store/ducks/checkout';

type ButtonStatusProps = {
  stepNumber: number;
  title: ReduxStep;
};

export const ButtonStatus: React.FC<ButtonStatusProps> = ({
  stepNumber,
  title,
}) => {
  const state = useSelector((state: any) => state.checkoutReducer);
  const dispatch = useDispatch();

  const applyOpacity = useCallback(() => {
    console.log(state.steps);
    const step = title.toLowerCase();
    if (!state.steps[step].complete && state.currentStep !== title) {
      return 0.5;
    } else {
      return 1;
    }
  }, [state]);

  const handleGoBackToStep = () => {
    if (state.currentStep === title || state.steps.review.complete) return;
    if (title === 'Payment' && !state.steps.shipping.complete) return;

    return dispatch(
      Creators.goBackToStep({
        currentStep: title,
      }),
    );
  };

  return (
    <Button
      p="0"
      variant="ghost"
      bgColor="transparent"
      onPress={handleGoBackToStep}>
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
    </Button>
  );
};
