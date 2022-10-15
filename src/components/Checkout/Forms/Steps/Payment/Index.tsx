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
import {PaymentTypeRadio} from '../../../PaymentTypeRadio';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object({
  nameCard: yup.string().required(),
  cardNumber: yup.string().required(),
  expirationDate: yup.string().required(),
  securityCode: yup.string().required(),
});

export const FormPayment: React.FC = () => {
  const {steps} = useSelector((state: any) => state.checkoutReducer);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<PaymentForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {},
  });
  const dispatch = useDispatch();

  const handleSubmitForm = (data: PaymentForm) => {
    dispatch(
      Creators.completeStep({
        currentStep: 'Payment',
        payment: {
          data: {
            ...data,
            paymentType: {
              title: steps.payment.data.paymentType.title,
              image: steps.payment.data.paymentType.image,
              type: steps.payment.data.paymentType.type,
            },
          },
        },
      }),
    );
  };

  const handleChangePaymentType = () => {
    dispatch(
      Creators.paymentType({
        image: null,
        title: '',
        type: '',
      }),
    );
  };

  useEffect(() => {
    console.log(steps.payment.data.paymentType);
  }, [steps]);

  return (
    <VStack flex="1">
      {steps.payment.data.paymentType.type !== '' ? (
        <>
          <ScrollView
            paddingX="4"
            flex="1"
            showsVerticalScrollIndicator={false}>
            <Box mb="4">
              <Radio.Group
                name="radioGroup"
                value={steps.payment.data.paymentType.type}
                colorScheme={'light'}>
                <PaymentTypeRadio
                  title={steps.payment.data.paymentType.title}
                  image={steps.payment.data.paymentType.image}
                  value={steps.payment.data.paymentType.type}
                  button
                  onPress={handleChangePaymentType}
                />
              </Radio.Group>
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
