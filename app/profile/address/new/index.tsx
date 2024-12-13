import {
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Button, Title, Text, TextInput, IconButton } from "react-native-paper";
import { theme } from "src/theme";
import { Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useAddressStore } from "@stores/useAddressStore";
import { SafeAreaView } from "react-native-safe-area-context";
import type { AddressPost, AddressPut } from "@models/address.type";
import { useCreateAddress, useUpdateAddress } from "@hooks/useAddress";
import { isClerkAPIResponseError, useUser } from "@clerk/clerk-expo";
import { zodResolver } from "@hookform/resolvers/zod";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useRef } from "react";
import { useUserStoreByClerk } from "@hooks/useUser";

type FormValues = {
  street: string;
  flat: string;
  city: string;
  state: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  displayName: string | null;
};

const formSchema = z.object({
  street: z
    .string()
    .min(3, { message: "El nombre y número de la calle son obligatorios." }),
  flat: z.string().optional(),
  city: z
    .string()
    .min(3, { message: "El nombre de la localidad es obligatorio." }),
  state: z
    .string()
    .min(3, { message: "El nombre de la provincia es obligatorio." }),
  postalCode: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine(
      (val) => val.length === 4,
      "Debe ser un número de exactamente 4 dígitos"
    ),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  displayName: z.string(),
});

const prepareAddressData = (
  formData: FormValues,
  userId: string,
  displayName: string | null
): AddressPost => {
  const addressData: AddressPost = {
    street: formData.street,
    city: formData.city,
    state: formData.state,
    postalCode: formData.postalCode,
    userId: userId,
    isArchived: false,
    displayName: displayName,
  };

  if (formData.latitude !== undefined && formData.longitude !== undefined) {
    addressData.latitude = formData.latitude;
    addressData.longitude = formData.longitude;
  }

  return addressData;
};

