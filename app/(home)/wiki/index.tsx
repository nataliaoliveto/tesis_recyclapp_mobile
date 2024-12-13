import { useState, useMemo } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { CircleLink } from "@features/wiki/components/circle-link";
import { MaterialsSection } from "@features/wiki/components/materials-section";
import { useDeferredValue } from "@features/wiki/hooks/useDeferredValue";
import { normalizeText } from "@features/wiki/utils/normalize-text";
import { useMaterialComponentList } from "@hooks/useMaterialComponent";
import { theme } from "src/theme";

export default function Wiki() {
  const [searchQuery, setSearchQuery] = useState("");
  const deferredSearchQuery = useDeferredValue(searchQuery, 300);

  const { data } = useMaterialComponentList();

  const allItems = useMemo(() => {
    if (!data) return [];

    const recyclableItems = data
      .filter((item) => item.isRecyclable && !item.isArchived)
      .map((item) => ({
        name: item.name,
        icon: item.icon || "help-circle",
        material: [item.materialProductId],
      }));

    const specialItems = data
      .filter((item) => !item.isRecyclable && !item.isArchived)
      .map((item) => ({
        name: item.name,
        icon: item.icon || "help-circle",
      }));

    return [
      {
        title: "Materiales reciclables",
        data: recyclableItems,
      },
      {
        title: "Desechables especiales\n¡no van a la basura!",
        data: specialItems,
      },
    ];
  }, [data]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeText(deferredSearchQuery);
    if (!normalizedQuery) return allItems;
    return allItems
      .map((section) => ({
        ...section,
        data: section.data.filter(
          (item) =>
            normalizeText(item.name).includes(normalizedQuery) ||
            normalizeText(section.title).includes(normalizedQuery)
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [allItems, deferredSearchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.circleLinksContainer}>
        <CircleLink
          href="/wiki/compost"
          icon={<MaterialIcons name="compost" size={40} color="white" />}
          text="Compostaje"
          color="#8BC34A"
        />
        <CircleLink
          href="/wiki/how-to-recycle"
          icon={
            <MaterialCommunityIcons name="recycle" size={40} color="white" />
          }
          text="Cómo Reciclar"
          color="#4CAF50"
        />
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.innerContainer}>
          <View style={styles.searchBarContainer}>
            <Ionicons
              name="search"
              size={20}
              color="#4CAF50"
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchBar}
              placeholder="Buscar material"
              placeholderTextColor="#81C784"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <FlashList
            data={filteredItems}
            renderItem={({ item }) => <MaterialsSection section={item} />}
            estimatedItemSize={200}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  circleLinksContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 16,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    width: "100%",
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 24,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: "#1B5E20",
  },
});
