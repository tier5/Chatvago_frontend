import * as AuthActions from './auth.actions';

export interface State {
  token: string;
  registered: boolean;
  resetForgotPasswordForm: boolean;
  isAuthenticated: boolean;
  firstName: string;
  lastName: string;
  email: string;
  userId: number;
  userType: number;
  twilioIsActive: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isAgent: boolean;
}

const initialState: State = {
  token: null,
  registered: false,
  resetForgotPasswordForm: false,
  isAuthenticated: false,
  firstName: null,
  lastName: null,
  email: null,
  userId: null,
  userType: null,
  twilioIsActive: false,
  isSuperAdmin: false,
  isAdmin: false,
  isAgent: false
};

/**
 * Reducer for authentication action
 * @param state
 * @param action
 */
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case (AuthActions.SIGNUP_SUCCESS):
      localStorage.setItem('data', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        userId: action.payload.id,
        email: action.payload.email,
        registered: true
      };
    case (AuthActions.SIGNUP_FORM_RESET):
    return {
      ...state,
      registered: false
    };
    case (AuthActions.FORGOT_PASSWORD_SUCCESS):
      return {
        ...state,
        resetForgotPasswordForm: action.payload
      };
    case (AuthActions.SIGNIN_SUCCESS):
      localStorage.setItem('data', JSON.stringify(action.payload));
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        userId: action.payload.id,
        firstName: action.payload.first_name,
        lastName: action.payload.last_name,
        email: action.payload.email
      };
    case (AuthActions.SIGNOUT_SUCCESS):
      localStorage.removeItem('data');
      return {
        ...state,
        token: null,
        userId: null,
        userType: null,
        isSuperAdmin: false,
        isAdmin: false,
        isAgent: false,
        isAuthenticated: false
      };
    case (AuthActions.CHECK_TOKEN):
      if (localStorage.getItem('data') !== null && localStorage.getItem('data') !== undefined) {
        const data = JSON.parse(localStorage.getItem('data'));
        return {
          ...state,
          isAuthenticated: true,
          token: data.token,
          userId: data.id,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
