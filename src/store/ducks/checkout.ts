import {PaymentType} from '../../@types/forms';
import {
  ReduxAction,
  ReduxInitialState,
  ReduxPayloadCompleteStep,
} from '../../@types/redux';

// Action Types

export const Types = {
  NEXT_STEP: 'NEXT_STEP',
  GO_BACK_STEP: 'GO_BACK_STEP',
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
        cardNumber: '',
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
          state.steps.review['complete'] = true;
          return (state = {
            currentStep: 'Complete',
            steps: {
              ...state.steps,
            },
          });
        case 'Complete':
          return (state = {
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
                  cardNumber: '',
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
          });

        default:
          return state;
      }
    case Types.GO_BACK_STEP:
      switch (action.payload.currentStep) {
        case 'Shipping':
          state.steps.payment['complete'] = false;
          state.steps.shipping['complete'] = false;
          return (state = {
            currentStep: 'Shipping',
            steps: state.steps,
          });

        case 'Payment':
          state.steps.payment['complete'] = false;
          return (state = {
            currentStep: 'Payment',
            steps: state.steps,
          });

        default:
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

  goBackToStep: (payload: Pick<ReduxPayloadCompleteStep, 'currentStep'>) => ({
    type: Types.GO_BACK_STEP,
    payload,
  }),
};
