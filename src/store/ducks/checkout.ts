import {PaymentType} from '../../@types/forms';
import {
  ReduxAction,
  ReduxInitialState,
  ReduxPayloadCompleteStep,
  ReduxStep,
} from '../../@types/redux';

// Action Types

export const Types = {
  NEXT_STEP: 'NEXT_STEP',
  PREVIOS_STEP: 'PREVIOS_STEP',
  COMPLETE_STEP: 'COMPLETE_STEP',
  PAYMENT_TYPE: 'PAYMENT_TYPE',
};

// Reducer

const initialState: ReduxInitialState = {
  currentStep: 'Shipping',
  steps: {
    shipping: {
      complete: false,
      data: {
        city: '',
        country: '',
        fullName: '',
        number: '',
        streetAddress: '',
      },
    },
    payment: {
      complete: false,
      data: {
        expirationDate: '',
        nameCard: '',
        paymentType: {
          image: null,
          title: '',
          type: '',
        },
        securityCode: '',
      },
    },
    review: {
      complete: false,
    },
  },
};

export default function checkoutReducer(
  state = initialState,
  action: ReduxAction,
) {
  switch (action.type) {
    case Types.PAYMENT_TYPE:
      state.steps.payment.data['paymentType'] = action.payload.paymentType!;
      return (state = {
        currentStep: state.currentStep,
        steps: {...state.steps},
      });

    case Types.COMPLETE_STEP:
      switch (action.payload.completeStep?.currentStep) {
        case 'Shipping':
          state.steps['shipping'] = {
            complete: true,
            ...action.payload.completeStep.shipping!,
          };

          return (state = {
            currentStep: 'Payment',
            steps: state.steps,
          });
        case 'Payment':
          state.steps['payment'] = {
            complete: true,
            ...action.payload.completeStep.payment!,
          };

          return (state = {
            currentStep: 'Review',
            steps: state.steps,
          });
        case 'Review':
          state.steps['review'].complete = true;
          state.currentStep = 'Complete';
          return state;
      }

    default:
      return state;
  }
}

// Action Creators

export const Creators = {
  completeStep: (payload: ReduxPayloadCompleteStep) => ({
    type: Types.COMPLETE_STEP,
    payload: {
      completeStep: payload,
    },
  }),

  paymentType: (payload: PaymentType) => ({
    type: Types.PAYMENT_TYPE,
    payload: {
      paymentType: payload,
    },
  }),
};
