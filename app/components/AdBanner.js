import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AdBanner = () => {
  return (
    <View>
      <Image source={require('../assets/adBanner.png')} style={styles.image}/>
    </View>
  )
}

export default AdBanner

const styles = StyleSheet.create({
    image:{
        width: "100%",
        height:250,
        objectFit:"fill",
    }
})