import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ImageBackground,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  buscarCidades,
  fetchClimaAtual,
  fetchPrevisao,
  Cidade,
  ClimaAtual,
  PrevisaoDia,
  direcaoVentoTexto,
  emojiClima,
  nivelUV,
  formatarData,
} from '@/services/openmeteo';
import { StatCard, SectionHeader, Divider } from '@/components/UI';
import { estilos } from '@/styles/clima.styles';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

import BG_IMAGE from '@/assets/sky_bg.jpg';

export default function TelaClima() {
  const [query, setQuery] = useState('');
  const [sugestoes, setSugestoes] = useState<Cidade[]>([]);
  const [buscando, setBuscando] = useState(false);
  const [clima, setClima] = useState<ClimaAtual | null>(null);
  const [previsao, setPrevisao] = useState<PrevisaoDia[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [cidadeAtual, setCidadeAtual] = useState<Cidade | null>(null);

  const aoDigitar = useCallback(async (texto: string) => {
    setQuery(texto);
    if (texto.trim().length < 2) { setSugestoes([]); return; }
    setBuscando(true);
    try {
      const resultados = await buscarCidades(texto);
      setSugestoes(resultados);
    } catch {
      setSugestoes([]);
    } finally {
      setBuscando(false);
    }
  }, []);

  const selecionarCidade = useCallback(async (cidade: Cidade) => {
    Keyboard.dismiss();
    setSugestoes([]);
    setQuery(`${cidade.nome}, ${cidade.pais}`);
    setCidadeAtual(cidade);
    setCarregando(true);
    setErro(null);
    try {
      const [dadosClima, dadosPrevisao] = await Promise.all([
        fetchClimaAtual(cidade),
        fetchPrevisao(cidade),
      ]);
      setClima(dadosClima);
      setPrevisao(dadosPrevisao);
    } catch (e: any) {
      setErro(e.message ?? 'Erro ao carregar clima');
    } finally {
      setCarregando(false);
    }
  }, []);

  const aoAtualizar = useCallback(async () => {
    if (!cidadeAtual) return;
    setAtualizando(true);
    try {
      const [dadosClima, dadosPrevisao] = await Promise.all([
        fetchClimaAtual(cidadeAtual),
        fetchPrevisao(cidadeAtual),
      ]);
      setClima(dadosClima);
      setPrevisao(dadosPrevisao);
    } catch {}
    finally { setAtualizando(false); }
  }, [cidadeAtual]);

  return (
    <SafeAreaView style={estilos.segura} edges={['top']}>
      <ScrollView
        style={estilos.scroll}
        contentContainerStyle={[
          estilos.conteudo,
          !clima && { flex: 1 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          cidadeAtual ? (
            <RefreshControl
              refreshing={atualizando}
              onRefresh={aoAtualizar}
              tintColor={Colors.amber}
              colors={[Colors.amber]}
            />
          ) : undefined
        }
      >
        <View style={estilos.containerBusca}>
          <View style={estilos.linhaBusca}>
            <TextInput
              style={estilos.inputBusca}
              placeholder="Buscar cidade..."
              placeholderTextColor={Colors.textMuted}
              value={query}
              onChangeText={aoDigitar}
              returnKeyType="search"
              selectionColor={Colors.amber}
            />
            {buscando && <ActivityIndicator color={Colors.amber} />}
          </View>

          {sugestoes.length > 0 && (
            <View style={estilos.listaSugestoes}>
              {sugestoes.map((c) => (
                <TouchableOpacity
                  key={c.id}
                  style={estilos.itemSugestao}
                  onPress={() => selecionarCidade(c)}
                >
                  <Text style={estilos.nomeSugestao}>{c.nome}</Text>
                  <Text style={estilos.subSugestao}>{c.estado ? `${c.estado}, ` : ''}{c.pais}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {!clima && !carregando && (
          <View style={estilos.estadoInicial}>
            <Text style={estilos.emojiInicial}>🌍</Text>
            <Text style={estilos.tituloInicial}>PREVISÃO DO TEMPO</Text>
            <Text style={estilos.subInicial}>
              Digite o nome de uma cidade acima para ver as condições meteorológicas atuais.
            </Text>
          </View>
        )}

        {carregando && (
          <View style={estilos.estadoInicial}>
            <ActivityIndicator size="large" color={Colors.amber} />
            <Text style={[estilos.subInicial, { marginTop: Spacing.md }]}>
              Obtendo dados meteorológicos...
            </Text>
          </View>
        )}

        {erro && !carregando && (
          <View style={estilos.estadoInicial}>
            <Text style={{ fontSize: 40 }}>⚠️</Text>
            <Text style={[estilos.tituloInicial, { color: Colors.danger }]}>Erro</Text>
            <Text style={estilos.subInicial}>{erro}</Text>
          </View>
        )}

        {clima && !carregando && (
          <>
            <View style={estilos.cardHero}>
              <ImageBackground
                source={BG_IMAGE}
                style={estilos.bgHero}
                imageStyle={estilos.bgHeroImagem}
                resizeMode="cover"
              >
                <View style={estilos.overlayHero}>
                  <Text style={estilos.cidadeTexto}>{clima.cidade}</Text>
                  <Text style={estilos.paisTexto}>{clima.pais}</Text>

                  <View style={estilos.linhaHeroTopo}>
                    <Text style={estilos.emojiClimaGrande}>
                      {emojiClima(clima.codigoClima, clima.ehDia)}
                    </Text>
                    <View style={estilos.blocoTempHero}>
                      <Text style={estilos.tempHero}>{clima.temperatura}°</Text>
                      <Text style={estilos.descClimaHero}>{clima.descricaoClima}</Text>
                      <Text style={estilos.sensacaoHero}>Sensação {clima.sensacaoTermica}°C</Text>
                    </View>
                  </View>

                  <View style={estilos.linhaMinMax}>
                    <View style={estilos.blocoMinMax}>
                      <Text style={estilos.rotuloMinMax}>MÍN</Text>
                      <Text style={[estilos.valorMinMax, { color: Colors.dustLight }]}>{clima.tempMin}°</Text>
                    </View>
                    <View style={estilos.blocoMinMax}>
                      <Text style={estilos.rotuloMinMax}>MÁX</Text>
                      <Text style={[estilos.valorMinMax, { color: Colors.amberLight }]}>{clima.tempMax}°</Text>
                    </View>
                  </View>

                  <Text style={estilos.atualizadoEm}>
                    Atualizado às {new Date(clima.horaAtualizacao).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  </Text>
                </View>
              </ImageBackground>
            </View>

            <Divider />

            <SectionHeader
              title="Condições Atuais"
              subtitle={`${clima.cidade} · ${clima.latitude.toFixed(2)}°, ${clima.longitude.toFixed(2)}°`}
            />
            <View style={estilos.grade}>
              <View style={estilos.linhaGrade}>
                <StatCard label="Umidade"  value={`${clima.umidade}`}          unit="%"    icon="💧" style={estilos.celulaGrade} />
                <StatCard label="Pressão"  value={`${clima.pressao}`}           unit="hPa"  icon="⬇" style={estilos.celulaGrade} accent />
              </View>
              <View style={estilos.linhaGrade}>
                <StatCard label="Vento"    value={`${clima.velocidadeVento}`}   unit="km/h" icon="💨" style={estilos.celulaGrade} />
                <StatCard label="Direção"  value={direcaoVentoTexto(clima.direcaoVento)}   icon="🧭" style={estilos.celulaGrade} />
              </View>
              <View style={estilos.linhaGrade}>
                <StatCard label="Índice UV"      value={nivelUV(clima.uv)}             icon="☀️" style={estilos.celulaGrade} />
                <StatCard label="Cobertura"      value={`${clima.nuvens}`}    unit="%"  icon="☁️" style={estilos.celulaGrade} />
              </View>
              <View style={estilos.linhaGrade}>
                <StatCard label="Precipitação"   value={`${clima.precipitacao}`} unit="mm" icon="🌧" style={estilos.celulaGrade} />
                <StatCard label="Visibilidade"   value={`${(clima.visibilidade / 1000).toFixed(1)}`} unit="km" icon="👁" style={estilos.celulaGrade} />
              </View>
            </View>

            <Divider />

            {previsao.length > 0 && (
              <View style={estilos.containerPrevisao}>
                <SectionHeader title="Previsão 7 Dias" />
                <View style={estilos.cardPrevisao}>
                  {previsao.map((dia, i) => (
                    <View
                      key={dia.data}
                      style={[estilos.itemPrevisao, i === previsao.length - 1 && estilos.itemPrevisaoUltimo]}
                    >
                      <Text style={estilos.dataPrevisao}>{formatarData(dia.data)}</Text>
                      <Text style={estilos.emojiPrevisao}>{emojiClima(dia.codigoClima, true)}</Text>
                      <Text style={estilos.chuvaPrevisao}>{dia.chuvaProbabilidade}%</Text>
                      <View style={estilos.tempsPrevisao}>
                        <Text style={estilos.tempMinPrevisao}>{dia.tempMin}°</Text>
                        <Text style={estilos.tempMaxPrevisao}>{dia.tempMax}°</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <Text style={estilos.rodape}>
              Open-Meteo · open-meteo.com · Puxe para atualizar
            </Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