export default function NewAddress() {
  const { user, isLoaded } = useUser();
  if (!isLoaded || !user?.id) return null;

  const { currentAddress, clearCurrentAddress } = useAddressStore();
  const { mutateAsync: createAddress, isPending: isLoadingCreate } =
    useCreateAddress();
  const { mutateAsync: editAddress, isPending: isLoadingEdit } =
    useUpdateAddress();
  const { data: userStore } = useUserStoreByClerk({ userId: user.id });

  const handleCancel = () => {
    reset();
    clearCurrentAddress();
    router.replace("/profile/address");
  };

  const onSubmit = async (formData: FormValues) => {
    try {
      const addressData = prepareAddressData(
        formData,
        user.id,
        userStore?.id ? user.username : null
      );
      if (currentAddress) {
        await editAddress({
          ...addressData,
          id: currentAddress.id,
        });
      } else {
        await createAddress(addressData);
      }

      handleCancel();
    } catch (error) {
      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].longMessage);
      }
    }
  };

  const {
    control,
    reset,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      street: currentAddress?.street || "",
      flat: currentAddress?.flat || "",
      city: currentAddress?.city || "",
      state: currentAddress?.state || "",
      postalCode: currentAddress?.postalCode || "",
      latitude: currentAddress?.latitude,
      longitude: currentAddress?.longitude,
      displayName: user.username || null,
    },
  });

  const autocompleteRef = useRef(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View
            style={{ flexDirection: "row", zIndex: 1, alignItems: "center" }}
          >
            <Link href="/profile/address" asChild>
              <IconButton icon="arrow-left" size={24} />
            </Link>
            <Title style={{ color: theme.colors.primary }}>
              Dirección {currentAddress?.street || "nueva"}
            </Title>
          </View>

          {/* Main Content */}
          <View style={{ flex: 1, padding: 16 }}>
            {/* Google Places Autocomplete */}
            <View style={{ zIndex: 2 }}>
              <GooglePlacesAutocomplete
                ref={autocompleteRef}
                placeholder="Buscar dirección"
                fetchDetails={true}
                onPress={(_, details = null) => {
                  if (details?.address_components) {
                    const addressComponents = details.address_components;
                    const streetNumber =
                      addressComponents.find((c) =>
                        c.types.includes("street_number")
                      )?.long_name || "";
                    const route =
                      addressComponents.find((c) => c.types.includes("route"))
                        ?.long_name || "";
                    const city =
                      addressComponents.find((c) =>
                        c.types.includes("locality")
                      )?.long_name ||
                      addressComponents.find((c) =>
                        c.types.includes("administrative_area_level_2")
                      )?.long_name ||
                      "";
                    const state =
                      addressComponents.find((c) =>
                        c.types.includes("administrative_area_level_1")
                      )?.long_name || "";
                    const postalCode =
                      addressComponents
                        .find((c) => c.types.includes("postal_code"))
                        ?.long_name.replace(/\D/g, "") || "";

                    setValue("street", `${route} ${streetNumber}`.trim());
                    setValue("city", city);
                    setValue("state", state);
                    setValue("postalCode", postalCode);

                    if (details.geometry?.location) {
                      const { lat, lng } = details.geometry.location;
                      setValue("latitude", lat);
                      setValue("longitude", lng);
                    } else {
                      setValue("latitude", undefined);
                      setValue("longitude", undefined);
                    }
                  }
                }}
                query={{
                  key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
                  language: "es",
                  components: "country:ar",
                }}
                enablePoweredByContainer={false}
                styles={{
                  container: {
                    flex: 0,
                    marginBottom: 20,
                  },
                  textInputContainer: {
                    flexDirection: "row",
                    alignItems: "center",
                  },
                  textInput: {
                    height: 56,
                    backgroundColor: theme.colors.background,
                    color: theme.colors.primary,
                    fontSize: 16,
                    borderWidth: 1,
                    borderColor: theme.colors.outline,
                    borderRadius: 4,
                    flex: 1,
                  },
                  listView: {
                    backgroundColor: theme.colors.background,
                    borderWidth: 1,
                    borderColor: theme.colors.outline,
                    borderRadius: 4,
                    marginTop: 5,
                  },
                }}
                renderRightButton={() => (
                  <IconButton
                    icon="close"
                    size={20}
                    onPress={() => {
                      setValue("street", "");
                      setValue("city", "");
                      setValue("state", "");
                      setValue("postalCode", "");
                      // @ts-ignore
                      autocompleteRef.current?.clear();
                      // @ts-ignore
                      autocompleteRef.current?.setAddressText("");
                    }}
                    style={{ marginLeft: -40, zIndex: 1 }}
                  />
                )}
              />
            </View>

            {/* Form Fields */}
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{ gap: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              <Controller
                control={control}
                name="flat"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Piso / Departamento"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.flat}
                    style={{
                      color: theme.colors.primary,
                      backgroundColor: theme.colors.background,
                    }}
                  />
                )}
              />

              <Controller
                control={control}
                name="street"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Calle y número"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.street}
                    style={{
                      color: theme.colors.primary,
                      backgroundColor: theme.colors.background,
                    }}
                    editable={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="city"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Localidad"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.city}
                    style={{
                      color: theme.colors.primary,
                      backgroundColor: theme.colors.background,
                    }}
                    editable={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="state"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Provincia"
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.state}
                    style={{
                      color: theme.colors.primary,
                      backgroundColor: theme.colors.background,
                    }}
                    editable={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="postalCode"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label="Código postal"
                    onChangeText={(text) =>
                      onChange(text.replace(/\D/g, "").slice(0, 4))
                    }
                    onBlur={onBlur}
                    value={value}
                    error={!!errors.postalCode}
                    style={{
                      color: theme.colors.primary,
                      backgroundColor: theme.colors.background,
                    }}
                    editable={false}
                    keyboardType="numeric"
                    maxLength={4}
                  />
                )}
              />

              {Object.keys(errors).map((key) => (
                <Text key={key} style={{ color: "red" }}>
                  {errors[key as keyof FormValues]?.message}
                </Text>
              ))}
            </ScrollView>
          </View>

          {/* Buttons */}
          <View style={{ padding: 16, gap: 15 }}>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={isLoadingCreate || isLoadingEdit}
              disabled={isLoadingCreate || isLoadingEdit}
            >
              {currentAddress ? "Editar dirección" : "Crear nueva dirección"}
            </Button>
            <Button
              mode="contained-tonal"
              onPress={() => handleCancel()}
              buttonColor={theme.colors.errorContainer}
              textColor={theme.colors.onErrorContainer}
            >
              Cancelar
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
