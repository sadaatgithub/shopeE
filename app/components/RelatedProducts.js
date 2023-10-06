import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import colors from '../config/colors'
import { useGetProductByIdQuery } from '../redux/feature/productApiSlice'
import AppText from './heading/AppText'
import { useNavigation } from '@react-navigation/native'

const RelatedProducts = ({id}) => {
    const {data:product,isLoading,isError} = useGetProductByIdQuery(id)
    const navigation = useNavigation()

  return (
    <TouchableWithoutFeedback onPress={() => navigation.push("ProductDetail", product.id)} key={product.id}>
    <View style={styles.container}>
<MaterialCommunityIcons name="heart-outline" size={20} style={styles.icon}/>
        <Image source={{uri:product?.images[0]?.src}} style={styles.image}/>
        <AppText style={styles.title}>{product?.name}</AppText>
        <AppText style={styles.subTitle}>Rs. {product?.price}</AppText>

    </View>
</TouchableWithoutFeedback>
  )
}

export default RelatedProducts

const styles = StyleSheet.create({
    container:{
        width:170,
        borderRadius:15,
        // overflow:"hidden"
        // borderWidth:1
        backgroundColor:colors.white,
        padding:10,
        elevation:2
            
    },
    image:{
        width:"100%",
        height:230,
        borderRadius:15,
        overflow:"hidden",
        objectFit:"scale-down"



    },
    title:{
        fontSize:11,
        fontWeight:500,
        marginTop:5,
        color:colors.textGray
    },
    subTitle:{
        fontSize:13,
        fontWeight:600,
        marginTop:5,
        color:colors.dark
    },
    icon:{
        position:"absolute",
        zIndex:1,
        right:15,
        top:15,
        color:colors.textGray
    }
})