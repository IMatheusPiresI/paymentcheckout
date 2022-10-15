import React from 'react';
import {
  ShippingNames,
  ShippingForm,
  PaymentForm,
  PaymentNames,
} from '../../../../@types/forms';

import {Control, Controller} from 'react-hook-form';
import {TextInput, TextInputProps} from 'react-native';

type ControlledInputProps = {
  shippingControl?: Control<ShippingForm>;
  shippingNames?: ShippingNames;
  paymentControl?: Control<PaymentForm>;
  paymentNames?: PaymentNames;
  isShipping?: boolean;
} & TextInputProps;

export const ControlledInput: React.FC<ControlledInputProps> = ({
  shippingControl,
  shippingNames,
  paymentControl,
  paymentNames,
  isShipping,
  ...rest
}) => {
  return (
    <>
      {isShipping ? (
        <Controller
          name={shippingNames!}
          control={shippingControl}
          render={({field: {onChange, value}}) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              {...rest}
              style={{
                width: '100%',
                height: 45,
                borderWidth: 1,
                borderColor: '#c1c1c1',
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
            />
          )}
        />
      ) : (
        <Controller
          name={paymentNames!}
          control={paymentControl}
          render={({field: {onChange, value}}) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              {...rest}
              style={{
                width: '100%',
                height: 45,
                borderWidth: 1,
                borderColor: '#c1c1c1',
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
            />
          )}
        />
      )}
    </>
  );
};
