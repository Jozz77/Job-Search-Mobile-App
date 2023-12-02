import { Stack } from 'expo-router'
import React, { useCallback } from 'react'
import * as SplashScreen from 'expo-splash-screen'
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();

const Layout = () => {
  const  [fontloaded] = useFonts({
    DMBold: require('../assets/fonts/DMSans-Bold.ttf'),
    DMMedium: require('../assets/fonts/DMSans-Medium.ttf'),
    DMRegular: require('../assets/fonts/DMSans-Regular.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontloaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontloaded])
  if (!fontloaded) return null 
  return <Stack onLayout={onLayoutRootView}/>
}

export default Layout;