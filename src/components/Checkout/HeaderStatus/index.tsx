import {HStack} from 'native-base';
import React from 'react';
import {ButtonStatus} from '../ButtonStatus';

export const HeaderStatus: React.FC = () => {
  return (
    <HStack
      width="100%"
      bgColor="gray.200"
      height="16"
      alignItems="center"
      justifyContent="space-around">
      <ButtonStatus title="Shipping" stepNumber={1} />
      <ButtonStatus title="Payment" stepNumber={2} />
      <ButtonStatus title="Review" stepNumber={3} />
    </HStack>
  );
};
