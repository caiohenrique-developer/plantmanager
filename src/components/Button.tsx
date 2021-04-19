import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import colors from "../styles/colors";

interface ButtonProps extends TouchableOpacityProps {
  icon: string;
}

export function Button({ icon, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} {...rest}>
      <Text style={styles.buttonIcon}>{icon}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 50,
    height: 56,
    width: 56,
    paddingHorizontal: 10,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 24,
  },
});
