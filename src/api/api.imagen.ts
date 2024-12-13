import { ImageUpload, ImageDelete } from "@models/image.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";
import { Alert } from "react-native";

export const imageApi = {
  uploadImage: async (image: ImageUpload) => {
    try {
      const result = await axios.post<ImageUpload>(
        `${backendApiConfig.baseURL}/image/upload`,
        image
      );

      Alert.alert("Éxito", "Imagen subida con éxito.");
      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al subir la imagen. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al subir la imagen. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
  deleteImage: async (image: ImageDelete) => {
    try {
      const result = await axios.post<ImageDelete>(
        `${backendApiConfig.baseURL}/image/delete`,
        image
      );

      return result;
    } catch (e) {
      if (axios.isAxiosError(e)) throw new Error(e.message);

      throw new Error("Unknown error");
    }
  },
};
