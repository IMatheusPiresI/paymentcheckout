import {ImageSourcePropType} from 'react-native';
type ShippingForm = {
  country: string;
  fullName: string;
  city: string;
  number: string;
  streetAddress: string;
};

type PaymentForm = {
  nameCard: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
};

type ShippingNames =
  | 'country'
  | 'fullName'
  | 'streetAddress'
  | 'city'
  | 'number';

type PaymentNames =
  | 'nameCard'
  | 'cardNumber'
  | 'expirationDate'
  | 'securityCode';

type PaymentType = {
  title: string;
  type: string;
  image: ImageSourcePropType | null;
};

export type {
  ShippingForm,
  PaymentForm,
  ShippingNames,
  PaymentType,
  PaymentNames,
};
