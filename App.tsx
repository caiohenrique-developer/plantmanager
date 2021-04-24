import React, { useEffect } from "react";
import Routes from "./src/routes";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";
import * as Notifications from "expo-notifications";
import { PlantProps } from "./src/libs/storage";

export default function App() {
  const [fonstLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  useEffect(() => {
    async function notifications() {
      // notifications listener
      const subscription = Notifications.addNotificationReceivedListener(
        async (notification) => {
          notification.request.content.data.plant as PlantProps;
        }
      );

      // remmove all notifications
      // await Notifications.cancelAllScheduledNotificationsAsync();

      // show all notifications
      const data = await Notifications.getAllScheduledNotificationsAsync();
      console.log(data);

      return () => subscription.remove();
    }

    notifications();
  }, []);

  if (!fonstLoaded) return <AppLoading />;

  return <Routes />;
}
