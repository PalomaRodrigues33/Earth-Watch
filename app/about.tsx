// Tela Marte — curiosidades, missões, glossário e fonte dos dados

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { estilos } from '@/styles/marte.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, SectionHeader } from '@/components/UI';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

// ── Dados ─────────────────────────────────────────────────────────────────────

const CURIOSIDADES = [
  { emoji: '🏔', label: 'Olympus Mons',       valor: '21,9 km de altura — maior vulcão do sistema solar' },
  { emoji: '🕳', label: 'Valles Marineris',   valor: 'Sistema de cânions com 4.000 km de extensão' },
  { emoji: '❄',  label: 'Calotas Polares',    valor: 'Compostas de gelo d\'água e gelo seco (CO₂)' },
  { emoji: '🌡', label: 'Temperatura',        valor: '−125°C (polos) a +20°C (equador ao meio-dia)' },
  { emoji: '📅', label: 'Ano Marciano',       valor: '687 dias terrestres de duração' },
  { emoji: '🌙', label: 'Luas',               valor: 'Fobos e Deimos — ambos são asteroides capturados' },
  { emoji: '🌬', label: 'Atmosfera',          valor: '95% CO₂, 2,6% N₂, 1,9% Argônio, traços de O₂' },
  { emoji: '☀',  label: 'Distância do Sol',   valor: '228 milhões de km (1,52 UA)' },
  { emoji: '🚀', label: 'Atraso de Sinal',    valor: '3–22 minutos de ida, dependendo da posição orbital' },
];

const ROVERS = [
  {
    nome: 'Curiosity',
    status: 'ATIVO',
    corStatus: Colors.success,
    pouso: '6 de agosto de 2012',
    local: 'Cratera Gale',
    missao: 'Astrobiologia — estuda habitabilidade, clima e geologia. Ainda em operação após 13+ anos.',
    solsEmMarte: '4600+'
},
  {
    nome: 'Perseverance',
    status: 'ATIVO',
    corStatus: Colors.success,
    pouso: '18 de fevereiro de 2021',
    local: 'Cratera Jezero',
    missao: 'Busca sinais de vida microbiana antiga. Coleta amostras para futura missão de retorno à Terra.',
    solsEmMarte: '1800+'
},
  {
    nome: 'InSight',
    status: 'ENCERRADO',
    corStatus: Colors.textMuted,
    pouso: '26 de novembro de 2018',
    local: 'Planície de Elísio',
    missao: 'Exploração do interior marciano — sismologia, fluxo de calor e rotação. Perdeu energia em dezembro de 2022.',
    solsEmMarte: '1445'
},
  {
    nome: 'Opportunity',
    status: 'ENCERRADO',
    corStatus: Colors.textMuted,
    pouso: '25 de janeiro de 2004',
    local: 'Meridiani Planum',
    missao: 'Geologia de superfície. Operou por 15 anos — muito além dos 90 dias previstos no projeto.',
    solsEmMarte: '5111'
},
];

const GLOSSARIO = [
  {
    termo: 'Sol',
    definicao: 'Um dia solar marciano. Um Sol dura 24 horas, 39 minutos e 35 segundos — cerca de 2,7% mais longo que um dia terrestre.'
},
  {
    termo: 'REMS',
    definicao: 'Estação de Monitoramento Ambiental do Rover. O conjunto de instrumentos do Curiosity que mede temperatura, pressão, radiação UV, velocidade do vento e umidade.'
},
  {
    termo: 'Ls — Longitude Solar',
    definicao: 'O ângulo entre o Sol e Marte ao longo da órbita marciana. Ls 0° = equinócio da Primavera do Norte. Usado para identificar a estação do ano em Marte.'
},
  {
    termo: 'Opacidade Atmosférica',
    definicao: 'Quantidade de poeira suspensa na atmosfera marciana. "Sunny" indica céu limpo; maior opacidade significa mais poeira, que dispersa a luz solar e cria o famoso céu rosado.'
},
  {
    termo: 'Planície de Elísio',
    definicao: 'Grande planície vulcânica próxima ao equador de Marte. Foi o local de pouso da sonda InSight da NASA, que monitorou maremotos e clima até dezembro de 2022.'
},
  {
    termo: 'Cratera Gale',
    definicao: 'Cratera de impacto com 154 km de largura onde o Curiosity pousou em 6 de agosto de 2012. Em seu centro fica o Monte Sharp (Aeolis Mons), que o Curiosity vem escalando desde então.'
},
  {
    termo: 'Pascals (Pa)',
    definicao: 'Unidade de pressão atmosférica. A atmosfera de Marte tem apenas ~0,6% da espessura da terrestre; a pressão típica na superfície é de 600–700 Pa, contra 101.325 Pa na Terra.'
},
];

