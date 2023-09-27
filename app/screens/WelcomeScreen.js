import { StyleSheet, Text, View,ImageBackground, Pressable } from 'react-native'
import React from 'react'
import AppText from '../components/heading/AppText'
import colors from '../config/colors'
import AppButton from '../components/button/AppButton'

const WelcomeScreen = ({navigation}) => {
  return (
    <ImageBackground
                style={styles.background}
                imageStyle={{objectFit:'cover'}}
                source={require("../assets/laza.png")}
    >


    <View style={styles.container}>
        <AppText style={styles.title}>Look Good, Feel Good</AppText>
        <AppText style={styles.subtitle}>Create your individual & unique style and look amazing everyday.</AppText>

        <View style={styles.btnContainer}>
            <AppButton title="Men" style={styles.btn} color='light'/>
            <AppButton style={styles.btn} title="Women" />

        </View>
        <Pressable onPress={()=> navigation.navigate("Create Account")}>
        <AppText style={styles.text}>Skip</AppText>
        </Pressable>
    </View>

    </ImageBackground>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems:"center",
        backgroundColor:"#FF9775FA",
        padding:15
      },
      container:{
        // width:345,
        // height:244,
        backgroundColor:"white",
        // bottom:15,
        borderRadius:24,
        padding:15

      },
      title:{
        textAlign:"center",
        marginTop:10,
        fontSize:25,
        fontWeight:600,
        color:colors.dark
        


      },
      subtitle:{
        textAlign:"center",
        marginTop:10,
        fontSize:15,
        paddingHorizontal:25,
        color:colors.textGray,
        fontWeight:400
      },
      btnContainer:{
        width:"100%",
        flexDirection:"row",
        gap:10,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20
      },
      btn:{
        width:152,
        height:60,
        padding:10
      },
      text:{
        textAlign:"center",
        marginTop:20,
        color:colors.textGray,
        fontSize:17,
        fontWeight:500,
      }

})