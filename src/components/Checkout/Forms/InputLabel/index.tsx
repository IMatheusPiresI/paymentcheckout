import {HStack, VStack, Text} from 'native-base';
import React from 'react';
import {Control, FieldError} from 'react-hook-form';
import {TextInputProps} from 'react-native';
import {
  PaymentForm,
  PaymentNames,
  ShippingForm,
  ShippingNames,
} from '../../../../@types/forms';
import {ControlledInput} from '../ControlledInput';

type InputProps = {
  label: string;
  required?: boolean;
  placeholder: string;
  shippingControl?: Control<ShippingForm>;
  shippingNames?: ShippingNames;
  paymentControl?: Control<PaymentForm>;
  paymentNames?: PaymentNames;
  horizontal?: boolean;
  error?: FieldError;
  isShipping?: boolean;
} & TextInputProps;

export const InputLabelForm: React.FC<InputProps> = ({
  label,
  required,
  shippingControl,
  shippingNames,
  paymentControl,
  paymentNames,
  horizontal,
  error,
  isShipping,
  ...rest
}) => {
  return (
    <VStack w={horizontal ? '40' : 'auto'}>
      <HStack mb="2">
        <Text color="black" fontWeight="medium" fontSize="md">
          {label}
        </Text>
        {required && (
          <Text color="cyan.400" fontSize={18} ml="1.5" top="2px">
            *
          </Text>
        )}
      </HStack>
      <ControlledInput
        shippingControl={shippingControl}
        shippingNames={shippingNames}
        paymentNames={paymentNames}
        paymentControl={paymentControl}
        isShipping={isShipping}
        {...rest}
      />
      {error?.message && (
        <Text color="red.600" fontSize="sm">
          {error?.message}
        </Text>
      )}
    </VStack>
  );
};
