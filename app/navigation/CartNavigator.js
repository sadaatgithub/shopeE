import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CartScreen from '../screens/CartScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import BillingAndShippingScreen from '../screens/BillingAndShippingScreen'


const Stack = createStackNavigator()
const CartNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="CartScreen" component={CartScreen} options={{headerTitle:"Cart"}}/>

        <Stack.Screen name="BillingAndShipping" component={BillingAndShippingScreen} options={{headerTitle:"Checkout"}}/>
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{headerTitle:"Payment"}}/>
    </Stack.Navigator>
  )
}

export default CartNavigator