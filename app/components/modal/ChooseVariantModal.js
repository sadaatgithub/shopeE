import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from '../../config/colors';
import AppText from '../heading/AppText';
import { useGetVariationsQuery } from '../../redux/feature/variationsApiSlice';
import { useState } from 'react';
import { findProductIdByAttributes } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import AppButton from '../button/AppButton';
import { useNavigation } from '@react-navigation/native';


const ChooseVariantModal = ({visible,onClose,id,name}) => {
  const { data: variations } = useGetVariationsQuery(id);
  const {variant} = useSelector((state) => state.variant)
  const [color, setColor] = useState("Green");
  const [weight, setWeight] = useState("250 gms");
  const [product,setProduct] = useState(id)
  const navigation = useNavigation()
  const [productId,setProductId] = useState('')
// console.log("Varinat",variant)

//   console.log(variations)
  const func = (atr, options) => {
    // console.log(atr)
   atr === "Color"? setColor(options) : setWeight(options)
    const proId = findProductIdByAttributes(variations, color, weight);
    setProductId(proId)
    console.log(productId);

    setProduct(variations.find((product) => product.id === productId))
    // if (productId !== null) {
    //   navigation.push("ProductDetail", productId);
    // }

  };
//   console.log(color,weight)
// console.log(product)


  return (
    <Modal visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
    
    >
        <View style={{ 
            backgroundColor: colors.white,
            height: 400,
            position: "absolute",
            bottom: 0,
            width: "100%",
            borderTopWidth: 1,}}>

                <View><AppText>{name}</AppText></View>
       <View
          style={{
           
            flexDirection: "row",
          }}
        >
          <View style={{ marginTop: 20, paddingHorizontal: 20 }}>
            {variant?.map((atr) => {
              return (
                <Pressable key={atr.id}>
                  <AppText>{atr.name}</AppText>
                  <View style={{ flexDirection: "row", gap: 6 }}>
                    {atr.options.map((options) => (
                      <Text
                        key={options}
                        style={{ padding: 6, backgroundColor: atr.name==='Color'?options===color? colors.primary:colors.white:options===weight? colors.primary:colors.white }}
                        onPress={()=>func(atr.name,options)}
                      >
                        {options}
                      </Text>
                    ))}
                  </View>
                </Pressable>
              );
            })}
          </View>
          <MaterialCommunityIcons
            name="close"
            size={30}
            style={{ position: "absolute", right: 5, marginTop: 10 }}
            onPress={onClose}
          />

          
        </View>

        <View style={{flexDirection:"row", gap:10 , paddingHorizontal:20, position:"absolute", bottom:10}}> 
            <AppButton title="Cancle" style={{flex:1}} color='secondary'/>  
            <AppButton title="Apply" style={{flex:1}} onPress={() => navigation.navigate('ProductDetail', productId)}/>
          </View>
        </View>
        
    </Modal>
  )
}

export default ChooseVariantModal

const styles = StyleSheet.create({})