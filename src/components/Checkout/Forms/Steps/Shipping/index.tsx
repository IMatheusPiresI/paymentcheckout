import React, {useEffect} from 'react';
import {Box, ScrollView, VStack} from 'native-base';

import {useForm} from 'react-hook-form';
import {InputLabelForm} from '../../InputLabel';
import {ShippingForm} from '../../../../../@types/forms';
import {ButtonConfirm} from '../../../ButtonConfirm';

import {useDispatch, useSelector} from 'react-redux';
import {Creators} from '../../../../../store/ducks/checkout';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object({
  country: yup.string().required('Country is required').trim(),
  fullName: yup.string().required('Full name is required').trim(),
  streetAddress: yup.string().required('Street address is required').trim(),
  city: yup.string().required('City is required').trim(),
  number: yup.string().required('Number is required'),
});

export const FormShipping: React.FC = () => {
  const {
    steps: {shipping},
  } = useSelector((state: any) => state.checkoutReducer);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<ShippingForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      city: shipping.data.city,
      country: shipping.data.country,
      fullName: shipping.data.fullName,
      number: shipping.data.number,
      streetAddress: shipping.data.streetAddress,
    },
  });
  const dispatch = useDispatch();

  const handleSubmitForm = (data: ShippingForm) => {
    console.log(data);
    dispatch(
      Creators.completeStep({
        currentStep: 'Shipping',
        shipping: {
          data: {
            city: data.city,
            country: data.country,
            fullName: data.fullName,
            number: data.number,
            streetAddress: data.streetAddress,
          },
        },
      }),
    );
  };

  return (
    <VStack flex="1">
      <ScrollView
        padding="4"
        flex="1"
        contentContainerStyle={{paddingBottom: 30}}
        showsVerticalScrollIndicator={false}>
        <Box marginBottom="3">
          <InputLabelForm
            label="Country"
            shippingControl={control}
            placeholder="Country"
            shippingNames="country"
            error={errors.country}
            isShipping
            required
          />
        </Box>
        <Box marginBottom="3">
          <InputLabelForm
            label="Full Name"
            shippingControl={control}
            placeholder="Full Name"
            shippingNames="fullName"
            error={errors.fullName}
            isShipping
            required
          />
        </Box>
        <Box marginBottom="3">
          <InputLabelForm
            label="Street address"
            shippingControl={control}
            placeholder="Street address"
            shippingNames="streetAddress"
            error={errors.streetAddress}
            isShipping
            required
          />
        </Box>
        <Box marginBottom="3">
          <InputLabelForm
            label="City"
            shippingControl={control}
            placeholder="City"
            shippingNames="city"
            error={errors.city}
            isShipping
            required
          />
        </Box>
        <Box marginBottom="3">
          <InputLabelForm
            label="Number"
            shippingControl={control}
            placeholder="Number"
            shippingNames="number"
            keyboardType="numeric"
            error={errors.number}
            isShipping
            required
          />
        </Box>
      </ScrollView>
      <ButtonConfirm
        title="Confirm and continue"
        onPress={handleSubmit(handleSubmitForm)}
        opacity={isValid ? 1 : 0.5}
        disabled={!isValid}
      />
    </VStack>
  );
};
