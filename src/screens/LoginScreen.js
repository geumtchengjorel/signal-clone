import React, { useEffect, useState } from "react";
import { image } from "faker";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Button, Input, Image, Avatar } from "react-native-elements";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";
import { auth } from "../../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //     const unSubscribe = auth.onAuthStateChanged((authUser) => {
  //       // console.log(authUser);
  //         if (authUser) {
  //             navigation.replace("Home");
  //         }
  //     });

  //     return unSubscribe;
  // }, []);

  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  const register = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      //   keyboardVerticalOffset={90}
      style={styles.container}
      enabled
    >
      {/* <ScrollView> */}
      <Image
        source={require("../../assets/signal-Logo.png")}
        style={{ width: 150, height: 150, marginBottom: 50 }}
      />
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          autoFocus
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={signIn}
        />
      </View>
      <Button containerStyle={styles.button} title="Login" onPress={signIn} />
      <Button
        containerStyle={styles.button}
        type="outline"
        title="Register"
        onPress={register}
      />
      <View style={{ height: 100 }} />
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
});
