import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import ProductCard from '../components/ProductCard'
import colors from '../config/colors'
import AppText from '../components/heading/AppText'
import Slider from '@react-native-community/slider'


const products = [
    {
        id:1,
        title:"Nike Sportswear Club Fleece",
        price:"$50",
        image:require("../assets/product_1.png")
    },
    {
        id:2,
        title:"Trail Running Nike Jacket Windrunner",
        price:"$150",
        image:require("../assets/product_2.png")
    },{
        id:3,
        title:"Training Top Nike Sport Clash",
        price:"$200",
        image:require("../assets/product_3.png")
    },{
        id:4,
        title:"Trail Running Nike Jacket Windrunner",
        price:"$20",
        image:require("../assets/product_4.png")
    },
    {
        id:5,
        title:"Trail Running Nike Jacket Windrunner",
        price:"$20",
        image:require("../assets/product_2.png")
    },
    {
        id:6,
        title:"Trail Running Nike Jacket Windrunner",
        price:"$20",
        image:require("../assets/product_1.png")
    },
]
const WishListScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
        <AppText style={{fontWeight:700}}>35 Items</AppText>
        <Text style={{color:colors.textGray}}>-in wishlist</Text>
      <View style={styles.cardContainer}>
            {products.map(product =>(
                <ProductCard key={product.id} title={product.title} price={product.price}  onPress={()=> navigation.navigate("ProductDetail")}/>
            ))}
            </View>

{/* <View style={{flexDirection:"column",
width:200, height:150,borderWidth:1, transform:[{rotate:'90deg'}]}}>
            <Slider
            vertical={true}/>
            </View> */}
            </ScrollView>
    </View>
  )
}

export default WishListScreen

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.white,
        paddingHorizontal:20,
        paddingBottom:30,
        flex:1


    },
    cardContainer:{
        width:"100%",
        flexDirection:"row",
        flexWrap:"wrap",
        marginTop:15,
        columnGap:10,
        rowGap:10,
    
      }
})