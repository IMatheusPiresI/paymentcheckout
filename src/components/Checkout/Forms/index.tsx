import React, {useEffect} from 'react';
import {Text, VStack} from 'native-base';
import {FormShipping} from './Steps/Shipping';

import {useSelector} from 'react-redux';
import {FormPayment} from './Steps/Payment/Index';
import {FormReview} from './Steps/Review';
import {Complete} from './Steps/Complete';

export const Form = () => {
  const state = useSelector((state: any) => state.checkoutReducer);

  const renderHeaderForm = () => {
    console.log('executei header');
    let title, subtitle;
    switch (state.currentStep) {
      case 'Shipping':
        title = 'Enter your shipping address';
        subtitle = '';
        break;

      case 'Payment':
        title = 'Choose a payment method';
        subtitle =
          'You will be changed until you review this order on the next page.';
        break;

      case 'Review':
        title = 'Please confirm and submit your order';
        subtitle =
          "By clicking submit order, you agree to Fintory's Terms of Use and Privacy Policy";
        break;
      default:
        return null;
    }

    return (
      <VStack paddingX="4" paddingY="2">
        <Text
          color="black"
          fontWeight="bold"
          fontSize="xl"
          mt="2"
          mb={!subtitle ? '2' : '0'}>
          {title}
        </Text>
        {subtitle && (
          <Text color="gray.600" mb="2" fontSize="sm">
            {subtitle}
          </Text>
        )}
      </VStack>
    );
  };

  const renderForm = () => {
    switch (state.currentStep) {
      case 'Shipping':
        return <FormShipping />;
      case 'Payment':
        return <FormPayment />;
      case 'Review':
        return <FormReview />;
      case 'Complete':
        return <Complete />;
      default:
        null;
    }
  };

  return (
    <VStack flex="1">
      {renderHeaderForm()}
      {renderForm()}
    </VStack>
  );
};
