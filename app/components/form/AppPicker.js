import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";

const AppPicker = ({
  placeholder,
  items,
  style,
  ...otherProps
}) => {
  return (
   
    <View style={[styles.picker, style]}>
        <Text style={styles.placeholder}>{placeholder}</Text>
     
      <Picker  itemStyle={{ fontSize: 11 }} {...otherProps}>
        {items?.map((item) => (
          <Picker.Item
            key={item.value}
            label={item.label}
            value={item.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default AppPicker;

const styles = StyleSheet.create({
    placeholder:{
        paddingHorizontal:18

    },
  picker: {
    // flexDirection:"row",
    // alignItems: "center",
    // gap:60,
    // borderWidth:1,
    // width:"100%",
    justifyContent: "flex-end",
  },
});
