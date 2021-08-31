import React, {useState, createContext} from 'react'
import {UserModel} from '../redux'

type UserContextState = {
  user: UserModel
  setUser: (user: UserModel) => void
}

const contextDefaultValues: UserContextState = {
  user: {} as UserModel,
  setUser: () => {},
}

const UserContext = createContext<UserContextState>(contextDefaultValues)

const UserProvider: React.FC = ({children}) => {
  const [user, setUser] = useState(contextDefaultValues.user)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export {UserProvider, UserContext}

// const UserContext = createContext(null)

// const UserProvider: React.FC = ({children}) => {
//   const [user, setUser] = useState<UserModel>()

//   return (
//     <UserContext.Provider value={{user, setUser}}>
//       {children}
//     </UserContext.Provider>
//   )
// }

// import React, {useState} from 'react'
// import {UserModel} from '../redux'

// const UserContext = React.createContext({})

// interface UserProps {
//   children: object
// }

// const UserProvider: React.FC<UserProps> = ({children}) => {
//   const [user, setUser] = useState<UserModel>()
//   return (
//     <UserContext.Provider value={{user, setUser}}>
//       {children}
//     </UserContext.Provider>
//   )
// }

// export {UserContext, UserProvider}
