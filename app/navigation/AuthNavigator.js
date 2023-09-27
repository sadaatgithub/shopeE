import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import CreateAccountScreen from '../screens/CreateAccountScreen'
import SignUpScreen from '../screens/SignUpScreen'

const Stack = createStackNavigator()

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={ LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Create Account" component={CreateAccountScreen}/>
        <Stack.Screen name="Signin" component={LoginScreen}/>
        <Stack.Screen name="Signup" component={SignUpScreen}/>
    </Stack.Navigator>
)
export default AuthNavigator

const styles = StyleSheet.create({})