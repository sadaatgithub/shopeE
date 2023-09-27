import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import AppNavigator from './AppNavigator'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
  <Drawer.Navigator screenOptions={{headerShown:false}}>
    <Drawer.Screen name="ShopeE" component={AppNavigator}/>
  </Drawer.Navigator>
  )
}

export default DrawerNavigator