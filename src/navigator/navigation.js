import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeActivity from "../Activity/HomeActivity";
import OpenTaskActivity from "../Activity/OpenTaskActivity";

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeActivity} />
          <Stack.Screen name="OpenTaskScreen" component={OpenTaskActivity} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
export default MyNavigator;