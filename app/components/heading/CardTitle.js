import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "./AppText";
import colors from "../../config/colors";

const CardTitle = ({ heading, subheading,style ,onPress}) => {
  return (
    <View style={[styles.container,style]}>
      <AppText style={{ fontSize: 17, fontWeight: 600, color: colors.dark }}>
        {heading}
      </AppText>
      <Pressable style={{ alignItems: "center" }} onPress={onPress}>
        <AppText
          style={{ fontSize: 13, fontWeight: 500, color: colors.textGray }}
        >
          {subheading}
        </AppText>
      </Pressable>
    </View>
  );
};

export default CardTitle;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingRight: 20,
    alignItems: "center",
  },
});
