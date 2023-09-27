import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import defaultStyles from "../../config/styles";
import {MaterialCommunityIcons} from "@expo/vector-icons"

const AppTextInput = ({icon,width="100%", ...restProps}) => {
  return (
    <View style={[styles.container,{width}]}>
         {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={defaultStyles.colors.medium}
          stye={styles.icon}
        />
      )}
      <TextInput style={[defaultStyles.text,styles.input]} {...restProps} />

      
    </View>
  )
}

export default AppTextInput

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // justifyContent:"center",
        alignItems: "center",
        marginVertical:15,
        gap:10,
      },
      icon: {
        fontSize: 10,
      },
      input:{
        flex:1
      }
})