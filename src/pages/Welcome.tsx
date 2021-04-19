import React, { useState } from "react";

import { Image, StyleSheet, Text, SafeAreaView } from "react-native";

import wateringImg from "../assets/watering.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";

export function Welcome() {
  const [image, setImage] = useState(true);

  const imgFnc = () => {
    setImage(!image);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {"\n"}
        suas plantas {"\n"}
        de forma fácil
      </Text>

      {image && <Image source={wateringImg} style={styles.image} />}

      <Text style={styles.subtitle}>
        Não esqueça mais de regar suas plantas. {"\n"}
        Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <Button icon=">" onPress={imgFnc} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
    marginTop: 60,
  },
  image: {
    width: 292,
    height: 284,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
});
