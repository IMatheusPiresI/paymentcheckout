import {Box, Checkbox, HStack, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {ScrollView, Radio} from 'native-base';
import {ButtonConfirm} from '../../../ButtonConfirm';
import {InputLabelForm} from '../../InputLabel';

import {useForm} from 'react-hook-form';
import {PaymentForm} from '../../../../../@types/forms';

import {Creators} from '../../../../../store/ducks/checkout';
import {useDispatch, useSelector} from 'react-redux';
import {PaymentTypes} from '../../../PaymentTypes';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {PaymentTypeSelected} from '../../PaymentTypeSelected';
import {ReduxState} from '../../../../../@types/redux';

const schema = yup.object({
  nameCard: yup.string().required(),
  cardNumber: yup
    .number()
    .typeError('This field only accepts numbers')
    .required('Card number is required'),
  expirationDate: yup
    .number()
    .typeError('This field only accepts numbers')
    .required('Expiration date is required'),
  securityCode: yup
    .number()
    .typeError('This field only accepts numbers')
    .required('Security code is required'),
});

export const FormPayment: React.FC = () => {
  const {
    steps: {payment},
  } = useSelector((state: ReduxState) => state.checkoutReducer);
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<PaymentForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      cardNumber: String(payment.data.cardNumber),
      expirationDate: String(payment.data.expirationDate),
      nameCard: payment.data.nameCard,
      securityCode: String(payment.data.securityCode),
    },
  });

  // REMOVER

  const handleSubmitForm = (data: PaymentForm) => {
    dispatch(
      Creators.completeStep({
        currentStep: 'Payment',
        payment: {
          data: {
            cardNumber: data.cardNumber,
            expirationDate: data.expirationDate,
            nameCard: data.nameCard,
            securityCode: data.securityCode,
            paymentType: payment.data.paymentType,
          },
        },
      }),
    );
  };

  console.log(payment.data);
  return (
    <VStack flex="1">
      {payment.data.paymentType !== '' ? (
        <>
          <ScrollView
            paddingX="4"
            flex="1"
            showsVerticalScrollIndicator={false}>
            <Box mb="4">
              <PaymentTypeSelected />
            </Box>

            <Box mb="2">
              <InputLabelForm
                paymentNames="nameCard"
                label="Name on card"
                placeholder="Name on card"
                paymentControl={control}
                error={errors.nameCard}
              />
            </Box>
            <Box mb="2">
              <InputLabelForm
                paymentNames="cardNumber"
                label="Card number"
                placeholder="Card number"
                maxLength={16}
                keyboardType="numeric"
                paymentControl={control}
                error={errors.cardNumber}
              />
            </Box>
            <HStack justifyContent="space-between">
              <Box mb="2">
                <InputLabelForm
                  paymentNames="expirationDate"
                  label="Expiration date"
                  placeholder="MM/YY"
                  keyboardType="numeric"
                  maxLength={4}
                  paymentControl={control}
                  error={errors.expirationDate}
                  horizontal
                />
              </Box>
              <Box mb="2">
                <InputLabelForm
                  paymentNames="securityCode"
                  label="Security code"
                  placeholder="CVC"
                  keyboardType="numeric"
                  maxLength={3}
                  paymentControl={control}
                  error={errors.securityCode}
                  horizontal
                />
              </Box>
            </HStack>
            <Checkbox
              isChecked={isChecked}
              value="check"
              onTouchEnd={() => setIsChecked(!isChecked)}
              colorScheme="light"
              size="md"
              my="2">
              <Text fontSize="md" mr="5" color="dark.950">
                My billing address is the same as my shipping address
              </Text>
            </Checkbox>
          </ScrollView>
          <ButtonConfirm
            title="Confirm and continue"
            onPress={handleSubmit(handleSubmitForm)}
            opacity={isValid && isChecked ? 1 : 0.5}
            disabled={!(isChecked && isValid)}
          />
        </>
      ) : (
        <PaymentTypes />
      )}
    </VStack>
  );
};
