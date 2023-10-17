import "./app/config/firebase"
import "expo-dev-client";
import 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import { store,persistor } from './app/redux/store/store';
import Routes from './app/navigation/Routes';
import { PersistGate } from "redux-persist/es/integration/react";


export default function App() {


  return <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
  <Routes/>
  {/* </PersistGate> */}
  </Provider>
    
}

