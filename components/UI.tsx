import React from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { estilos } from "@/styles/ui.styles";
import { Colors, Spacing, Radius, Typography } from "@/constants/theme";

export function LoadingScreen({
  message = "Carregando...",
}: {
  message?: string;
}) {
  return (
    <View style={estilos.centralizado}>
      <ActivityIndicator size="large" color={Colors.amber} />
      <Text style={estilos.textoCarregando}>{message}</Text>
    </View>
  );
}

export function ErrorScreen({
  error,
  onRetry,
}: {
  error: string;
  onRetry?: () => void;
}) {
  return (
    <View style={estilos.centralizado}>
      <Text style={estilos.iconeErro}>⚠</Text>
      <Text style={estilos.tituloErro}>Sinal Perdido</Text>
      <Text style={estilos.corpoErro}>{error}</Text>
      {onRetry && (
        <TouchableOpacity style={estilos.botaoTentar} onPress={onRetry}>
          <Text style={estilos.textoTentar}>TENTAR NOVAMENTE</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
interface PropsStatCard {
  label: string;
  value: string;
  unit?: string;
  icon?: string;
  style?: ViewStyle;
  accent?: boolean;
}

export function StatCard({
  label,
  value,
  unit,
  icon,
  style,
  accent,
}: PropsStatCard) {
  return (
    <View
      style={[estilos.cartaoStat, accent && estilos.cartaoStatDestaque, style]}
    >
      {icon && <Text style={estilos.iconestat}>{icon}</Text>}
      <Text style={estilos.rotuloStat}>{label}</Text>
      <View style={estilos.linhaValorStat}>
        <Text style={[estilos.valorStat, accent && estilos.valorStatDestaque]}>
          {value}
        </Text>
        {unit && <Text style={estilos.unidadeStat}>{unit}</Text>}
      </View>
    </View>
  );
}

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={estilos.cabecalhoSecao}>
      <View style={estilos.linhaSecao} />
      <View style={estilos.titulosSecao}>
        <Text style={estilos.tituloSecao}>{title}</Text>
        {subtitle && <Text style={estilos.subtituloSecao}>{subtitle}</Text>}
      </View>
    </View>
  );
}

export function Divider({ style }: { style?: ViewStyle }) {
  return <View style={[estilos.divisor, style]} />;
}

export function Tag({ label, color }: { label: string; color?: string }) {
  return (
    <View style={[estilos.tag, color ? { borderColor: color } : {}]}>
      <Text style={[estilos.textoTag, color ? { color } : {}]}>{label}</Text>
    </View>
  );
}

export function TempBar({ min, max }: { min: number; max: number }) {
  const ESCALA_MIN = -100;
  const ESCALA_MAX = 20;
  const intervalo = ESCALA_MAX - ESCALA_MIN;

  const pctMin = ((min - ESCALA_MIN) / intervalo) * 100;
  const pctMax = ((max - ESCALA_MIN) / intervalo) * 100;
  const larguraBarra = pctMax - pctMin;

  return (
    <View style={estilos.containerBarraTemp}>
      <Text style={estilos.rotuloBarraTemp}>{min}°</Text>
      <View style={estilos.trilhaBarraTemp}>
        <View
          style={[
            estilos.preenchimentoBarra,
            {
              left: `${pctMin}%` as any,
              width: `${larguraBarra}%` as any,
            },
          ]}
        />
      </View>
      <Text style={estilos.rotuloBarraTemp}>{max}°</Text>
    </View>
  );
}
