import {
  StyleSheet,
  Text,
  View,
  Switch,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import Screen from "../components/Screen";
import AppText from "../components/heading/AppText";
import colors from "../config/colors";
import AppButton from "../components/button/AppButton";
import AppFormField from "../components/form/AppFormField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"


const auth = getAuth()

const validationSchema = Yup.object().shape({
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(validationSchema),
  });

  const onSubmit =async (data) =>{
      console.log(data)
      try {
        await createUserWithEmailAndPassword(auth,data.email,data.password)
      } catch (error) {
        console.log(error)
        
      }
  }
  return (
    <Screen style={styles.screen}>
      <AppText style={styles.heading}>Sign Up</AppText>
      <KeyboardAvoidingView>
        <View style={styles.container}>
          <AppFormField 
                 label="Email"
                 placeholder="Email"
                 control={control}
                 name="email"
                 autoCapitalize="none"
                 autoCorrect={false}
                  
                  />
          <AppFormField 
                  label="Password"
                  control={control}
                  name="password"
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                  
                  />
        </View>
        <View style={styles.bottom}>
          <Text style={{ fontSize: 15, color: colors.textGray }}>
            Remember me
          </Text>
          <Switch />
        </View>
      </KeyboardAvoidingView>
      <AppButton title="Sign Up" 
      style={styles.accountBtn}
      onPress={handleSubmit(onSubmit)} />
    </Screen>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  heading: {
    fontSize: 28,
    fontWeight: 600,
    textAlign: "center",
    marginTop: 105,
  },
  container: {
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 125,
  },
  bottom: {
    marginTop: 42,
    paddingHorizontal: 20,

    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  accountBtn: {
    position: "absolute",
    bottom: 0,
    borderRadius: 0,
    height: 75,
  },
});
