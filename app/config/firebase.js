
// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import Constants  from "expo-constants";
import {initializeAuth,getReactNativePersistence} from "firebase/auth"
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASq-bmHv3IZ0v6euqEDy_XlrbXchHlaC8",
  authDomain: Constants.manifest2?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest2?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest2?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest2?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest2?.extra?.firebaseAppId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app,{
  persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})

// const auth = getAuth(app)
export default app;