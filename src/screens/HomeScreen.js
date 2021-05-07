import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { auth, db } from "../../firebase";
import CustonListItem from "../components/CustonListItem";
import { image } from "faker";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOutUser = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unSubscribe = db.collection("Chats").onSnapshot((snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unSubscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => {
        return (
          <View style={{ marginLeft: 20 }}>
            <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
              <Avatar
                rounded
                source={{ uri: image.imageUrl() }} // auth?.currentUser?.photoUrl }}
              />
            </TouchableOpacity>
          </View>
        );
      },

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("AddChat")}
            activeOpacity={0.5}
          >
            <SimpleLineIcons name="pencil" size={24} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  //  const enterChat = () => {

  //   }

  return (
    <SafeAreaView>
      <ScrollView style={styles.conatiner}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustonListItem key={id} id={id} chatName={chatName} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  conatiner: {
    height: "100%",
  },
});
