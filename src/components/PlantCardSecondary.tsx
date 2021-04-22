import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
}

export const PlantCardSecondary = ({
  data,
  ...rest
}: PlantCardPrimaryProps) => {
  return (
    <RectButton style={styles.container} {...rest}>
      <SvgFromUri uri={data.photo} width={50} height={50} />
      <Text style={styles.name}>{data.name}</Text>
      <View style={styles.details}>
        <Text style={styles.timeLabel}>Regas as</Text>
        <Text style={styles.timeHour}>{data.hour}</Text>
      </View>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",

    width: "100%",
    borderRadius: 20,
    marginVertical: 5,
    paddingVertical: 25,
    paddingHorizontal: 10,
    backgroundColor: colors.shape,
  },
  name: {
    flex: 1,
    marginLeft: 10,
    color: colors.heading,
    fontSize: 17,
    fontFamily: fonts.heading,
  },
  details: {
    alignItems: "flex-end",
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.body_light,
  },
  timeHour: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: fonts.heading,
    color: colors.body_dark,
  },
});
