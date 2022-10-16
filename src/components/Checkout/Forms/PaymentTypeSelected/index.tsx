import {ImageSourcePropType} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {Radio} from 'native-base';
import {Creators} from '../../../../store/ducks/checkout';
import {getPaymentInfo} from '../../../../utils/renderImagePayment';
import {PaymentTypeRadio} from '../../PaymentTypeRadio';

export const PaymentTypeSelected = () => {
  const {
    steps: {payment},
  } = useSelector((state: any) => state.checkoutReducer);
  const dispatch = useDispatch();

  const handleChangePaymentType = () => {
    dispatch(Creators.paymentType(''));
  };

  const paymentInfo = getPaymentInfo(payment.data.paymentType);

  return (
    <Radio.Group
      name="radioGroup"
      value={payment.data.paymentType.type}
      colorScheme={'light'}>
      <PaymentTypeRadio
        title={paymentInfo!.title}
        image={paymentInfo!.image}
        value={payment.data.paymentType.type}
        button
        onPress={handleChangePaymentType}
      />
    </Radio.Group>
  );
};
