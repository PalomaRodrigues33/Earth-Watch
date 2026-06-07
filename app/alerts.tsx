// Tela de Alertas Meteóricos
// Dados simulados seguindo o modelo T_GS_ALERTA do diagrama de banco de dados.
// Campos: ID_ALERTA, DESCRICAO, NIVEL_CRITICO, AREA_IMPACTO_KM, LOCAL_ORIGEM
// Relação: cada alerta possui FK para T_GS_LEITURA_SENSOR (ID_LEITURA, COORDENADA_X, COORDENADA_Y)

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  Animated,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { estilos } from '@/styles/alertas.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Divider } from '@/components/UI';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

// ── Tipos (baseado no modelo T_GS_ALERTA) ────────────────────────────────────

type NivelCritico = 'BAIXO' | 'MODERADO' | 'ALTO' | 'CRÍTICO';

interface Alerta {
  id_alerta: number;
  descricao: string;
  nivel_critico: NivelCritico;
  area_impacto_km: number;
  local_origem: string;
  data_hora: string;
  id_leitura: number; // FK para T_GS_LEITURA_SENSOR
  coordenada_x: number;
  coordenada_y: number;
}

// ── Dados simulados (T_GS_ALERTA) ────────────────────────────────────────────

const ALERTAS: Alerta[] = [
  {
    id_alerta: 1001,
    descricao: 'Impacto de meteorito detectado próximo à Cratera Gale. Fragmentos secundários registrados em raio de 12 km.',
    nivel_critico: 'CRÍTICO',
    area_impacto_km: 47.3,
    local_origem: 'Cinturão de Asteroides',
    data_hora: '2026-06-06T03:14:22Z',
    id_leitura: 4891,
    coordenada_x: -5.4,
    coordenada_y: 137.8
},
  {
    id_alerta: 1002,
    descricao: 'Enxame meteorítico de baixa massa detectado em trajetória de impacto com a Planície de Elísio.',
    nivel_critico: 'ALTO',
    area_impacto_km: 18.9,
    local_origem: 'Cometa C/2024 R1',
    data_hora: '2026-06-05T21:47:05Z',
    id_leitura: 4887,
    coordenada_x: 4.5,
    coordenada_y: 135.0
},
  {
    id_alerta: 1003,
    descricao: 'Meteorito de pequeno porte com área de impacto estimada. Sem risco para equipamentos de superfície.',
    nivel_critico: 'MODERADO',
    area_impacto_km: 5.2,
    local_origem: 'Cinturão de Asteroides',
    data_hora: '2026-06-05T14:30:11Z',
    id_leitura: 4879,
    coordenada_x: -14.6,
    coordenada_y: 175.4
},
  {
    id_alerta: 1004,
    descricao: 'Partícula meteórica de microescala registrada pelos sensores REMS. Poeira adicional suspensa na atmosfera.',
    nivel_critico: 'BAIXO',
    area_impacto_km: 0.3,
    local_origem: 'Fluxo Perseídas Marcianas',
    data_hora: '2026-06-05T09:12:44Z',
    id_leitura: 4872,
    coordenada_x: -1.2,
    coordenada_y: 140.1
},
  {
    id_alerta: 1005,
    descricao: 'Bolide detectado na termosfera marciana. Desintegração completa antes do impacto com a superfície.',
    nivel_critico: 'MODERADO',
    area_impacto_km: 8.7,
    local_origem: 'Desconhecida',
    data_hora: '2026-06-04T18:55:30Z',
    id_leitura: 4860,
    coordenada_x: 22.3,
    coordenada_y: 120.7
},
  {
    id_alerta: 1006,
    descricao: 'Impacto de alta energia registrado em Vastitas Borealis. Possível ejeção de material subsuperficial.',
    nivel_critico: 'ALTO',
    area_impacto_km: 31.4,
    local_origem: 'Cinturão de Asteroides',
    data_hora: '2026-06-04T07:03:17Z',
    id_leitura: 4851,
    coordenada_x: 68.9,
    coordenada_y: 102.3
},
];

// ── Configuração visual por nível ─────────────────────────────────────────────

const CONFIG_NIVEL: Record<NivelCritico, { cor: string; fundo: string; borda: string }> = {
  CRÍTICO:  { cor: '#ff3b30', fundo: '#2a0505', borda: '#ff3b30' },
  ALTO:     { cor: '#ff9500', fundo: '#2a1500', borda: '#ff9500' },
  MODERADO: { cor: '#ffd60a', fundo: '#1a1800', borda: '#ffd60a' },
  BAIXO:    { cor: '#30d158', fundo: '#051a0a', borda: '#30d158' }
};

