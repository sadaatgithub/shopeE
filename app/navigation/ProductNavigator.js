import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import ProductDetailScreen from '../screens/ProductDetailScreen'
import ReviewsScreen from '../screens/ReviewsScreen'


const Stack = createStackNavigator()

const ProductNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Products" component={HomeScreen} options={{headerShown:false}}/>
        {/* <Stack.Screen name="All Review" component={ReviewsScreen} options={{headerTitle:"All Reviews"}} /> */}
    </Stack.Navigator>
  )
}

export default ProductNavigator