// ── Tela ──────────────────────────────────────────────────────────────────────

export default function TelaMarte() {
  const [termoExpandido, setTermoExpandido] = useState<string | null>(null);

  return (
    <SafeAreaView style={estilos.segura} edges={['top']}>
      <ScrollView
        style={estilos.scroll}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={estilos.cabecalho}>
          <View style={estilos.containerOrb}>
            <View style={estilos.orbMarte} />
            <View style={estilos.brilhoOrb} />
          </View>
          <View style={estilos.textoCabecalho}>
            <Text style={estilos.titulo}>MARTE</Text>
            <Text style={estilos.subtitulo}>O Planeta Vermelho</Text>
            <Text style={estilos.descricao}>
              O quarto planeta a partir do Sol. Um mundo desértico, frio e empoeirado,
              com atmosfera fina — e o planeta mais explorado além da Terra.
            </Text>
          </View>
        </View>

        <Divider />

        {/* Curiosidades */}
        <SectionHeader title="Curiosidades" />
        <View style={estilos.gradeCuriosidades}>
          {CURIOSIDADES.map((item) => (
            <View key={item.label} style={estilos.cartaoCuriosidade}>
              <Text style={estilos.emojiCuriosidade}>{item.emoji}</Text>
              <Text style={estilos.labelCuriosidade}>{item.label}</Text>
              <Text style={estilos.valorCuriosidade}>{item.valor}</Text>
            </View>
          ))}
        </View>

        <Divider />

        {/* Missões */}
        <SectionHeader
          title="Missões na Superfície"
          subtitle="Rovers e sondas passados e presentes"
        />
        {ROVERS.map((rover) => (
          <View key={rover.nome} style={estilos.cartaoRover}>
            <View style={estilos.cabecalhoRover}>
              <Text style={estilos.nomeRover}>{rover.nome}</Text>
              <View style={[estilos.chipStatus, { borderColor: rover.corStatus }]}>
                <Text style={[estilos.textoStatus, { color: rover.corStatus }]}>
                  {rover.status}
                </Text>
              </View>
            </View>
            <View style={estilos.metaRover}>
              <Text style={estilos.itemMetaRover}>📅 Pousou em {rover.pouso}</Text>
              <Text style={estilos.itemMetaRover}>📍 {rover.local}</Text>
              <Text style={estilos.itemMetaRover}>🔢 {rover.solsEmMarte} sols em Marte</Text>
            </View>
            <Text style={estilos.missaoRover}>{rover.missao}</Text>
          </View>
        ))}

        <Divider />

        {/* Glossário */}
        <SectionHeader title="Glossário" subtitle="Toque para expandir" />
        {GLOSSARIO.map((item) => (
          <TouchableOpacity
            key={item.termo}
            style={estilos.itemGlossario}
            onPress={() => setTermoExpandido(termoExpandido === item.termo ? null : item.termo)}
            activeOpacity={0.7}
          >
            <View style={estilos.linhaGlossario}>
              <Text style={estilos.termoGlossario}>{item.termo}</Text>
              <Text style={estilos.chevronGlossario}>
                {termoExpandido === item.termo ? '▲' : '▼'}
              </Text>
            </View>
            {termoExpandido === item.termo && (
              <Text style={estilos.definicaoGlossario}>{item.definicao}</Text>
            )}
          </TouchableOpacity>
        ))}

        <Divider />

        {/* Sobre o app */}
        <SectionHeader title="Sobre este App" />
        <View style={estilos.cartaoFonte}>
          <Text style={estilos.textoFonte}>
            Os dados meteorológicos são fornecidos diretamente pela{' '}
            <Text style={estilos.linkFonte}>API Oficial da NASA</Text>
            {' '}(mars.nasa.gov), que agrega leituras do instrumento REMS do rover
            Curiosity na Cratera Gale. Os dados são transmitidos para a Terra e
            atualizados periodicamente.
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://mars.nasa.gov/msl/weather/')}
            style={estilos.botaoLink}
          >
            <Text style={estilos.textoBotaoLink}>VER CLIMA EM MARTE NA NASA →</Text>
          </TouchableOpacity>
        </View>

        <Text style={estilos.rodape}>
          Clima em Marte · Dados da NASA Curiosity REMS
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
