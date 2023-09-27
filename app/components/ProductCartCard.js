import { Image, StyleSheet, Text, View,Alert } from "react-native";
import React from "react";
import AppText from "./heading/AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, removeItem } from "../redux/feature/cartSlice";

const ProductCartCard = ({imageUrl,title,price,qty,id}) => {
  const dispatch = useDispatch()

  const handlePress = () =>{
    Alert.alert("Delete", "Are you sure to delete",[
      {text:"Yes", onPress:()=>dispatch(removeItem(id))},
      {text:"No"}
    ])
  }
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
      <Image style={styles.image} source={{uri:imageUrl}} />
      </View>
      <View style={{flex:1}}>
        <AppText style={{fontSize:15,fontWeight:700}} numberOfLines={1}>{title}</AppText>
        <AppText
          style={{ marginTop: 10, fontSize: 13 }}
        >Rs. {price}</AppText>

    
<View style={{flexDirection:"row",alignItems:"center",marginTop: 20,justifyContent:"space-between"}}>
        <View style={styles.quantity}>
          <MaterialCommunityIcons
            name="chevron-down-circle-outline"
            size={25}
            color={colors.textGray}
            onPress={() => dispatch(decrementQuantity(id))}

          />
          <Text style={{fontSize:15, color:colors.textGray}}>{qty}</Text>
          <MaterialCommunityIcons
            name="chevron-up-circle-outline"
            size={25}
            color={colors.textGray}
            onPress={() => dispatch(incrementQuantity(id))}
          />
        </View>
        <MaterialCommunityIcons
        name="delete-circle-outline"
        size={25}
        color={colors.textGray}
        style={styles.deleteIcon}
        onPress={handlePress}

      />
        </View>
      </View>
      
    </View>
  );
};

export default ProductCartCard;

const styles = StyleSheet.create({
  container: {
    marginBottom:10,
    flexDirection: "row",
    padding: 10,
    borderRadius: 10,
    gap: 15,
    backgroundColor: colors.white,
    borderBottomColor:colors.textGray,
    shadowColor: "#433f3f",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
  },
  imgContainer:{
    justifyContent:"center",
    alignItems:"center"
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    objectFit: "contain",
  },
  quantity: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  // deleteIcon: {
  //   position: "absolute",
  //   right: 15,
  //   bottom: 15,
  // },
});
