// tela com glossário de metereologia

import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { estilos } from '@/styles/sobre.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider, SectionHeader } from '@/components/UI';

// dados

const GLOSSARIO = [
  {
    termo: 'Temperatura',
    icone: '🌡',
    definicao: 'Medida do calor do ar em graus Celsius (°C). A temperatura do ar é medida a 2 metros acima da superfície, em abrigo ventilado e protegido da radiação solar direta.',
    exemplo: 'Valores típicos: −20°C (inverno frio) a +45°C (verão extremo).',
  },
  {
    termo: 'Sensação Térmica',
    icone: '🧍',
    definicao: 'Temperatura que o corpo humano percebe, levando em conta vento e umidade. Com vento forte ou umidade alta, a sensação pode ser bem diferente da temperatura real.',
    exemplo: 'Temperatura 30°C com 90% de umidade → sensação de até 40°C.',
  },
  {
    termo: 'Pressão Atmosférica',
    icone: '⬇',
    definicao: 'Peso da coluna de ar acima de um ponto, medido em hPa (hectopascals). Pressão baixa geralmente indica mau tempo; pressão alta, tempo estável e ensolarado.',
    exemplo: 'Valor médio ao nível do mar: 1013 hPa. Abaixo de 1000 hPa: instabilidade.',
  },
  {
    termo: 'Umidade Relativa',
    icone: '💧',
    definicao: 'Percentual de vapor d\'água no ar em relação ao máximo que ele pode conter. Quanto mais próximo de 100%, mais saturado o ar está.',
    exemplo: 'Abaixo de 30%: ar muito seco (risco à saúde). Acima de 80%: ar muito úmido.',
  },
  {
    termo: 'Índice UV',
    icone: '☀️',
    definicao: 'Medida da intensidade da radiação ultravioleta do Sol. Determina o risco de queimaduras e danos à pele sem proteção solar adequada.',
    exemplo: '0–2: Baixo · 3–5: Moderado · 6–7: Alto · 8–10: Muito Alto · 11+: Extremo.',
  },
  {
    termo: 'Vento',
    icone: '💨',
    definicao: 'Movimento do ar de uma região de alta pressão para uma de baixa pressão. A velocidade é medida em km/h e a direção indica de onde o vento sopra.',
    exemplo: 'Brisa: até 20 km/h. Vento forte: 50–60 km/h. Tempestade: acima de 90 km/h.',
  },
  {
    termo: 'Precipitação',
    icone: '🌧',
    definicao: 'Qualquer forma de água que cai da atmosfera: chuva, garoa, neve ou granizo. Medida em milímetros (mm), onde 1 mm = 1 litro por metro quadrado.',
    exemplo: 'Chuva fraca: < 2,5 mm/h. Chuva forte: > 7,5 mm/h. Chuva muito forte: > 50 mm/h.',
  },
  {
    termo: 'Visibilidade',
    icone: '👁',
    definicao: 'Distância máxima a que um objeto pode ser visto e identificado. Reduzida por neblina, fumaça, chuva intensa ou tempestade de areia.',
    exemplo: 'Névoa: < 1 km. Neblina densa: < 200 m. Céu limpo: > 10 km.',
  },
  {
    termo: 'Cobertura de Nuvens',
    icone: '☁️',
    definicao: 'Percentual do céu coberto por nuvens. Influencia diretamente a temperatura: nuvens bloqueiam a radiação solar durante o dia e retêm calor à noite.',
    exemplo: '0–25%: céu limpo · 25–50%: poucas nuvens · 75–100%: nublado.',
  },
  {
    termo: 'Probabilidade de Chuva',
    icone: '🌂',
    definicao: 'Porcentagem de chance de ocorrência de precipitação em determinado período. Calculada por modelos meteorológicos com base em dados atmosféricos.',
    exemplo: 'Abaixo de 20%: improvável. Acima de 70%: chuva muito provável.',
  },
  {
    termo: 'Código WMO',
    icone: '📡',
    definicao: 'Código numérico padronizado pela Organização Meteorológica Mundial (WMO) para descrever condições do tempo. Usado internacionalmente por serviços meteorológicos.',
    exemplo: 'Código 0: céu limpo · Código 63: chuva moderada · Código 95: tempestade.',
  },
];

export default function TelaSobre() {
  const [termoExpandido, setTermoExpandido] = useState<string | null>(null);

  return (
    <SafeAreaView style={estilos.segura} edges={['top']}>
      <ScrollView
        style={estilos.scroll}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        <View style={estilos.cabecalho}>
          <Text style={estilos.titulo}>METEOROLOGIA</Text>
          <Text style={estilos.subtitulo}>
            Guia dos principais termos e grandezas meteorológicas utilizados neste aplicativo.
            Toque em qualquer item para expandir.
          </Text>
        </View>

        <Divider />

        <SectionHeader title="Glossário" subtitle={`${GLOSSARIO.length} termos`} />
        {GLOSSARIO.map((item) => (
          <TouchableOpacity
            key={item.termo}
            style={estilos.itemGlossario}
            onPress={() => setTermoExpandido(termoExpandido === item.termo ? null : item.termo)}
            activeOpacity={0.7}
          >
            <View style={estilos.linhaGlossario}>
              <Text style={estilos.termoGlossario}>{item.icone}  {item.termo}</Text>
              <Text style={estilos.chevronGlossario}>
                {termoExpandido === item.termo ? '▲' : '▼'}
              </Text>
            </View>
            {termoExpandido === item.termo && (
              <>
                <Text style={estilos.definicaoGlossario}>{item.definicao}</Text>
                {item.exemplo && (
                  <Text style={estilos.exemploGlossario}>{item.exemplo}</Text>
                )}
              </>
            )}
          </TouchableOpacity>
        ))}

        <Divider />

        <SectionHeader title="Fonte dos Dados" />
        <View style={estilos.cardFonte}>
          <Text style={estilos.textoFonte}>
            Os dados meteorológicos são fornecidos pela{' '}
            <Text style={{ color: '#f5aa45' }}>Open-Meteo</Text>
            {' '}(open-meteo.com) — API gratuita e de código aberto, sem necessidade de chave.
            Os modelos utilizados incluem dados do ECMWF, GFS, DWD e outros centros
            meteorológicos globais, com atualização a cada hora.
          </Text>
        </View>

        <Text style={estilos.rodape}>
          Clima · Open-Meteo · Dados globais atualizados a cada hora
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
