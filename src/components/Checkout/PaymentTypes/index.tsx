import React, {useState} from 'react';
import {Box, Radio, ScrollView, VStack} from 'native-base';

import {PaymentTypeRadio} from '../PaymentTypeRadio';

import masterCard from '../../../assets/images/mastercard.png';
import applePay from '../../../assets/images/applepay.png';
import payPal from '../../../assets/images/paypal.png';
import alipay from '../../../assets/images/alipay.png';
import {ButtonConfirm} from '../ButtonConfirm';
import {PaymentType} from '../../../@types/forms';
import {ImageSourcePropType} from 'react-native';

import {useDispatch} from 'react-redux';
import {Creators} from '../../../store/ducks/checkout';

export const PaymentTypes: React.FC = () => {
  const [paymentType, setPaymentType] = useState<string>('');
  const dispatch = useDispatch();

  const handleSetPaymentType = () => {
    let image: ImageSourcePropType;
    let title: string;
    switch (paymentType) {
      case 'creditCard':
        image = masterCard;
        title = 'Credit card';
        break;
      case 'applePay':
        image = applePay;
        title = 'ApplePay';
        break;
      case 'payPal':
        image = payPal;
        title = 'PayPal';
        break;
      case 'alipay':
        image = alipay;
        title = 'Alipay';
        break;
      default:
        return;
    }
    dispatch(
      Creators.paymentType({
        type: paymentType,
        image,
        title,
      }),
    );
  };
  return (
    <>
      <ScrollView paddingX="4" flex="1">
        <Radio.Group
          name="paymentTypes"
          value={paymentType}
          onChange={nextValue => setPaymentType(nextValue)}>
          <PaymentTypeRadio
            image={masterCard}
            title={'Credit card'}
            value="creditCard"
          />
          <PaymentTypeRadio
            image={applePay}
            title={'Apple Pay'}
            value="applePay"
          />
          <PaymentTypeRadio image={payPal} title={'PayPal'} value="payPal" />
          <PaymentTypeRadio image={alipay} title={'Alipay'} value="alipay" />
        </Radio.Group>
      </ScrollView>
      <ButtonConfirm
        title="Confirm payment type"
        onPress={handleSetPaymentType}
        opacity={!paymentType ? 0.5 : 1}
        disabled={paymentType === ''}
      />
    </>
  );
};
