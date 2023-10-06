import 'dotenv/config'

export default {
  "expo": {
    "name": "shopEe",
    "slug": "shopEe",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./app/assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./app/assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./app/assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      package: 'com.sada_at_expo.shopEe',
      "googleServicesFile": "./google-services.json"
    },
    "plugins": ["@react-native-google-signin/google-signin"],
    "web": {
      "favicon": "./app/assets/favicon.png"
    },
    "extra": {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
      "eas": {
        "projectId": "7b0bf1d3-614d-4311-a64c-11943e6c52a3"
      }
    }
    
  }
}
