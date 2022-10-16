import React, {useCallback, useEffect, useState} from 'react';
import {Box, Button, HStack, Text, IButtonProps} from 'native-base';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

import {useDispatch, useSelector} from 'react-redux';
import {ReduxState, ReduxStep} from '../../../@types/redux';
import {Creators} from '../../../store/ducks/checkout';

type ButtonStatusProps = {
  stepNumber: number;
  title: ReduxStep;
};

export const ButtonStatus: React.FC<ButtonStatusProps> = ({
  stepNumber,
  title,
}) => {
  const state = useSelector((state: ReduxState) => state.checkoutReducer);
  const dispatch = useDispatch();
  const [step, setStep] = useState<'shipping' | 'review' | 'payment'>(
    'shipping',
  );

  const applyOpacity = useCallback(() => {
    if (!state.steps[step].complete && state.currentStep !== title) {
      return 0.5;
    } else {
      return 1;
    }
  }, [state]);

  useEffect(() => {
    if (title === 'Payment') {
      return setStep('payment');
    } else if (title === 'Review') {
      return setStep('review');
    } else {
      return;
    }
  }, []);

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
          bgColor={state.steps[step].complete ? 'emerald.500' : 'black'}>
          {state.steps[step].complete ? (
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
