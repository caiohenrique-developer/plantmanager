import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "../styles/colors";
import { PlantSelect } from "../pages/PlantSelect";
import { MaterialIcons } from "@expo/vector-icons";
import { MyPlant } from "../pages/MyPlant";
import { Platform } from "react-native";

const AppTab = createBottomTabNavigator();

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: "beside-icon",
        style: {
          height: 88,
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
        },
      }}
    >
      <AppTab.Screen
        name="Nova planta"
        component={PlantSelect}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <AppTab.Screen
        name="Minhas plantas"
        component={MyPlant}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </AppTab.Navigator>
  );
};

export default AuthRoutes;
