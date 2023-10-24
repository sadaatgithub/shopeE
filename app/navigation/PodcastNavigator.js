import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from "@react-navigation/stack";
import PodcastHome from '../screens/podcast/PodcastHome';
import PodcastDetail from '../screens/podcast/PodcastDetail';


const Stack = createStackNavigator();

const PodcastNavigator = () =>(
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='PodcastDetail'>
        <Stack.Screen name="PodcastHome" component={PodcastHome} options={{headerShown:false}}/>
        <Stack.Screen name="PodcastDetail" component={PodcastDetail}/>
    </Stack.Navigator>
)
export default PodcastNavigator