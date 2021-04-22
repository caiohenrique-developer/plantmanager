import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import asyncStorage from "@react-native-async-storage/async-storage";

import profileAvatar from "../assets/46091590692_00208f6a08_b.jpg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Header() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loadStorageUserName = async () => {
      const user = await asyncStorage.getItem("@PlantManager:username");

      setUserName(user || "");
    };

    loadStorageUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image source={profileAvatar} style={styles.userAvatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
});
