import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { estilos } from '@/styles/historico.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  fetchRecentSols,
  SolWeather,
  formatEarthDate,
  getMarsSeasonName
} from '@/services/maas2';
import { LoadingScreen, ErrorScreen, TempBar, Divider } from '@/components/UI';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

export default function TelaHistorico() {
  const [sols, setSols] = useState<SolWeather[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    try {
      setErro(null);
      const recentes = await fetchRecentSols(7);
      setSols(recentes);
    } catch (e: any) {
      setErro(e.message ?? 'Falha ao carregar histórico de sols');
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  if (carregando) return <LoadingScreen message="Baixando arquivo de sols..." />;
  if (erro) return <ErrorScreen error={erro} onRetry={() => { setCarregando(true); carregar(); }} />;

  return (
    <SafeAreaView style={estilos.segura} edges={['top']}>
      <ScrollView
        style={estilos.scroll}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.cabecalho}>
          <Text style={estilos.titulo}>HISTÓRICO DE SOLS</Text>
          <Text style={estilos.subtitulo}>Últimos 7 dias · REMS Curiosity</Text>
        </View>

        <Divider />

        {sols.map((sol, i) => (
          <View key={sol.sol}>
            <CartaoSol sol={sol} />
            {i < sols.length - 1 && <Divider style={estilos.divisorLinha} />}
          </View>
        ))}

        <Text style={estilos.rodape}>
          NASA MSL Weather API · Curiosity chegou a Marte no Sol 1 · 6 ago 2012
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function CartaoSol({ sol }: { sol: SolWeather }) {
  const estacao = getMarsSeasonName(sol.ls);
  return (
    <View style={estilos.linhaSol}>

      <View style={estilos.esquerdaSol}>
        <View style={estilos.badgeSol}>
          <Text style={estilos.rotuloNumeroSol}>SOL</Text>
          <Text style={estilos.numeroSol}>{sol.sol}</Text>
        </View>
      </View>

      <View style={estilos.meioCentral}>
        <Text style={estilos.dataSol}>{formatEarthDate(sol.terrestrial_date)}</Text>
        <Text style={estilos.estacaoSol}>{estacao}</Text>

        <View style={estilos.linhaRotulosTemp}>
          <Text style={estilos.rotuloTemp}>MÍN</Text>
          <Text style={estilos.rotuloTemp}>MÁX</Text>
        </View>
        <TempBar min={sol.min_temp} max={sol.max_temp} />
        <Text style={estilos.textoTemps}>
          {sol.min_temp}° / {sol.max_temp}°C
        </Text>
      </View>

      <View style={estilos.direitaSol}>
        <View style={estilos.chipSol}>
          <Text style={estilos.textoChipSol}>{sol.atmo_opacity}</Text>
        </View>
        <Text style={estilos.pressaoSol}>{sol.pressure} Pa</Text>
        {sol.uv_index !== 'Unknown' && (
          <Text style={estilos.uvSol}>UV: {sol.uv_index}</Text>
        )}
      </View>
    </View>
  );
}
