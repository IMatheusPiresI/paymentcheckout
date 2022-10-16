import {PaymentType} from '../forms';

type ReduxStep = 'Shipping' | 'Payment' | 'Review' | 'Complete';

type ReduxPayloadCompleteStep = {
  currentStep: ReduxStep;
  shipping?: Pick<ReduxShipping, 'data'>;
  payment?: Pick<ReduxPayment, 'data'>;
  review?: {
    complete: boolean;
  };
};

type ReduxShipping = {
  complete: boolean;
  data: {
    country: string;
    fullName: string;
    streetAddress: string;
    city: string;
    number: string;
  };
};

type ReduxPayment = {
  complete: boolean;
  data: {
    paymentType: PaymentType;
    nameCard: string;
    cardNumber: string;
    expirationDate: string;
    securityCode: string;
  };
};

type ReduxInitialState = {
  currentStep: ReduxStep;
  steps: {
    shipping: ReduxShipping;
    payment: ReduxPayment;
    review: {
      complete: boolean;
    };
  };
};

type ReduxState = {
  checkoutReducer: ReduxInitialState;
};

type ReduxPayload = {
  currentStep?: ReduxStep;
  completeStep?: ReduxPayloadCompleteStep;
  paymentType?: PaymentType;
};

type ReduxAction = {
  type: string;
  payload: ReduxPayload;
};

export type {
  ReduxPayloadCompleteStep,
  ReduxStep,
  ReduxInitialState,
  ReduxState,
  ReduxAction,
  ReduxPayload,
};
