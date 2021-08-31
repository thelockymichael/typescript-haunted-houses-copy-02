import {useContext} from 'react'
import {
  ParamListBase,
  NavigationContext,
  NavigationProp,
} from '@react-navigation/native'

// Route Name
export function useNavigation() {
  return useContext(NavigationContext) as NavigationProp<ParamListBase>
}
