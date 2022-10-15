import {Button, HStack, Image, ScrollView, Text, VStack} from 'native-base';
import React from 'react';
import {useSelector} from 'react-redux';

import IconEntypo from 'react-native-vector-icons/Entypo';
import {ButtonConfirm} from '../../../ButtonConfirm';

export const FormReview: React.FC = () => {
  const {steps} = useSelector((state: any) => state.checkoutReducer);
  return (
    <VStack flex="1">
      <ScrollView px="4" mb="32">
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
                source={steps.payment.data.paymentType.image}
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
                <Text color="gray.900">1321</Text>
              </HStack>
            </HStack>
            <Text color="gray.900">01/21</Text>
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
              <Text>Luke Skywalker</Text>
            </HStack>
            <HStack justifyContent="space-between" mt="2">
              <Text color="gray.600">Street</Text>
              <Text>Luke Skywalker</Text>
            </HStack>
            <HStack justifyContent="space-between" mt="2">
              <Text color="gray.600">Country</Text>
              <Text>Luke Skywalker</Text>
            </HStack>
            <HStack justifyContent="space-between" mt="2">
              <Text color="gray.600">Number</Text>
              <Text>Luke Skywalker</Text>
            </HStack>
            <HStack justifyContent="space-between" mt="2">
              <Text color="gray.600">Number</Text>
              <Text>Luke Skywalker</Text>
            </HStack>
          </VStack>
        </VStack>
      </ScrollView>
      <ButtonConfirm title="Confirm payment info" />
    </VStack>
  );
};
