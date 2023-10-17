import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductNavigator from "./ProductNavigator";
import WishListScreen from "../screens/WishListScreen";
import AccountScreen from "../screens/AccountScreen";
import Header from "../components/Header";
import CartNavigator from "./CartNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={ProductNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          headerShown:false
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishListScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="shopping" size={size} color={color} />
          ),
        //   header: ({ navigation, route }) => (
        //     <Header 
        //         navigation={navigation} 
        //         route={route} 
        //         isHome={false} />
        //   ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-settings"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="cart" size={size} color={color} />
          ),headerShown:false
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
