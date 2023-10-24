import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppTextInput from './AppTextInput'
import colors from '../../config/colors'
import { Controller } from 'react-hook-form'
import {MaterialCommunityIcons} from "@expo/vector-icons"

const AppFormField = ({control,name,label,icon,onPress,...restProps}) => {
  return (

    <>
    <Controller
      control={control}
      name={name}
      render={({field:{value,onChange,onBlur}, fieldState:{error}}) =>(
        <View style={styles.container}> 
        {label && <Text>{label}</Text>}
        <View style={{flexDirection:"row",alignItems:"center",width:"100%"}}>
          
          <AppTextInput 
                value={value}
                onBlur={onBlur}
            onChangeText={onChange}
              {...restProps}/>
              {icon && 
              <MaterialCommunityIcons name={icon} size={25} style={styles.icon} 
              color={colors.textGray} onPress={onPress}/>}
              </View>
              
          </View>
      )}/>
  
      </>
  )
}

export default AppFormField

const styles = StyleSheet.create({
    container:{
        borderBottomColor:"#E7E8EA",
        borderBottomWidth:1,
        width:"100%"
    },
    icon:{
      position:"absolute",
      right:15
    }
})