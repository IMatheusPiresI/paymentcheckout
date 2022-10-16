import {ImageSourcePropType} from 'react-native';
import {PaymentType} from '../@types/forms';

import masterCard from '../assets/images/mastercard.png';
import applePay from '../assets/images/applepay.png';
import payPal from '../assets/images/paypal.png';
import alipay from '../assets/images/alipay.png';

export const getPaymentInfo = (paymentType: PaymentType) => {
  let image: ImageSourcePropType | undefined;
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
      image = undefined;
      title = '';
  }

  return {
    image,
    title,
  };
};
