import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Orbitron_400Regular,
  Orbitron_500Medium,
  Orbitron_700Bold,
} from "@expo-google-fonts/orbitron";
import {
  Exo2_400Regular,
  Exo2_500Medium,
  Exo2_600SemiBold,
  Exo2_700Bold,
  useFonts as useExoFonts,
} from "@expo-google-fonts/exo-2";
import * as SplashScreen from "expo-splash-screen";
import { Colors } from "@/constants/theme";

SplashScreen.preventAutoHideAsync();

function IconeAba({ label, ativo }: { label: string; ativo: boolean }) {
  return (
    <Text style={{ fontSize: 18, opacity: ativo ? 1 : 0.4 }}>{label}</Text>
  );
}

export default function LayoutRaiz() {
  const [orbitronCarregado] = useFonts({
    Orbitron_400Regular,
    Orbitron_500Medium,
    Orbitron_700Bold,
  });

  const [exoCarregado] = useExoFonts({
    Exo2_400Regular,
    Exo2_500Medium,
    Exo2_600SemiBold,
    Exo2_700Bold,
  });

  useEffect(() => {
    if (orbitronCarregado && exoCarregado) {
      SplashScreen.hideAsync();
    }
  }, [orbitronCarregado, exoCarregado]);

  if (!orbitronCarregado || !exoCarregado) {
    return null;
  }

  return (
    <View style={estilos.raiz}>
      <StatusBar style="light" backgroundColor={Colors.bg} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: estilos.barraTabs,
          tabBarActiveTintColor: Colors.tabActive,
          tabBarInactiveTintColor: Colors.tabInactive,
          tabBarLabelStyle: estilos.rotuloTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "CLIMA",
            tabBarIcon: ({ focused }) => (
              <IconeAba label="🌡️" ativo={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="alerts"
          options={{
            title: "ALERTAS",
            tabBarIcon: ({ focused }) => (
              <IconeAba label="⚠️" ativo={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="about"
          options={{
            title: "SOBRE",
            tabBarIcon: ({ focused }) => (
              <IconeAba label="📖" ativo={focused} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const estilos = StyleSheet.create({
  raiz: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  barraTabs: {
    backgroundColor: "#0f0602",
    borderTopColor: "#2a1608",
    borderTopWidth: 1,
    height: 85,
    paddingBottom: 20,
    paddingTop: 6,
  },
  rotuloTab: {
    fontFamily: "Orbitron_400Regular",
    fontSize: 8,
    letterSpacing: 1.5,
  },
});
