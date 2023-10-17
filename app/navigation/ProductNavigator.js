import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ReviewsScreen from "../screens/ReviewsScreen";
import ProductListingScreen from "../screens/ProductListingScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import Header from "../components/Header";

const Stack = createStackNavigator();

const ProductNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={HomeScreen}
        options={{
          header: ({ navigation, route }) => (
            <Header navigation={navigation} route={route} isHome={true} />
          ),
        }}
      />
      <Stack.Screen
        name="ProductListings"
        component={ProductListingScreen}
        options={{
          header: ({ navigation, route }) => (
            <Header
              navigation={navigation}
              route={route}
              isHome={false}
              title="All Products"
            />
          ),
        }}
      />
      {/* <Stack.Screen name="All Review" component={ReviewsScreen} options={{headerTitle:"All Reviews"}} /> */}
    </Stack.Navigator>
  );
};

export default ProductNavigator;
