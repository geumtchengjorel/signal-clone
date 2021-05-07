import { useNavigation } from "@react-navigation/core";
import { image } from "faker";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { db } from "../../firebase";

const CustonListItem = ({ id, chatName }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unSubscribe = db
      .collection("Chats")
      .doc(id)
      .collection("Messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snpashot) =>
        setChatMessages(snpashot.docs.map((doc) => doc.data()))
      );

    return unSubscribe;
  });

  const enterChat = () => {
    navigation.navigate("Chat", { id: id, chatName: chatName });
  };

  return (
    <ListItem onPress={enterChat} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: chatMessages?.[0]?.photoURL || image.imageUrl(),
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustonListItem;

const styles = StyleSheet.create({});
