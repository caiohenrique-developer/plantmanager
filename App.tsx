import React from "react";
import { UserIdentification } from "./src/pages/UserIdentification";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";

export default function App() {
  const [fonstLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fonstLoaded) return <AppLoading />;

  return <UserIdentification />;
}
