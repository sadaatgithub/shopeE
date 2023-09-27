import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import AppFormField from "../components/form/AppFormField";
import AppText from "../components/heading/AppText";
import AppTextInput from "../components/form/AppTextInput";
import colors from "../config/colors";
import {Slider} from '@miblanchard/react-native-slider';
import AppButton from "../components/button/AppButton";
import AppFormInputField from "../components/form/AppFormInputField";
import { getRating } from "../utils/helpers";

const AddReviewScreen = () => {
const [rating,setRating] = useState(0)

  return (
    <Screen style={styles.screen}>
      <View style={{ marginTop: 50 }}>
       <AppFormInputField label="Name" placeholder="Enter your name"/>
      </View>
      <View style={{ marginTop: 20 }}>
        <AppText>How was your experience?</AppText>
        <View
          style={{ backgroundColor: colors.light, marginTop: 6,borderRadius:10 }}
        >
          <TextInput
            placeholder="Describe your experience?"
            multiline
            numberOfLines={12}
            placeholderTextColor={colors.textGray}
            style={{padding:15}}
            textAlignVertical="top"
          />
        </View>
      </View>



      <View style={{marginTop:20}}>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text>Star </Text>
        <View style={{flexDirection:"row"}}>
        {getRating(rating,18).map((star,idx) => <View key={idx}>{star}</View>)}
        </View>
        </View>
      <Slider
      minimumValue={0}
      maximumValue={5}
      step={0.5}
      thumbTintColor={colors.primary}
      minimumTrackTintColor={colors.primary}
      renderBelowThumbComponent={(value,idx) => <Text>{idx}</Text>}
                    value={rating}
                    onValueChange={value => setRating(value)}
                />
      </View>

      <AppButton title="Submit Review" style={styles.btn}/>
    </Screen>
  );
};

export default AddReviewScreen;

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 20,
    paddingTop:0,
    backgroundColor:colors.white,
    

  },
  btn:{
    position:"absolute",
    bottom:10,
    left:0,
    right:0,
    width:"100%",
    borderRadius:0
  }
});
