import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Constants from "expo-constants";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import AppText from "./heading/AppText";
import { useSelector } from "react-redux";

const Header = ({ navigation, iconRight, isHome, title }) => {
  const cart = useSelector((state) => state.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cart.cart.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  return (
    <View style={styles.header}>
      <View>
        {isHome ? (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <MaterialCommunityIcons
              name="menu"
              size={26}
              color={colors.medium}
              style={{
                backgroundColor: colors.light,
                borderRadius: 50,
                padding: 10,
              }}
            />
          </TouchableOpacity>
        ) : (
          <MaterialCommunityIcons
            name="keyboard-backspace"
            size={20}
            color={colors.medium}
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: colors.light,
              borderRadius: 50,
              padding: 10,
            }}
          />
        )}
      </View>
      <AppText>{title}</AppText>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <MaterialCommunityIcons
            name="cart"
            size={24}
            color={colors.medium}
            style={{
              backgroundColor: colors.light,
              borderRadius: 50,
              padding: 10,
            }}
          />
          {getTotalQuantity() !== 0 &&
          <Text style={styles.cartBadge}>{getTotalQuantity()}</Text>
        }
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.white,
    // borderBottomWidth:1
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    right: 5,
    top: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    zIndex:2,
    fontSize:11,
    backgroundColor:colors.secondary,
    textAlign:"center",
    color:colors.white
  },
});
