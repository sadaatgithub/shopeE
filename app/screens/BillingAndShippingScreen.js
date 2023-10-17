import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppFormInputField from '../components/form/AppFormInputField'
import colors from '../config/colors'
import AppPicker from '../components/form/AppPicker'
import AppText from '../components/heading/AppText'
import { ScrollView } from 'react-native-gesture-handler'
import AppButton from '../components/button/AppButton'

const country = [
    {
        id:1,
        label:"India",
        value:"IN"
    },
    {
        id:2,
        label:"Dubai",
        value:"UAE"
    },{
        id:3,
        label:"England",
        value:"ENG"
    },
]

const BillingAndShippingScreen = ({navigation,route}) => {
    const {product,total} = route.params
  return (
    <View>
        <ScrollView showsVerticalScrollIndicator={false} style={{backgroundColor:colors.white}}>
    <View style={{paddingHorizontal:20, flex:1,paddingBottom:20}}>
        <AppText style={{fontSize:18, fontWeight:700}}>Billing & shipping</AppText>
        <View style={styles.formControl}>
      <AppFormInputField placeholder="Your Name" label="First Name"/>
      <AppFormInputField placeholder="" label="Last Name"/>
      <AppFormInputField placeholder="" label="Company Name (Optional)"/>
      <View>
        <AppText>Country/Region*</AppText>
      <AppPicker items={country}/>
      </View>
      <View>
      <AppFormInputField placeholder="House no and street name" label="Street Address"/>
      <AppFormInputField placeholder="Appartment, suite, unit, etc (optional)" label=""/>
      </View>
      <AppFormInputField placeholder="" label="Town/City*"/>
      <AppFormInputField placeholder="" label="State/County*"/>
      <AppFormInputField placeholder="" label="Postal Code" inputMode="numeric"/>
      <AppFormInputField placeholder="" label="Phone*" inputMode="tel"/>
      <AppFormInputField placeholder="" label="Email*" inputMode="email" autoCorrect={false}/>


      </View>
      <View>
        <AppText>Additional Information</AppText>
        <View style={{marginTop:6}}>
            <AppFormInputField 
                        multiline={true}
                        label="Order notes (optional)"  
                    placeholder="Notes about your order,e.g. special notes for delivery"/>
        </View>
      </View>
    </View>

    <View style={{paddingHorizontal:20,paddingBottom:60}}>
    <AppText style={{fontSize:18, fontWeight:700}}>Your Order</AppText>
    <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:10}}>
        <AppText>Item</AppText>
        <AppText>Qty</AppText>
        <AppText>Total</AppText>
    </View>

        <View style={{flexDirection:"row",justifyContent:'space-between',marginTop:8}}>
            {product?.map(item => <AppText key={item.id} style={styles.itemText}>{item.name} x {item.quantity}</AppText>)}
            <AppText>Rs. {total}</AppText>
        </View>


    </View>
      </ScrollView>
    <AppButton title="Continue" style={styles.btn} onPress={() =>navigation.navigate('Checkout',{product,total})}/>
      </View>
  )
}

export default BillingAndShippingScreen

const styles = StyleSheet.create({
    formControl:{
        gap:10,
        paddingBottom:12,
        marginTop:10
    },
    itemText:{
        fontSize:15,
        
    },
    btn:{
        borderRadius:0,
        // width:"90%",
        position:"absolute",
        bottom:0,
        left:0,
        right:0,

    }
})