// ── Funções auxiliares ────────────────────────────────────────────────────────

function formatarDataHora(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
}) + ' UTC';
}

function tempoRelativo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'Agora mesmo';
  if (diff < 3600) return `${Math.floor(diff / 60)}min atrás`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
  return `${Math.floor(diff / 86400)}d atrás`;
}

// ── Componente: ponto pulsante ────────────────────────────────────────────────

function PontoPulsante({ cor }: { cor: string }) {
  const anim = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim, { toValue: 0.15, duration: 900, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 1, duration: 900, useNativeDriver: true }),
      ])
    ).start();
  }, []);
  return <Animated.View style={[estilos.pontoPulsante, { backgroundColor: cor, opacity: anim }]} />;
}

// ── Componente: cartão de alerta ──────────────────────────────────────────────

function CartaoAlerta({ alerta, aoTocar }: { alerta: Alerta; aoTocar: () => void }) {
  const cfg = CONFIG_NIVEL[alerta.nivel_critico];
  return (
    <TouchableOpacity
      style={[estilos.cartaoAlerta, { borderColor: cfg.borda, backgroundColor: cfg.fundo }]}
      onPress={aoTocar}
      activeOpacity={0.75}
    >
      <View style={estilos.cabecalhoCartao}>
        <View style={estilos.esquerdaCartao}>
          <PontoPulsante cor={cfg.cor} />
          <View style={[estilos.badgeNivel, { borderColor: cfg.cor }]}>
            <Text style={[estilos.textoNivel, { color: cfg.cor }]}>
              {alerta.nivel_critico}
            </Text>
          </View>
        </View>
        <Text style={estilos.tempoAlerta}>{tempoRelativo(alerta.data_hora)}</Text>
      </View>

      <Text style={estilos.descricaoAlerta} numberOfLines={2}>
        {alerta.descricao}
      </Text>

      <View style={estilos.metaAlerta}>
        <View style={estilos.itemMeta}>
          <Text style={estilos.rotuloMeta}>ÁREA</Text>
          <Text style={estilos.valorMeta}>{alerta.area_impacto_km} km²</Text>
        </View>
        <View style={estilos.itemMeta}>
          <Text style={estilos.rotuloMeta}>ORIGEM</Text>
          <Text style={estilos.valorMeta} numberOfLines={1}>{alerta.local_origem}</Text>
        </View>
        <View style={estilos.itemMeta}>
          <Text style={estilos.rotuloMeta}>LEITURA</Text>
          <Text style={estilos.valorMeta}>#{alerta.id_leitura}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ── Componente: modal de detalhes ─────────────────────────────────────────────

function ModalAlerta({ alerta, aoFechar }: { alerta: Alerta; aoFechar: () => void }) {
  const cfg = CONFIG_NIVEL[alerta.nivel_critico];
  return (
    <Modal transparent animationType="slide" onRequestClose={aoFechar}>
      <Pressable style={estilos.fundoModal} onPress={aoFechar}>
        <Pressable style={estilos.painelModal} onPress={e => e.stopPropagation()}>
          <View style={estilos.alceModal} />

          <View style={estilos.cabecalhoModal}>
            <View style={[estilos.badgeNivelGrande, { borderColor: cfg.cor, backgroundColor: cfg.fundo }]}>
              <PontoPulsante cor={cfg.cor} />
              <Text style={[estilos.textoNivelGrande, { color: cfg.cor }]}>
                {alerta.nivel_critico}
              </Text>
            </View>
          </View>

          <Text style={estilos.descricaoModal}>{alerta.descricao}</Text>
          <Divider />

          <View style={estilos.gradeModal}>
            <LinhaModal rotulo="ID do Alerta"    valor={`#${alerta.id_alerta}`} />
            <LinhaModal rotulo="Data/Hora"       valor={formatarDataHora(alerta.data_hora)} />
            <LinhaModal rotulo="Área de Impacto" valor={`${alerta.area_impacto_km} km²`} />
            <LinhaModal rotulo="Local de Origem" valor={alerta.local_origem} />
            <LinhaModal rotulo="Coordenada X"    valor={`${alerta.coordenada_x}°`} />
            <LinhaModal rotulo="Coordenada Y"    valor={`${alerta.coordenada_y}°`} />
            <LinhaModal rotulo="ID Leitura (FK)" valor={`#${alerta.id_leitura}`} />
          </View>

          <TouchableOpacity style={estilos.botaoFechar} onPress={aoFechar}>
            <Text style={estilos.textoFechar}>FECHAR</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function LinhaModal({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <View style={estilos.linhaModal}>
      <Text style={estilos.rotuloModal}>{rotulo}</Text>
      <Text style={estilos.valorModal}>{valor}</Text>
    </View>
  );
}

// ── Tela principal ────────────────────────────────────────────────────────────

type Filtro = 'TODOS' | NivelCritico;

export default function TelaAlertas() {
  const [filtro, setFiltro] = useState<Filtro>('TODOS');
  const [alertaSelecionado, setAlertaSelecionado] = useState<Alerta | null>(null);

  const criticos = ALERTAS.filter(a => a.nivel_critico === 'CRÍTICO');

  const alertasFiltrados = ALERTAS.filter(a =>
    filtro === 'TODOS' ? true : a.nivel_critico === filtro
  );

  const FILTROS: { chave: Filtro; rotulo: string }[] = [
    { chave: 'TODOS',    rotulo: 'Todos' },
    { chave: 'CRÍTICO',  rotulo: 'Crítico' },
    { chave: 'ALTO',     rotulo: 'Alto' },
    { chave: 'MODERADO', rotulo: 'Moderado' },
    { chave: 'BAIXO',    rotulo: 'Baixo' },
  ];

  return (
    <SafeAreaView style={estilos.segura} edges={['top']}>
      <ScrollView
        style={estilos.scroll}
        contentContainerStyle={estilos.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho */}
        <View style={estilos.cabecalho}>
          <View>
            <Text style={estilos.titulo}>ALERTAS</Text>
            <Text style={estilos.subtitulo}>Impactos Meteóricos em Marte</Text>
          </View>
          {criticos.length > 0 && (
            <View style={estilos.bannerCritico}>
              <PontoPulsante cor="#ff3b30" />
              <Text style={estilos.textoBannerCritico}>
                {criticos.length} CRÍTICO{criticos.length > 1 ? 'S' : ''}
              </Text>
            </View>
          )}
        </View>

        {/* Estatísticas */}
        <View style={estilos.linhaStats}>
          {[
            { valor: ALERTAS.length,                                          rotulo: 'TOTAL',    cor: Colors.textPrimary },
            { valor: ALERTAS.filter(a => a.nivel_critico === 'CRÍTICO').length, rotulo: 'CRÍTICOS', cor: '#ff3b30' },
            { valor: ALERTAS.filter(a => a.nivel_critico === 'ALTO').length,    rotulo: 'ALTOS',    cor: '#ff9500' },
          ].map(s => (
            <View key={s.rotulo} style={[estilos.caixaStat, { borderColor: s.cor === Colors.textPrimary ? Colors.border : s.cor }]}>
              <Text style={[estilos.valorStat, { color: s.cor }]}>{s.valor}</Text>
              <Text style={estilos.rotuloStat}>{s.rotulo}</Text>
            </View>
          ))}
        </View>

        <Divider />

        {/* Filtros */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={estilos.scrollFiltros}
          contentContainerStyle={estilos.conteudoFiltros}
        >
          {FILTROS.map(f => {
            const corNivel = f.chave !== 'TODOS' ? CONFIG_NIVEL[f.chave as NivelCritico].cor : Colors.amber;
            return (
              <TouchableOpacity
                key={f.chave}
                style={[
                  estilos.botaoFiltro,
                  filtro === f.chave && { borderColor: corNivel, backgroundColor: Colors.bgElevated },
                ]}
                onPress={() => setFiltro(f.chave)}
              >
                <Text style={[
                  estilos.textoBotaoFiltro,
                  filtro === f.chave && { color: corNivel },
                ]}>
                  {f.rotulo}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Lista de alertas */}
        <View style={estilos.listaAlertas}>
          {alertasFiltrados.length === 0 ? (
            <View style={estilos.estadoVazio}>
              <Text style={estilos.textoVazio}>Nenhum alerta nesta categoria</Text>
            </View>
          ) : (
            alertasFiltrados.map(alerta => (
              <CartaoAlerta
                key={alerta.id_alerta}
                alerta={alerta}
                aoTocar={() => setAlertaSelecionado(alerta)}
              />
            ))
          )}
        </View>

        <Text style={estilos.rodape}>
          Dados simulados · Modelo T_GS_ALERTA · Toque em um alerta para detalhes
        </Text>
      </ScrollView>

      {alertaSelecionado && (
        <ModalAlerta
          alerta={alertaSelecionado}
          aoFechar={() => setAlertaSelecionado(null)}
        />
      )}
    </SafeAreaView>
  );
}
