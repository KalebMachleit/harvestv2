import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { SafeAreaProvider } from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './pages/profile';
import { UserRegistration } from './pages/login/register';
import Home from './pages/home';
import { UserLogin } from './pages/login/login';
import { VendorSetup } from './pages/login/vendorsetup';

export type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  Profile: { name: string }, 
  UserRegistration: undefined,
  UserLogin: undefined
  VendorSetup: undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="UserRegistration"
          component={UserRegistration}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="VendorSetup"
          component={VendorSetup}
          options={{title: 'Setup'}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Welcome'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    padding: 5
  },
  
});

export default App;
