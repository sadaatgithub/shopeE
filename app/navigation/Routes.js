import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthNavigator from './AuthNavigator'
import colors from '../config/colors'
import { useSelector,useDispatch } from 'react-redux'
import RootNavigator from './RootNavigator'
import authStorage from "../utils/storage"
import { setAuth } from '../redux/feature/authSlice'
import { useAuthentication } from '../utils/hooks/useAuthentication'

const Routes = () => {
  // const { isAuthenticated } = useSelector((state) => state.auth);
  // const dispatch = useDispatch()
const { user } = useAuthentication()
console.log(user)
  // const retriveToken = async () =>{
  //   const token = await authStorage.getToken()
  //   if(token) dispatch(setAuth(token))
  // }

  // useEffect(() =>{
  //   retriveToken()
  // },[])
  return (
    <NavigationContainer>
    <StatusBar backgroundColor={colors.white} barStyle="dark-content"/>
    {user? <RootNavigator/>:<AuthNavigator/>}
    
  </NavigationContainer>
  )
}

export default Routes