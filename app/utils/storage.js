import * as SecureStore from "expo-secure-store"
import jwtDecode from "jwt-decode"

const key = "authToken";
const storeToken = async (authToken) =>{
    try {
        await SecureStore.setItemAsync(key,authToken)
        
    } catch (error) {
        console.log("Error storing the auth Token")
        
    }
}
const getToken = async () => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      console.log("Error getting the auth token", error);
    }
  };
  const removeToken = async () => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.log("Error removing the auth token", error);
    }
  }

  export default {storeToken,getToken,removeToken} 