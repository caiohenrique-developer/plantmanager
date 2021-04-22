import React from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SvgFromUri } from "react-native-svg";

import waterdrop from "../assets/waterdrop.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";

export function PlantSave() {
  return (
    <View style={styles.container}>
      <View style={styles.plantInfo}>
        <SvgFromUri uri="" width={150} height={150} />

        <Text style={styles.plantName}>Nome da planta</Text>
        <Text style={styles.plantAbout}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
          incidunt enim tempora repellat rerum quae odio nisi sint vero deserunt
          voluptatibus aspernatur accusamus officiis, aut maiores consectetur!
          Unde, illum natus?
        </Text>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterdrop} style={styles.tipImage} />
          <Text style={styles.tipText}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        <Button title="Cadastrar planta" onPress={() => {}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {},
  plantName: {},
  plantAbout: {},
  controller: {},
  tipContainer: {},
  tipImage: {},
  tipText: {},
  alertLabel: {},
});
