import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppButton from '../components/button/AppButton'
import { useDispatch } from 'react-redux'
import { clearToken, logout } from '../redux/feature/authSlice'
import { getAuth,signOut } from 'firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { useAuthentication } from "../utils/hooks/useAuthentication";

const auth = getAuth();

const AccountScreen = () => {
  const dispatch = useDispatch()
  const {user} = useAuthentication()
  const logOut = async () =>{
    if(user?.providerData[0].providerId === "google.com"){
      await GoogleSignin.revokeAccess()
    }
    signOut(auth)

  }
  return (
    <View style={styles.container}>
      <AppButton title="Logout" style={{width:"50%"}} 
          onPress={logOut}/>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  }
})