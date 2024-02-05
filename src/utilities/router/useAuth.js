import {useContext} from 'react'
import {AuthContext} from '../router/AuthProvider'
export function useAuth(){
  return useContext(AuthContext)
}