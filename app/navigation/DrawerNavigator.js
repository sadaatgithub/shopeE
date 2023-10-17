import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AppNavigator from './AppNavigator'
import EditProfile from '../components/EditProfile'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
  <Drawer.Navigator screenOptions={{headerShown:false}}>
    <Drawer.Screen name="ShopeE" component={AppNavigator} options={{headerShown:false}}/>
    {/* <Drawer.Screen name="Edit Profile" component={EditProfile}/> */}
  </Drawer.Navigator>
  )
}

export default DrawerNavigator