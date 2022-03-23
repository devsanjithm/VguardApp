import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeActivity from "../Activity/HomeActivity";
import OpenTaskActivity from "../Activity/OpenTaskActivity";

const Stack = createNativeStackNavigator();

const MyNavigator = () => {
  return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: true }}>
          <Stack.Screen name="HomeScreen" component={HomeActivity} 
          options={{
            headerShown:false
          }}/>
          <Stack.Screen name="OpenTaskScreen" component={OpenTaskActivity} 
           options={{
            title: 'Task Screen',
            headerTitleStyle: {
              fontSize: 19,
              color: "#fff"
            },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
            headerStyle:{
              backgroundColor:"#000"
            }
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
  )
}
export default MyNavigator;