import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { authScreens, userSreens } from "./src/constants/screens";
import { Provider, useDispatch, useSelector } from "react-redux";
import { login, logout, selectedUser } from "./src/redux/features/userSlice";
import Store from "./src/redux/store/store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { auth } from "./firebase";

const Stack = createStackNavigator();
const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6BED" },
  headerTitleStyle: { color: "white" },
  headerTintColor: "white",
};

export default function App() {
  return (
    <Provider store={Store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

const RootNavigator = () => {
  const authUser = useSelector(selectedUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            email: authUser.email,
            displayName: authUser.displayName,
            profileURL: authUser.photoURL,
            phoneNumber: authUser.phoneNumber,
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsuscribe;
  }, []);

  return (
    <Stack.Navigator screenOptions={globalScreenOptions}>
      {Object.entries({
        ...(authUser ? userSreens : authScreens),
      }).map(([name, component], ind) => (
        <Stack.Screen name={name} component={component} key={name + ind} />
      ))}
    </Stack.Navigator>
  );
};
