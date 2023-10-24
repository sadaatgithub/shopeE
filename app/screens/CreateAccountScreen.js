import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Screen from "../components/Screen";
import AppButton from "../components/button/AppButton";
import AppText from "../components/heading/AppText";
import colors from "../config/colors";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { getAuth, signInWithCredential,GoogleAuthProvider } from "firebase/auth";
import LoadingModal from "../components/modal/LoadingModal";
const provider = new GoogleAuthProvider();


const auth = getAuth()
const CreateAccountScreen = ({navigation}) => {
  
const [isLoading,setIsLoading] = useState(false)

  GoogleSignin.configure({
    webClientId: '920822928477-k3f5ad71a5ln5rmebdsa18u7nmjemb6f.apps.googleusercontent.com',
  });
  const onGoogleButtonPress = async () =>{
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const credential  = await GoogleSignin.signIn();

    const googleCredential = GoogleAuthProvider.credential(credential.idToken);
    // console.log(googleCredential)


    try {
      setIsLoading(true)
      await signInWithCredential(auth,googleCredential)
      setIsLoading(false)
      
    } catch (error) {
      console.log(error)
      
    }

  }


  return (
    <Screen style={styles.screen}>
      <AppText style={styles.heading}>Lets Get Started</AppText>
      <LoadingModal isLoading={isLoading}/>

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
          onPress={onGoogleButtonPress}
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
