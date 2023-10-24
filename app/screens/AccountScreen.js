import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppButton from "../components/button/AppButton";
import { useDispatch } from "react-redux";
import { clearToken, logout } from "../redux/feature/authSlice";
import { getAuth, signOut } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { useAuthentication } from "../utils/hooks/useAuthentication";
import { persistor } from "../redux/store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PURGE } from "redux-persist";
import { clearCart } from "../redux/feature/cartSlice";
const auth = getAuth();

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useAuthentication();
  GoogleSignin.configure();
  const logOut = async () => {
    if (user?.providerData[0].providerId === "google.com") {
      await GoogleSignin.revokeAccess();
    }
    signOut(auth);
    // await persistor.flush()
    // PURGE()
    // await persistor.purge()
  };
  return (
    <View style={styles.container}>
      {/* <AppButton title="Logout" style={{width:"50%"}} 
          onPress={logOut}/> */}

      <AppButton
        title="Video Player"
        style={{ width: "50%" }}
        onPress={() => navigation.navigate("VideoPlayer")}
      />
      <AppButton
        title="Youtube Shorts"
        style={{ width: "50%" }}
        onPress={() => navigation.navigate("Youtube_Shorts")}
      />
      <AppButton
        title="Podcast"
        style={{ width: "50%" }}
        onPress={() => navigation.navigate("Podcast")}
      />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap:20
  },
});
