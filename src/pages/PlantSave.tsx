import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Platform,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { useRoute, useNavigation } from "@react-navigation/core";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";

import waterdrop from "../assets/waterdrop.png";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { isBefore, format } from "date-fns";
import { PlantProps, savePlant } from "../libs/storage";

interface Plant {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const navigation = useNavigation();
  const route = useRoute();
  const { plant } = route.params as Plant;

  function handleDateTime(_: Event, dateTime: Date | undefined) {
    if (Platform.OS === "android") setShowDatePicker((oldState) => !oldState);

    if (dateTime && isBefore(dateTime, new Date())) {
      setSelectedDateTime(new Date());

      Alert.alert("Escolha um tempo no futuro! ⏰");
    }

    if (dateTime) setSelectedDateTime(dateTime);
  }

  function handleAndroidOpenDateTimePicker() {
    setShowDatePicker((oldState) => !oldState);
  }

  async function handleSavePlant() {
    try {
      await savePlant({
        ...plant,
        dateTimeNotification: selectedDateTime,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo porque vamos sempre lembrar você de cuidar de sua plantinha com bastante amor.",
        buttonTitle: "Muito obrigado :D",
        icon: "hug",
        nextScreen: "MyPlant",
      });
    } catch {
      Alert.alert(
        "Não foi possível cadastrar está planta! 🚫 \n Por favor, tente novamente!"
      );
    }
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} width={150} height={150} />

          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>

        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={waterdrop} style={styles.tipImage} />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>

          <Text style={styles.alertLabel}>
            Escolha o melhor horário para ser lembrado:
          </Text>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode="time"
              display="spinner"
              onChange={handleDateTime}
            />
          )}

          {Platform.OS === "android" && (
            <TouchableOpacity
              onPress={handleAndroidOpenDateTimePicker}
              style={styles.dateTimePickerButton}
            >
              <Text style={styles.dateTimePickerText}>{`Horário: ${format(
                selectedDateTime,
                "HH:mm"
              )}`}</Text>
            </TouchableOpacity>
          )}

          <Button title="Cadastrar planta" onPress={handleSavePlant} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 30,
    paddingVertical: 50,
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    position: "relative",
    bottom: 70,

    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.blue_light,
    borderRadius: 20,
    padding: 20,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
  },
  alertLabel: {
    textAlign: "center",
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontFamily: fonts.text,
    fontSize: 24,
  },
});
