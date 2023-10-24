import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import AppText from '../heading/AppText'
import colors from '../../config/colors'

const AppFormInputField = ({placeholder,label,style,...restProps}) => {
  return (
    <View style={style}>
      {label && 
    <AppText style={styles.label}>{label}</AppText>
  }
    <View
      style={{ backgroundColor: colors.light,borderRadius:10 }}
    >
      <TextInput placeholder={placeholder} placeholderTextColor={colors.textGray} {...restProps} 
        style={{padding:15}} />
    </View>
    </View>
  )
}

export default AppFormInputField

const styles = StyleSheet.create({
    label:{
        fontSize:17,
        fontWeight:600,
        color:"#1D1E20",
        marginBottom:6
    }
})