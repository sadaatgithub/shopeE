import {
  KeyboardAvoidingView,
  StyleSheet,
  Switch,
  Text,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  Modal,
  ActivityIndicator,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import AppText from "../components/heading/AppText";
import AppFormField from "../components/form/AppFormField";
import AppButton from "../components/button/AppButton";
import colors from "../config/colors";
import * as Yup from "yup";
import { useForm } from "react-hook-form";

import LoadingModal from "../components/modal/LoadingModal";
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
// import { ScrollView } from "react-native-gesture-handler";

const auth = getAuth();
const validationSchema = Yup.object().shape({
  email: Yup.string().required().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LoginScreen = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading,setIsLoading] = useState(false)
  const [isPasswordtype,setPasswordTYpe] = useState(true)
  console.log(isPasswordtype)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(validationSchema)  
  });

  const onSubmit = async (data) => {
    setIsLoading(true)

    try {
      await signInWithEmailAndPassword(auth,data.email,data.password)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      
    }
    // login(data)
    //   .unwrap()
    //   .then((res) => {
    //     dispatch(storeToken(res.token));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <LoadingModal isLoading={isLoading}/>
      <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={{ marginTop: 115 }}>
            <AppText style={styles.heading}>Welcome</AppText>
            <Text style={styles.subheading}>
              Please enter your details to continue
            </Text>
          </View>
          <View style={styles.formContainer}>
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
              secureTextEntry={isPasswordtype}
              textContentType="password"
              icon={`${isPasswordtype? "eye-off":"eye"}`}
              onPress={()=> setPasswordTYpe(!isPasswordtype)}
            />
          </View>

          <AppText style={styles.password}>Forgot Password?</AppText>
          <View style={styles.rememberMe}>
            <Text style={{ fontSize: 15, color: colors.textGray }}>
              Remember me
            </Text>
            <Switch
              value={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              thumbColor={colors.primary}
              trackColor={{ false: colors.textGray, true: colors.medium }}
            />
          </View>
          <View style={styles.terms}>
            <Text
              style={{
                textAlign: "center",
                color: colors.textGray,
                fontSize: 13,
              }}
            >
              By connecting your account confirm that you are agree with our{" "}
              <Text style={{ color: colors.medium }}>Terms and Conditions</Text>{" "}
            </Text>
          </View>
          
        </View>
      </TouchableWithoutFeedback>
      </ScrollView>
      <AppButton
            title="Login"
            style={styles.accountBtn}
            onPress={handleSubmit(onSubmit)}
          />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: 700,
    textAlign: "center",
    color: colors.medium,
  },
  subheading: {
    textAlign: "center",
    color: colors.textGray,
    fontSize: 15,
  },
  formContainer: {
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 70,
  },
  password: {
    textAlign: "right",
    paddingHorizontal: 20,
    marginTop: 30,
    fontSize: 15,
    color: colors.danger,
  },
  rememberMe: {
    marginTop: 40,
    paddingHorizontal: 20,

    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  terms: {
    paddingHorizontal: 24,
    textAlign: "center",
    flexDirection: "row",
    marginTop: 40,
  },

  accountBtn: {
    position: "absolute",
    bottom: 0,
    borderRadius: 0,
    height: 75,
  },
  container: {
    flex: 1,
    backgroundColor:colors.white
  },
  inner: {
    flex: 1,
  },
});
