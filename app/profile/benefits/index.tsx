import { useState } from "react";
import CardProfile from "@components/CardProfile";
import { Link, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Title,
  Text,
  TextInput,
  IconButton,
} from "react-native-paper";
import { theme } from "src/theme";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Benefits() {
  const [visible, setVisible] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const router = useRouter();
  const showModal = () => setVisible(true);

  const hideModal = () => {
    setVisible(false);
    setCode("");
  };
  const changeCode = (text: string) => {
    if (text.length > 10) return;
    setCode(text);
  };
  const confirmCode = () => {
    console.log(code);
    //TODO validar el funcionamiento del codigo
    hideModal();
  };

  return (
    <SafeAreaView style={{ flex: 1, height: "100%" }}>
      <View style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}>
        <Link href="/profile" asChild>
          <IconButton icon="arrow-left" size={24} />
        </Link>
        <Title style={{ color: theme.colors.primary }}>Mis beneficios</Title>
      </View>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={{
                backgroundColor: "white",
                padding: 20,
              }}
            >
              <View style={{ gap: 20 }}>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 18,
                    color: theme.colors.primary,
                    textAlign: "center",
                  }}
                >
                  Ingreso de beneficio otorgado
                </Text>
                <TextInput
                  mode="outlined"
                  label="Ingrese el código"
                  placeholder="Código de intercambio"
                  value={code}
                  onChangeText={(text) => changeCode(text)}
                />
                <Button
                  mode="contained-tonal"
                  onPress={confirmCode}
                  disabled={code === ""}
                >
                  Confirmar recepción
                </Button>
                <Button
                  mode="contained"
                  onPress={hideModal}
                  buttonColor={theme.colors.errorContainer}
                  textColor={theme.colors.onErrorContainer}
                >
                  Cancelar
                </Button>
              </View>
            </Modal>
          </Portal>
          <View style={{ flex: 1, alignItems: "flex-start", width: "100%" }}>
            <View style={{ width: "100%" }}>
              <View style={{ marginBottom: 20 }}>
                <CardProfile title="Beneficiososossoos" type={"beneficio"} />
                <CardProfile title="Beneficiososossoos" type={"beneficio"} />
                <CardProfile title="Beneficiososossoos" type={"beneficio"} />
                <CardProfile title="Beneficiososossoos" type={"beneficio"} />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ padding: 16, gap: 15 }}>
          <Button
            mode="contained"
            onPress={() => router.push("/profile/benefits/new")}
          >
            Agregar beneficio
          </Button>
          <Button mode="contained-tonal" onPress={showModal}>
            Recibir código
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
