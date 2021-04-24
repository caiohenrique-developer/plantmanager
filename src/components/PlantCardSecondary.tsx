import { Feather } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { SvgFromUri } from "react-native-svg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantCardPrimaryProps extends RectButtonProps {
  data: {
    name: string;
    photo: string;
    hour: string;
  };
  handleRemove(): void;
}

export const PlantCardSecondary = ({
  data,
  handleRemove,
  ...rest
}: PlantCardPrimaryProps) => {
  return (
    <Swipeable
      overshootRight={false}
      renderRightActions={() => (
        <Animated.View>
          <View style={styles.btnRemove}>
            <RectButton onPress={handleRemove} style={styles.btnRectRemove}>
              <Feather name="trash" size={28} color={colors.white} />
            </RectButton>
          </View>
        </Animated.View>
      )}
    >
      <RectButton style={styles.container} {...rest}>
        <SvgFromUri uri={data.photo} width={50} height={50} />
        <Text style={styles.name}>{data.name}</Text>
        <View style={styles.details}>
          <Text style={styles.timeLabel}>Regar às</Text>
          <Text style={styles.timeHour}>{data.hour}</Text>
        </View>
      </RectButton>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  btnRemove: {
    position: "relative",
    top: 23,
    right: 1,

    width: 70,
    height: 70,
    backgroundColor: colors.red,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  btnRectRemove: {
    alignItems: "center",
    justifyContent: "center",

    width: "100%",
    height: "100%",
  },
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
