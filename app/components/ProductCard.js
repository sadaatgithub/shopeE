import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import AppText from "./heading/AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ProductCard = ({ title, imageUrl, price, onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="heart-outline"
          size={20}
          style={styles.icon}
        />
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        <AppText style={styles.title}>{title}</AppText>
        <AppText style={styles.subTitle}>Rs. {price}</AppText>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: 170,
    // borderRadius: 15,
    // overflow:"hidden"
    borderWidth:1,
    borderColor:colors.light,
    backgroundColor: colors.white,
    padding: 10,
    // elevation: 2,
    flex:1
  },
  image: {
    width: "100%",
    height: 230,
    // borderRadius: 15,
    overflow: "hidden",
    objectFit: "scale-down",
  },
  title: {
    fontSize: 11,
    fontWeight: 500,
    marginTop: 5,
    color: colors.textGray,
  },
  subTitle: {
    fontSize: 13,
    fontWeight: 600,
    marginTop: 5,
    color: colors.dark,
  },
  icon: {
    position: "absolute",
    zIndex: 1,
    right: 15,
    top: 15,
    color: colors.textGray,
  },
});
