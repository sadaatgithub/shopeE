import { StyleSheet, Switch, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import AppFormField from "../components/form/AppFormField";
import AppFormInputField from "../components/form/AppFormInputField";
import AppText from "../components/heading/AppText";
import AppButton from "../components/button/AppButton";

const AddAddressScreen = () => {
  return (
    <Screen>
      <View style={styles.formContainer}>
        <AppFormInputField 
        label="Name" placeholder="Enter your name" 
        style={{width:"100%"}}
        />
        <View style={{flexDirection:"row", gap:15}}>
        <AppFormInputField 
        label="Country" placeholder="India" style={{flex:1}}
        />
        <AppFormInputField 
        label="City" placeholder="Surat" style={{flex:1}}
        />
        </View>
        
        <AppFormInputField 
        label="Phone Number" placeholder="+91 9098547854"
        />
         <AppFormInputField 
        label="Address" placeholder="line no 1, Surat,Gujrat" 
        />

        <View style={{flexDirection:"row", justifyContent:"space-between",alignItems:"center"}}>
            <AppText>Save as primary address</AppText>
            <Switch/>
        </View>
      </View>
      <AppButton title="Save Address" style={styles.btn}/>
    </Screen>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    gap:15,
    width:"100%"
  },
  btn:{
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    width:"100%",
    borderRadius:0,
    height:60
  }
});
