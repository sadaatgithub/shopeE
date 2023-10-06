import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import AppButton from "../components/button/AppButton";
import AppText from "../components/heading/AppText";
import colors from "../config/colors";


// const provider = new GoogleAuthProvider();

const CreateAccountScreen = ({navigation}) => {
  

  return (
    <Screen style={styles.screen}>
      <AppText style={styles.heading}>Lets Get Started</AppText>

      <View style={styles.container}>
        <AppButton
          title="Facebook"
          style={{ backgroundColor: "#4267B2", height: 50 }}
        />
        <AppButton
          title="Twitter"
          style={{ backgroundColor: "#1DA1F2", height: 50 }}
        />
        <AppButton
          title="Google"
          style={{ backgroundColor: "#EA4335", height: 50 }}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={{ fontSize: 15,color:colors.textGray }}>
          Already have an account?{" "}
        </Text>
        <Pressable onPress={()=> navigation.navigate("Signin")}>
        <Text style={{ fontWeight: 600 }}>Signin</Text>
        </Pressable>
      </View>
      <AppButton title="Create An Account" style={styles.accountBtn} onPress={() => navigation.navigate("Signup")} />
    </Screen>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-evenly",
    flex: 1,
    backgroundColor:colors.white
  },
  heading: {
    fontSize: 28,
    fontWeight: 600,
    textAlign: "center",
    marginTop: 105,
  },
  container: {
    paddingHorizontal: 20,
    gap: 10,
    marginTop: 185,
  },
  bottom: {
    position: "absolute",
    width:"100%",
    bottom: 90,
    textAlign:"center",
    flexDirection:"row",
    justifyContent:"center"
  },

  accountBtn: {
    position: "absolute",
    bottom: 0,
    borderRadius: 0,
    height: 75,
  },
});
