import {Button, HStack, Image, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import IconEntypo from 'react-native-vector-icons/Entypo';
import {ButtonConfirm} from '../../../ButtonConfirm';
import {Creators} from '../../../../../store/ducks/checkout';
import {getPaymentInfo} from '../../../../../utils/renderImagePayment';
import {ReduxState} from '../../../../../@types/redux';

export const FormReview: React.FC = () => {
  const {
    steps: {payment, shipping},
  } = useSelector((state: ReduxState) => state.checkoutReducer);
  const dispatch = useDispatch();
  const paymentInfo = getPaymentInfo(payment.data.paymentType);

  const renderLastPaymentCardNumber = () => {
    const lastItem: number = payment.data.cardNumber.length;
    return payment.data.cardNumber.slice(lastItem - 4, lastItem);
  };

  const renderShippingInfo = (shippingInfo: string) => {
    if (shippingInfo.length > 20) {
      return `${shippingInfo.slice(0, 20)}...`;
    }
    return shippingInfo;
  };

  const handleConfirmPayment = () => {
    dispatch(
      Creators.completeStep({
        currentStep: 'Review',
      }),
    );
  };

  return (
    <VStack flex="1">
      <ScrollView px="4" flex="1" showsVerticalScrollIndicator={false} mb="1">
        <VStack borderWidth={1} borderColor="gray.300" p="5" borderRadius="2xl">
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" fontSize={17}>
              Payment
            </Text>
            <Button p={0} bgColor="transparent" variant="ghost">
              <Text color="cyan.500" fontWeight="bold" letterSpacing={'lg'}>
                Edit
              </Text>
            </Button>
          </HStack>
          <HStack mt="4" justifyContent="space-between">
            <HStack>
              <Image
                source={paymentInfo.image}
                alt="payment method"
                width="16"
                height="5"
                resizeMode="contain"
              />
              <HStack mx="2">
                <IconEntypo
                  name="dots-two-horizontal"
                  size={20}
                  color="#0006"
                />
                <IconEntypo
                  name="dots-two-horizontal"
                  size={20}
                  style={{right: 3}}
                  color="#0006"
                />
                <Text color="gray.900">{renderLastPaymentCardNumber()}</Text>
              </HStack>
            </HStack>
            <Text color="gray.900">{payment.data.expirationDate}</Text>
          </HStack>
        </VStack>
        <VStack
          borderWidth={1}
          borderColor="gray.300"
          p="5"
          borderRadius="2xl"
          mt="4">
          <HStack justifyContent="space-between">
            <Text fontWeight="bold" fontSize={17}>
              Shipping address
            </Text>
            <Button p={0} bgColor="transparent" variant="ghost">
              <Text color="cyan.500" fontWeight="bold" letterSpacing={'lg'}>
                Edit
              </Text>
            </Button>
          </HStack>
          <VStack mt="4">
            <HStack justifyContent="space-between">
              <Text color="gray.600">Name</Text>
              <Text>{renderShippingInfo(shipping.data.fullName)}</Text>
            </HStack>
            <HStack justifyContent="space-between" mt="2">
              <Text color="gray.600">Street</Text>
              <Text>{renderShippingInfo(shipping.data.streetAddress)}</Text>
            </HStack>
            <HStack justifyContent="space-between" mt="2">
              <Text color="gray.600">Country</Text>
              <Text>{renderShippingInfo(shipping.data.country)}</Text>
            </HStack>
            <HStack justifyContent="space-between" mt="2">
              <Text color="gray.600">Number</Text>
              <Text>{renderShippingInfo(shipping.data.number)}</Text>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
      <ButtonConfirm
        title="Confirm payment info"
        onPress={handleConfirmPayment}
      />
    </VStack>
  );
};
