import {UserAction} from '../actions'
import {UserState, UserModel, AuthData} from '../models'

const initialState: UserState = {
  user: {} as UserModel,
  success: undefined,
  error: '',
}

const UserReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case 'ON_USER_AUHENTICATE':
      console.log('User Login....')
      console.log(action.payload)

      return {
        ...state,
        success: action.payload,
      }
    case 'ON_USER_ERROR':
      console.log('On user error....')
      console.log(action.payload)

      return {
        ...state,
        error: action.payload,
      }
    case 'ON_USER_ERROR_CLEAR':
      console.log('User error clear....')
      console.log(action.payload)

      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export {UserReducer}
