import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, List, IconButton } from "react-native-paper";
import { router } from "expo-router";

const nonCompostableItems = [
  "Hojas o ramitas de nogal negro",
  "Cenizas de carbón o carbón vegetal",
  "Productos lácteos",
  "Plantas enfermas",
  "Grasas, manteca o aceites",
  "Huesos y restos de carne o pescado",
  "Desechos de mascotas",
  "Recortes de jardín tratados con pesticidas químicos",
  "Plásticos",
  "Metales",
  "Vidrio",
  "Telas sintéticas",
  "Madera tratada",
  "Papel de color o brillante",
  "Pegatinas o etiquetas",
  "Hojas de secadora",
  "Colillas de cigarrillos",
  "Cartón recubierto",
];

export default function NonCompostableItems() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="chevron-left"
          iconColor="#1B5E20"
          style={styles.backButton}
          size={32}
          onPress={() => router.back()}
        />
        <Text style={styles.title} numberOfLines={2}>
          Elementos No Compostables
        </Text>
      </View>
      <List.Section>
        {nonCompostableItems.map((item) => (
          <List.Item
            key={item}
            title={<Text style={styles.listItemText}>{item}</Text>}
            left={(props) => (
              <List.Icon {...props} icon="close-circle" color="#B71C1C" />
            )}
          />
        ))}
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  backButton: {
    marginLeft: -8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B5E20",
    flex: 1,
    flexWrap: "wrap",
  },
  listItemText: {
    flexShrink: 1,
  },
});