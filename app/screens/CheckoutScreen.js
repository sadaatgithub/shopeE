import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppFormInputField from '../components/form/AppFormInputField'
import colors from '../config/colors'
import AppPicker from '../components/form/AppPicker'
import AppText from '../components/heading/AppText'
import { ScrollView } from 'react-native-gesture-handler'
import AppButton from '../components/button/AppButton'
import RazorpayCheckout from 'react-native-razorpay'
import { useAuthentication } from '../utils/hooks/useAuthentication'


const CheckoutScreen = ({navigation,route}) => {
  const {product,total}=route.params
  const {user} = useAuthentication()

    const paymentHandler = () =>{
        var options = {
            description: 'Credits towards consultation',
            image: 'https://i.imgur.com/3g7nmJC.jpg',
            currency: 'INR',
            key: 'rzp_test_CMUFlBe2kAf4CY',
            amount: total,
            name: 'EKrushak',
            order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
            prefill: {
              email: user?.email,
              contact: '9191919191',
              name: user?.displayName
            },
            theme: {color: '#53a20e'}
          }
          RazorpayCheckout.open(options).then((data) =>{
            alert(`Success: ${data.razorpay_payment_id}`);
          }).catch((error) =>{
            alert(`Error: ${error.code} | ${error.description}`);
          })
    }
  return (
    <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:"white"}}>
        <AppText>Pay with Razorpay</AppText>
    <AppButton title="Continue" style={styles.btn} onPress={() => {
    var options = {
    description: 'Credits towards consultation',
    image: 'https://i.imgur.com/3g7nmJC.jpg',
    currency: 'INR',
    key: 'rzp_test_CMUFlBe2kAf4CY',
    amount: '300',
    name: 'Ekrushak',
    order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
    prefill: {
      email: 'ga@example.com',
      contact: '9191919191',
      name: 'Gaurav Kumar'
    },
    theme: {color: '#53a20e'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert(`Success: ${data.razorpay_payment_id}`);
  }).catch((error) => {
    // handle failure
    alert(`Error: ${error.code} | ${error.description}`);
  });
}}/>
      </View>
  )
}

export default CheckoutScreen

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