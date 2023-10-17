import {
  ActivityIndicator,
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Constants from "expo-constants";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
// import Text from "./heading/Text";
import { useSelector } from "react-redux";
import AppPicker from "./form/AppPicker";
import { useAuthentication } from "../utils/hooks/useAuthentication";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getAuth, signOut } from "firebase/auth";
import { useGetUserQuery } from "../redux/feature/authApiSlice";
import AppText from "./heading/AppText";
import AppFormInputField from "./form/AppFormInputField";
import {
  useGetProductsQuery,
  useLazyGetProductsQuery,
} from "../redux/feature/productApiSlice";
import useDebounce from "../utils/hooks/useDebounce";
import SearchProducts from "./SearchProducts";
const auth = getAuth();


const Header = ({ navigation, iconRight, isHome, title }) => {
  GoogleSignin.configure();

  const [userModal, setUserModal] = useState(false);

  const { user } = useAuthentication();
  const { data } = useGetUserQuery(13, { skip: !user });
  

  const cart = useSelector((state) => state.cart);
  const getTotalQuantity = () => {
    let total = 0;
    cart?.cart?.forEach((item) => {
      total += item.quantity;
    });
    return total;
  };
  const logOut = async () => {
    if (user?.providerData[0].providerId === "google.com") {
      await GoogleSignin.revokeAccess();
    }
    signOut(auth);
  };
  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure to logout", [
      { text: "Yes", onPress: logOut },
      { text: "No" },
    ]);
  };


  
 
  return (
    <View style={styles.header}>
      <View style={{ justifyContent: "center", flex: isHome ? 1 : 0.3 }}>
        {isHome ? (
          // onPress={() => navigation.openDrawer()}
          <SearchProducts/>
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
              width: 40,
            }}
          />
        )}
        
      </View>
      <Text>{title}</Text>
      <View style={{ flexDirection: "row", gap: 4 }}>
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
          {getTotalQuantity() !== 0 && (
            <Text style={styles.cartBadge}>{getTotalQuantity()}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setUserModal(!userModal)}>
          {/* <AppPicker/> */}
          <Image source={require("../assets/user.png")} style={styles.user} />
        </TouchableOpacity>
        {/* <View style={styles.userMenu}>

      </View> */}
        <Modal
          animationType="fade"
          style={{ backgroundColor: "rgba (0,0,0,0.5)" }}
          transparent
          visible={userModal}
          onRequestClose={() => setUserModal(false)}
        >
          <View
            style={{
              backgroundColor: colors.white,
              width: "50%",
              right: 0,
              top: 60,
              position: "absolute",
              elevation: 3,
              borderRadius: 14,
              padding: 20,
              gap: 20,
            }}
          >
            <View style={{ flexDirection: "row", gap: 20 }}>
              <AppText>{data?.first_name}</AppText>
              <AppText>{data?.last_name}</AppText>
            </View>
            <Text>Edit Profile</Text>
            <Text>My Addresess</Text>
            <Text>My Orders</Text>
            <Text>My Transactions</Text>
            <Text onPress={handleLogout}>Logout</Text>
          </View>
        </Modal>
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
    gap: 6,
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
    zIndex: 2,
    fontSize: 11,
    backgroundColor: colors.secondary,
    textAlign: "center",
    color: colors.white,
  },
  user: {
    width: 40,
    height: 40,
    objectFit: "cover",
    borderRadius: 20,
  },
  userMenu: {
    backgroundColor: colors.white,
    width: 200,
    height: 200,
    position: "absolute",
    top: 50,
    right: -10,
    borderWidth: 1,
    borderColor: colors.light,
    borderRadius: 12,
  },
});
