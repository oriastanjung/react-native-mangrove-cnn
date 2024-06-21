import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import KlasifikasiFileScreen from './screens/KlasifikasiFileScreen';
import JenisMangroveScreen from './screens/JenisMangroveScreen';
import KlasifikasiScreen from './screens/KlasifikasiScreen';
import KlasifikasiPhotoScreen from "./screens/KlasifikasiPhotoScreen"
import DetailJenisMangrove from './screens/DetailJenisMangrove';
const Stack = createStackNavigator();

const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#000000',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={lightTheme}>
        <StatusBar style="dark" />
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="splash">
          <Stack.Screen name="splash" component={SplashScreen} />
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="klasifikasiScreen" component={KlasifikasiScreen} />
          <Stack.Screen name="jenisMangroveScreen" component={JenisMangroveScreen} />
          <Stack.Screen name="DetailMangroveDataScreen" component={DetailJenisMangrove} />
          <Stack.Screen name="klasifikasiFileScreen" component={KlasifikasiFileScreen} />
          <Stack.Screen name="photoKlasifikasiScreen" component={KlasifikasiPhotoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
