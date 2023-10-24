import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider'

const VideoProgressBar = ({value,maxValue,onSeek}) => {
  return (
    <Slider
            style={{ flex: 1 }}
            maximumTrackTintColor="gray"
            minimumTrackTintColor="#FFF"
            minimumValue={0}
            thumbTintColor="white"
            value={value}
            maximumValue={maxValue}
            onValueChange={onSeek}
            step={1}
          />
  )
}

export default VideoProgressBar

const styles = StyleSheet.create({})