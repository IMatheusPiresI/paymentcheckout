import React from 'react';
import {
  Box,
  Button,
  HStack,
  IButtonProps,
  Image,
  Radio,
  Text,
} from 'native-base';

import {ImageSourcePropType} from 'react-native';

type PaymentTypeRadioProps = {
  title: string;
  image: ImageSourcePropType | undefined;
  value: string;
  button?: boolean;
} & IButtonProps;

export const PaymentTypeRadio: React.FC<PaymentTypeRadioProps> = ({
  title,
  image,
  value,
  button,
  ...rest
}) => {
  return (
    <HStack justifyContent="space-between" width="full" my="4">
      {button ? (
        <Button
          variant="ghost"
          background="transparent"
          padding="0"
          alignItems={'flex-start'}
          justifyContent="flex-start"
          m="0"
          {...rest}>
          <HStack>
            <Box
              w="6"
              h="6"
              alignItems="center"
              justifyContent="center"
              borderWidth="2"
              borderColor="#000"
              borderRadius="full">
              <Box w="3" h="3" borderRadius="full" bgColor="#000"></Box>
            </Box>
            <Text ml="2">{title}</Text>
          </HStack>
        </Button>
      ) : (
        <Radio value={value}>
          <Text>{title}</Text>
        </Radio>
      )}
      <Image
        source={image}
        width="16"
        height="5"
        alt="mastercard"
        resizeMode="contain"
      />
    </HStack>
  );
};
