import React, {useState} from 'react';
import {Radio, ScrollView} from 'native-base';

import {PaymentTypeRadio} from '../PaymentTypeRadio';

import masterCard from '../../../assets/images/mastercard.png';
import applePay from '../../../assets/images/applepay.png';
import payPal from '../../../assets/images/paypal.png';
import alipay from '../../../assets/images/alipay.png';
import {ButtonConfirm} from '../ButtonConfirm';

import {useDispatch} from 'react-redux';
import {Creators} from '../../../store/ducks/checkout';

export const PaymentTypes: React.FC = () => {
  const [paymentType, setPaymentType] = useState<string>('');
  const dispatch = useDispatch();

  const handleSetPaymentType = () => {
    dispatch(Creators.paymentType(paymentType));
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
