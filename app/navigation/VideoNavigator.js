import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import VideoPlayer from '../components/VideoPlayer'
import YoutubeStoryScreen from '../screens/videoplayer/YoutubeStoryScreen'
import InstaReelsScreen from '../screens/videoplayer/InstaReelsScreen'
import MyDownloads from '../screens/videoplayer/MyDownloads'
import AccountScreen from '../screens/AccountScreen'

const Stack = createStackNavigator()



const VideoNavigator = () =>(
    <Stack.Navigator initialRouteName='Video' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Video" component={AccountScreen}/>
        {/* <Stack.Screen name="VideoPlayer" component={VideoPlayer}/> */}
        <Stack.Screen name="My_Downloads" component={MyDownloads}/>
        <Stack.Screen name="Youtube_Shorts" component={YoutubeStoryScreen}/>
        <Stack.Screen name="Insta_Reels" component={InstaReelsScreen}/>
    </Stack.Navigator>
)

export default VideoNavigator