import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
  useTheme,
} from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(0, 110, 34)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(128, 253, 136)",
    onPrimaryContainer: "rgb(0, 33, 5)",
    secondary: "rgb(82, 99, 79)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(213, 232, 207)",
    onSecondaryContainer: "rgb(16, 31, 16)",
    tertiary: "rgb(57, 101, 107)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(188, 235, 241)",
    onTertiaryContainer: "rgb(0, 31, 35)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(252, 253, 247)",
    onBackground: "rgb(26, 28, 25)",
    // surface: "rgb(252, 253, 247)",
    // onSurface: "rgb(26, 28, 25)",
    // surfaceVariant: "rgb(222, 229, 217)",
    // onSurfaceVariant: "rgb(66, 73, 64)",
    // outline: "rgb(114, 121, 111)",
    // outlineVariant: "rgb(194, 201, 189)",
    // shadow: "rgb(0, 0, 0)",
    // scrim: "rgb(0, 0, 0)",
    // inverseSurface: "rgb(47, 49, 45)",
    // inverseOnSurface: "rgb(240, 241, 235)",
    // inversePrimary: "rgb(99, 223, 111)",
    // elevation: {
    //   level0: "transparent",
    //   level1: "rgb(239, 246, 236)",
    //   level2: "rgb(232, 242, 230)",
    //   level3: "rgb(224, 237, 224)",
    //   level4: "rgb(222, 236, 221)",
    //   level5: "rgb(217, 233, 217)",
    // },
    // surfaceDisabled: "rgba(26, 28, 25, 0.12)",
    // onSurfaceDisabled: "rgba(26, 28, 25, 0.38)",
    // backdrop: "rgba(44, 50, 42, 0.4)",
    green: "rgb(2, 110, 35)",
    onGreen: "rgb(255, 255, 255)",
    greenContainer: "rgb(154, 248, 155)",
    onGreenContainer: "rgb(0, 33, 5)",
  },
};

export type AppTheme = typeof theme;
export const useAppTheme = () => useTheme<AppTheme>();