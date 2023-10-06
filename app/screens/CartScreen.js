import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from "react-native";
import React from "react";
import Screen from "../components/Screen";
import ProductCartCard from "../components/ProductCartCard";
import CardTitle from "../components/heading/CardTitle";
import AppText from "../components/heading/AppText";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";
import AppButton from "../components/button/AppButton";
import { useSelector, useDispatch } from "react-redux";

const CartScreen = ({navigation}) => {
  const cart = useSelector((state) => state.cart.cart);
  console.log(cart.length);
  const getTotal = () => {
    let totalQuantity = 0;
    let subTotal = 0;
    let shipping = 20;

    cart.forEach((item) => {
      totalQuantity += item.quantity;
      subTotal += item.price * item.quantity;
    });
    if (subTotal > 500) {
      shipping = 0;
    }

    return { subTotal, totalQuantity, shipping };
  };
  return (
    <Screen style={styles.screen}>
      {cart.length == 0 ? (
        <View style={{flex:1, justifyContent:'center',alignItems:"center"}}>
          <AppText>Cart is empty !</AppText>
          <AppButton title="Continue Shopping" color="primary" onPress={() => navigation.navigate("Home")} style={{width:"50%"}}/>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={{ gap: 10, marginTop: 20 }}>
              {cart.map((product) => (
                <ProductCartCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  imageUrl={product.image}
                  qty={product.quantity}
                  id={product.id}
                />
              ))}
            </View>

            {/* delivery Address----------------> */}

            <View style={styles.delivery}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AppText>Delivery Address</AppText>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={25}
                  color={colors.textGray}
                  style={styles.deleteIcon}
                />
              </View>
              <View style={{ flexDirection: "row", gap: 15, marginTop: 15 }}>
                <View style={{ width: 50, height: 50, borderRadius: 10 }}>
                  <Image
                    source={require("../assets/location.png")}
                    style={{ width: "100%", height: 50, borderRadius: 10 }}
                  />
                </View>
                <View>
                  <AppText style={{ fontSize: 15 }}>
                    Line 1,Sunamgonj,12/88
                  </AppText>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 11,
                      color: colors.textGray,
                    }}
                  >
                    City
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color="#4AC76D"
                style={{ position: "absolute", right: 5, bottom: 5 }}
              />
            </View>
            <View style={styles.delivery}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <AppText>Payment Method</AppText>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={25}
                  color={colors.textGray}
                  style={styles.deleteIcon}
                />
              </View>
              <View style={{ flexDirection: "row", gap: 15, marginTop: 15 }}>
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: colors.light,
                  }}
                >
                  <Image
                    source={require("../assets/card.png")}
                    style={{ width: "100%", height: 50, borderRadius: 10 }}
                  />
                </View>
                <View>
                  <AppText style={{ fontSize: 15 }}>Visa Classic</AppText>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 11,
                      color: colors.textGray,
                    }}
                  >
                    ****7690
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color="#4AC76D"
                style={{ position: "absolute", right: 5, bottom: 5 }}
              />
            </View>

            <View style={{ paddingBottom: 100 }}>
              <AppText>Order Info</AppText>
              <View style={{ marginTop: 15, rowGap: 10 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>Subtotal</Text>
                  <Text style={{ fontWeight: 600 }}>
                    Rs. {getTotal().subTotal}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>Shipping Cost</Text>
                  <Text style={{ fontWeight: 600 }}>
                    {getTotal().subTotal < 500 ? "Rs.20" : "Free"}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>Total</Text>
                  <Text style={{ fontWeight: 600 }}>
                    Rs. {getTotal().subTotal + getTotal().shipping}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      {cart.length > 0 && <AppButton title="Checkout" style={styles.btn} />}
    </Screen>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: 20,
    gap: 20,
  },

  delivery: {},
  btn: {
    position: "absolute",
    bottom: 0,
    borderRadius: 0,
    height: 75,
  },
});
