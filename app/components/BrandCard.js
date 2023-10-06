import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import AppText from './heading/AppText'
import colors from '../config/colors'

const BrandCard = ({title,imageUrl,onPress,category}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
     <View style={[styles.brandCard,{backgroundColor:category=== title? colors.primary:colors.light}]}>
        {/* <View style={styles.imageDiv}>
        <Image style={styles.image} source={imageUrl}/>
        </View> */}
        <AppText style={[styles.title,{color:category=== title? colors.white:colors.medium}]}>{title}</AppText>
     </View>
    </TouchableWithoutFeedback>
  )
}

export default BrandCard

const styles = StyleSheet.create({
    brandCard:{
        flexDirection:"row",
        backgroundColor:colors.light,
        marginRight:10,
        alignItems:"center",
        padding:7,
        borderRadius:10,
        gap:10


    },
    imageDiv:{
        backgroundColor:colors.white,
        borderRadius:10,
        width:40,
        height:40,
        justifyContent:"center",
        alignItems:"center"
    },
    image:{
        width:25,
        height:25,
        objectFit:"contain",
        padding:5,
        backgroundColor:colors.white,
      
    },
    title:{
        fontSize:15,
        color:colors.medium,
        fontWeight:500,
        paddingHorizontal:10
    }
})