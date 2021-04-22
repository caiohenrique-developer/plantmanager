import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import api from "../services/api";
import { useNavigation } from "@react-navigation/core";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PlantsEnvironmentProps {
  key: string;
  title: string;
}

interface PlantsProps {
  id: number;
  name: string;
  about: string;
  water_tips: string;
  photo: string;
  environments: [string];
  frequency: {
    times: number;
    repeat_every: string;
  };
}

export function PlantSelect() {
  const navigation = useNavigation();

  const [plantsEnvironment, setPlantsEnvironment] = useState<
    PlantsEnvironmentProps[]
  >([]);
  const [plants, setPlants] = useState<PlantsProps[]>([]);
  const [environmentActive, setEnvironmentActive] = useState("all");
  const [filterPlants, setFilterPlants] = useState<PlantsProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleEnvironmentActive = (environment: string) => {
    setEnvironmentActive(environment);

    if (environment === "all") return setFilterPlants(plants);

    const filteredPlants = plants.filter((filteredPlants) =>
      filteredPlants.environments.includes(environment)
    );

    setFilterPlants(filteredPlants);
  };

  const fetchPlants = async () => {
    const { data: plants } = await api.get("plants", {
      params: {
        _sort: "name",
        _order: "asc",
        _page: page,
        _limit: 6,
      },
    });

    if (!plants) return setIsLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...plants]);
      setFilterPlants((oldValue) => [...oldValue, ...plants]);
    } else {
      setPlants(plants);
      setFilterPlants(plants);
    }

    setIsLoading(false);
    setLoadingMore(false);
  };

  const handleFetchMore = (distance: number) => {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  };

  const plantSave = (plant: PlantsProps) => {
    navigation.navigate("PlantSave", { plant });
  };

  useEffect(() => {
    const fetchPlantsEnvironment = async () => {
      const { data: plantsEnvironment } = await api.get("plants_environments", {
        params: {
          _sort: "title",
          _order: "asc",
        },
      });

      setPlantsEnvironment([
        { key: "all", title: "Todos" },
        ...plantsEnvironment,
      ]);
    };

    fetchPlantsEnvironment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (isLoading) return <Load />;

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
          keyExtractor={(item) => String(item.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <EnvironmentButton
              title={item.title}
              active={item.key === environmentActive}
              onPress={() => handleEnvironmentActive(item.key)}
            />
          )}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filterPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary data={item} onPress={() => plantSave(item)} />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
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
  plants: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
});
