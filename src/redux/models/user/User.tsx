export interface OptionalInfo {
  firstName: string
  lastName: string
  postCode: string
  homeMunicipality: string
  address: string
  phoneNum: string
}

export interface UserModel {
  // id?: string | undefined | null
  // expoToken?: string | undefined | null
  id: string
  expoToken: string
  userName: string
  optionalInfo?: OptionalInfo
  // firstName: string
  // lastName: string
  // contactNumber: string
  // token: string
}

export interface AuthData {
  refreshToken?: string | undefined | null
  localId?: string | undefined | null
  idToken?: string | undefined | null
  // email?: string
}

export interface UserState {
  user: UserModel
  success: string | undefined
  error: string
}
