import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider, View } from "native-base";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import THEME from './THEME';
import CharactersScreen from "./screens/charactersscreen";

const Stack = createNativeStackNavigator();

export default function App() {
  
  const [appIsReady, setAppIsReady] = useState(false);
  
  const [fontsLoaded] = useFonts({
    'Spiegel-Regular': require('./assets/fonts/Spiegel/Spiegel-Regular.otf'),
    'Spiegel-RegularItalic': require('./assets/fonts/Spiegel/Spiegel-RegularItalic.otf'),
    'Spiegel-SemiBold': require('./assets/fonts/Spiegel/Spiegel-SemiBold.otf'),
    'Spiegel-Bold': require('./assets/fonts/Spiegel/Spiegel-Bold.otf'),
    'Spiegel-SemiBoldItalic': require('./assets/fonts/Spiegel/Spiegel-SemiBoldItalic.otf'),
    'Spiegel-BoldItalic': require('./assets/fonts/Spiegel/Spiegel-BoldItalic.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {

      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    const delay = 3000; // 3 seconds
    const timeoutId = setTimeout(() => {
      SplashScreen.hideAsync();
    }, delay);

    setAppIsReady(true);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <View onLayout={onLayoutRootView} />
        <Stack.Navigator initialRouteName="Characters" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Characters" component={CharactersScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
