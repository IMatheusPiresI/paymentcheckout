import {Box, HStack, Text} from 'native-base';
import React from 'react';
import {ButtonStatus} from '../ButtonStatus';

export const HeaderStatus: React.FC = () => {
  return (
    <HStack
      width="100%"
      bgColor="gray.200"
      height="16"
      alignItems="center"
      justifyContent="space-around"
      px="2">
      <ButtonStatus title="Shipping" stepNumber={1} />
      <Box w="3" h="0.5" bgColor="gray.300"></Box>
      <ButtonStatus title="Payment" stepNumber={2} />
      <Box w="3" h="0.5" bgColor="gray.300"></Box>
      <ButtonStatus title="Review" stepNumber={3} />
    </HStack>
  );
};
