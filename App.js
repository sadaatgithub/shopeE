import "./app/config/firebase"
import "expo-dev-client";
import 'react-native-gesture-handler';

import { Provider } from 'react-redux';
import { store } from './app/redux/store/store';
import Routes from './app/navigation/Routes';

export default function App() {


  return <Provider store={store}>
  <Routes/>
  </Provider>
    
}

