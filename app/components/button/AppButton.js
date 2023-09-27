import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../../config/colors";

const AppButton = ({ title, onPress, color = "primary", style}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] },style]}
      onPress={onPress}
    >
      <Text style={[styles.text,{color:color==='light'? colors.textGray:colors.white}]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight:600
  },
});
