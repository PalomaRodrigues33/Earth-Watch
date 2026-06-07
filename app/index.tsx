// Tela principal — Clima
// Exibe o sol mais recente do rover Curiosity (NASA MSL API)
// Inclui: hora local em Marte, temperatura, condições atmosféricas


import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  Animated,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { estilos } from '@/styles/clima.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  fetchLatestSol,
  SolWeather,
  getMarsSeasonName,
  formatEarthDate,
  getAtmoDescription,
  getMarsLocalTime
} from '@/services/maas2';
import {
  LoadingScreen,
  ErrorScreen,
  StatCard,
  SectionHeader,
  Divider,
  Tag,
  TempBar
} from '@/components/UI';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

// Imagem de fundo: coloque sua foto em assets/mars_bg.jpg
import BG_IMAGE from '@/assets/mars_bg.jpg';

export default function TelaClima() {
  const router = useRouter();
  const [dados, setDados] = useState<SolWeather | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [horaMarte, setHoraMarte] = useState('--:--:--');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const carregar = useCallback(async () => {
    try {
      setErro(null);
      const sol = await fetchLatestSol();
      setDados(sol);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true
}).start();
    } catch (e: any) {
      setErro(e.message ?? 'Falha ao conectar com a API da NASA');
    } finally {
      setCarregando(false);
      setAtualizando(false);
    }
  }, []);

  // Relógio marciano em tempo real — atualiza a cada segundo
  useEffect(() => {
    const tick = () => setHoraMarte(getMarsLocalTime());
    tick();
    timerRef.current = setInterval(tick, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => { carregar(); }, [carregar]);

  const aoAtualizar = () => {
    setAtualizando(true);
    fadeAnim.setValue(0);
    carregar();
  };

  if (carregando) return <LoadingScreen message="Contactando o rover Curiosity..." />;
  if (erro) return <ErrorScreen error={erro} onRetry={() => { setCarregando(true); carregar(); }} />;
  if (!dados) return null;

  const estacao = getMarsSeasonName(dados.ls);

  return (
    <SafeAreaView style={estilos.segura} edges={['top']}>
      <ScrollView
        style={estilos.scroll}
        contentContainerStyle={estilos.conteudo}
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={aoAtualizar}
            tintColor={Colors.amber}
            colors={[Colors.amber]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <Animated.View style={{ opacity: fadeAnim }}>

          {/* ── Imagem de fundo ── */}
          <ImageBackground
            source={BG_IMAGE}
            style={estilos.bgContainer}
            imageStyle={estilos.bgImagem}
            resizeMode="cover"
          >
            <View style={estilos.bgOverlay}>

              {/* ── Cabeçalho ── */}
              <View style={estilos.cabecalho}>
                <View style={estilos.cabecalhoEsquerda}>
                  <Text style={estilos.rotuloSol}>SOL MARCIANO</Text>
                  <Text style={estilos.numeroSol}>{dados.sol}</Text>
                  <Text style={estilos.dataTerra}>
                    {formatEarthDate(dados.terrestrial_date)} na Terra
                  </Text>
                </View>
                <View style={estilos.cabecalhoDireita}>
                  <View style={estilos.chipAtmo}>
                    <Text style={estilos.textoAtmo}>{dados.atmo_opacity.toUpperCase()}</Text>
                  </View>
                  <Tag label={estacao} />
                </View>
              </View>

              {/* ── Relógio marciano ── */}
              <View style={estilos.cardRelogio}>
                <View style={estilos.relogioEsquerda}>
                  <Text style={estilos.rotuloRelogio}>HORA LOCAL EM MARTE</Text>
                  <Text style={estilos.horaRelogio}>{horaMarte}</Text>
                  <Text style={estilos.subRelogio}>Cratera Gale · 137,4°E · Tempo Solar Local</Text>
                </View>
                <View style={estilos.orbRelogio}>
                  <Text style={estilos.emojiOrb}>🌞</Text>
                </View>
              </View>

            </View>
          </ImageBackground>

          {/* ── Temperatura do Ar ── */}
          <View style={estilos.cardHero}>
            <Text style={estilos.rotuloHero}>TEMPERATURA</Text>
            <View style={estilos.gradeTemp}>
              <View style={estilos.colunaTemp}>
                <Text style={estilos.miniRotuloTemp}>MÍN</Text>
                <Text style={estilos.tempMin}>{dados.min_temp}°C</Text>
                <Text style={estilos.tempF}>{dados.min_temp_fahrenheit}°F</Text>
              </View>
              <View style={estilos.divisorTemp} />
              <View style={estilos.colunaTemp}>
                <Text style={estilos.miniRotuloTemp}>MÁX</Text>
                <Text style={estilos.tempMax}>{dados.max_temp}°C</Text>
                <Text style={estilos.tempF}>{dados.max_temp_fahrenheit}°F</Text>
              </View>
              <View style={estilos.orbHero} />
            </View>
            <TempBar min={dados.min_temp} max={dados.max_temp} />
          </View>

          <Divider />

          {/* ── Condições ── */}
          <SectionHeader
            title="Condições"
            subtitle="Cratera Gale · Planície de Elísio"
          />
          <View style={estilos.grade}>
            <View style={estilos.linhaGrade}>
              <StatCard
                label="Pressão"
                value={String(dados.pressure)}
                unit="Pa"
                icon="⬇"
                style={estilos.celulaGrade}
                accent
              />
              <StatCard
                label="Índice UV"
                value={dados.uv_index}
                icon="☀"
                style={estilos.celulaGrade}
              />
            </View>
            <View style={estilos.linhaGrade}>
              <StatCard
                label="Nascer do Sol"
                value={dados.sunrise}
                icon="🌅"
                style={estilos.celulaGrade}
              />
              <StatCard
                label="Pôr do Sol"
                value={dados.sunset}
                icon="🌄"
                style={estilos.celulaGrade}
              />
            </View>
          </View>

          <Divider />

          {/* ── Atmosfera ── */}
          <SectionHeader title="Atmosfera" subtitle={`Longitude solar Ls ${dados.ls}°`} />
          <View style={estilos.cardAtmo}>
            <View style={estilos.linhaAtmo}>
              <Text style={estilos.chaveAtmo}>Condição do Céu</Text>
              <Text style={estilos.valorAtmo}>{dados.atmo_opacity}</Text>
            </View>
            <Text style={estilos.descAtmo}>{getAtmoDescription(dados.atmo_opacity)}</Text>
            <Divider style={{ marginVertical: Spacing.sm }} />
            <View style={estilos.linhaAtmo}>
              <Text style={estilos.chaveAtmo}>Estação em Marte</Text>
              <Text style={estilos.valorAtmo}>{estacao}</Text>
            </View>
            <View style={estilos.linhaAtmo}>
              <Text style={estilos.chaveAtmo}>Pressão</Text>
              <Text style={estilos.valorAtmo}>{dados.pressure_string}</Text>
            </View>
          </View>

          {/* ── Botão: Ver Sols Anteriores ── */}
          <TouchableOpacity
            style={estilos.botaoSols}
            onPress={() => router.push('/history')}
            activeOpacity={0.75}
          >
            <View style={estilos.botaoSolsConteudo}>
              <Text style={estilos.botaoSolsIcone}>📡</Text>
              <View style={estilos.botaoSolsTextos}>
                <Text style={estilos.botaoSolsTitulo}>HISTÓRICO DE SOLS</Text>
                <Text style={estilos.botaoSolsSub}>Ver os últimos 7 dias marcianos</Text>
              </View>
              <Text style={estilos.botaoSolsSeta}>›</Text>
            </View>
          </TouchableOpacity>

          {/* ── Rodapé ── */}
          <Text style={estilos.rodape}>
            Dados da NASA Curiosity REMS · mars.nasa.gov · Puxe para atualizar
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
