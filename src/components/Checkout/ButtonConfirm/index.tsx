import React from 'react';
import {Button, Center, IButtonProps, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type ButtonConfirmProps = {
  title: string;
} & IButtonProps;

export const ButtonConfirm: React.FC<ButtonConfirmProps> = ({
  title,
  ...rest
}) => {
  return (
    <Center padding="4" position="absolute" bottom="4" width="full">
      <Button
        width="full"
        bgColor="black"
        leftIcon={<MaterialIcons name="chevron-left" size={20} color="#FFF" />}
        rightIcon={
          <MaterialIcons name="chevron-right" size={20} color="#FFF" />
        }
        {...rest}>
        <Text color="#FFF" bottom="1px">
          {title}
        </Text>
      </Button>
    </Center>
  );
};
