import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const AuthLayout = () => {
  return (
  <Stack>
       <Stack.Screen
        name="sign-in"
        options={{
          animation: "slide_from_right",
          animationDuration: 300,
          headerShown: false,
        }}
      />
            <Stack.Screen
        name="sign-up"
        options={{
          animation: "slide_from_right",
          animationDuration: 300,
          headerShown: false,
        }}
      />
  </Stack>
  )
}

export default AuthLayout