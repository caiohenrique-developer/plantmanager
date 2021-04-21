import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import api from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantsEnvironmentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [plantsEnvironment, setPlantsEnvironment] = useState<
    PlantsEnvironmentProps[]
  >([]);

  useEffect(() => {
    const fetchPlantsEnvironment = async () => {
      const { data: plantsEnvironment } = await api.get("plants_environments");

      setPlantsEnvironment([
        { key: "all", title: "Todos" },
        ...plantsEnvironment,
      ]);
    };

    fetchPlantsEnvironment();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={plantsEnvironment}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <EnvironmentButton title={item.title} />}
          contentContainerStyle={styles.environmentList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 17,
    fontWeight: "bold",
    color: colors.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },
  environmentList: {
    justifyContent: "center",
    height: 40,
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },
});
