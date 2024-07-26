import { Link, Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "@constants/colors.constant";
import { View } from "react-native";

const RouterTabs = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={() => ({
        headerRight: () => (
          <Link asChild href={"/profile"}>
            <MaterialCommunityIcons.Button
              color={colors.green[600]}
              name="face-man"
              size={36}
              onPress={() => console.log("boton")}
              backgroundColor={colors.gray[100]}
            />
          </Link>
        ),
        tabBarStyle: {
          height: `10%`,
          borderTopColor: colors.gray[50],
          backgroundColor: colors.gray[100],
        },
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerStyle: {
          borderBottomColor: colors.gray[50],
          backgroundColor: colors.gray[100],
        },
        tabBarActiveBackgroundColor: colors.gray[50],
      })}
    >
      <Tabs.Screen
        name="feed"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.green[600]}
              name="timeline-text-outline"
              size={24}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="wiki"
        options={{
          href: {
            pathname: "/wiki",
            params: { user: "cleuifi5a0000v8fc341gbc31" },
          },
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.green[600]}
              name="bookshelf"
              size={24}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.green[600]}
              name="leaf-circle"
              size={36}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.green[600]}
              name="map-marker-radius"
              size={24}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              color={colors.green[600]}
              name="gift-outline"
              size={24}
            />
          ),
          tabBarLabel: "",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: () => (
            <View style={{ width: 0, height: 0, opacity: 0 }}></View>
          ),
          title: "",
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
};

export default RouterTabs;
