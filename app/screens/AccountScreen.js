import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppButton from '../components/button/AppButton'
import { useDispatch } from 'react-redux'
import { clearToken, logout } from '../redux/feature/authSlice'
import { getAuth,signOut } from 'firebase/auth'


const auth = getAuth();

const AccountScreen = () => {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <AppButton title="Logout" style={{width:"50%"}} 
          onPress={() => signOut(auth)}/>
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