import { Address, AddressPost, AddressPut } from "@models/address.type";
import { backendApiConfig } from "./api.config";
import axios from "axios";
import { Alert } from "react-native";

export const addressApi = {
  getAddress: async () => {
    try {
      const result = await axios.get<Address[]>(
        `${backendApiConfig.baseURL}/addresses`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  getAddressById: async (id: string) => {
    try {
      const result = await axios.get<Address>(
        `${backendApiConfig.baseURL}/address/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  getAddressClerkId: async (id: string) => {
    try {
      const result = await axios.get<Address[]>(
        `${backendApiConfig.baseURL}/addressesByUser/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        throw new Error(e.message);
      }

      throw new Error("Unknown error");
    }
  },
  createAddress: async (address: AddressPost) => {
    const result = await axios.post<Address>(
      `${backendApiConfig.baseURL}/address`,
      address
    );

    return result.data;
  },
  updateAddress: async (address: AddressPut) => {
    try {
      const result = await axios.put<Address>(
        `${backendApiConfig.baseURL}/address/${address.id}`,
        address
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al actualizar la dirección. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al actualizar la dirección. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
  deleteAddress: async (id: string) => {
    try {
      const result = await axios.delete<Address>(
        `${backendApiConfig.baseURL}/address/${id}`
      );

      return result.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        Alert.alert(
          "Error",
          "Ocurrió un problema al eliminar la dirección. Intente nuevamente."
        );
        throw new Error(e.message);
      }

      Alert.alert(
        "Error",
        "Ocurrió un problema al eliminar la dirección. Intente nuevamente."
      );
      throw new Error("Unknown error");
    }
  },
};
