import { StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

export const estilos = StyleSheet.create({
  segura: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  conteudo: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  // Cabeçalho
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
    marginTop: Spacing.sm,
  },
  titulo: {
    fontFamily: Typography.display,
    color: Colors.textPrimary,
    fontSize: 28,
    letterSpacing: 4,
  },
  subtitulo: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 0.5,
  },
  bannerCritico: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2a0505',
    borderWidth: 1,
    borderColor: '#ff3b30',
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  textoBannerCritico: {
    fontFamily: Typography.display,
    color: '#ff3b30',
    fontSize: 9,
    letterSpacing: 2,
  },

  // Estatísticas
  linhaStats: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.md },
  caixaStat: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
    alignItems: 'center',
  },
  valorStat: {
    fontFamily: Typography.display,
    fontSize: 28,
  },
  rotuloStat: {
    fontFamily: Typography.display,
    color: Colors.textMuted,
    fontSize: 7,
    letterSpacing: 2,
    marginTop: 2,
  },

  // Filtros
  scrollFiltros: { marginBottom: Spacing.md },
  conteudoFiltros: { gap: Spacing.sm, paddingBottom: 4 },
  botaoFiltro: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    backgroundColor: Colors.bgCard,
  },
  textoBotaoFiltro: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 12,
  },

  // Lista
  listaAlertas: { gap: Spacing.sm },

  // Cartão de alerta
  cartaoAlerta: {
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
  },
  cabecalhoCartao: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  esquerdaCartao: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  pontoPulsante: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  badgeNivel: {
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  textoNivel: {
    fontFamily: Typography.display,
    fontSize: 9,
    letterSpacing: 1.5,
  },
  tempoAlerta: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 11,
  },
  descricaoAlerta: {
    fontFamily: Typography.body,
    color: Colors.textPrimary,
    fontSize: 13,
    lineHeight: 19,
    marginBottom: Spacing.sm,
  },
  metaAlerta: { flexDirection: 'row', gap: Spacing.md },
  itemMeta: { flex: 1 },
  rotuloMeta: {
    fontFamily: Typography.display,
    color: Colors.textMuted,
    fontSize: 7,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  valorMeta: {
    fontFamily: Typography.bodyMedium,
    color: Colors.textSecondary,
    fontSize: 12,
  },

  // Estado vazio
  estadoVazio: { alignItems: 'center', padding: Spacing.xxl },
  textoVazio: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 13,
  },

  rodape: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: Spacing.xl,
    letterSpacing: 0.5,
  },

  // Modal
  fundoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  painelModal: {
    backgroundColor: '#0f0602',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    borderTopWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  alceModal: {
    width: 40,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  cabecalhoModal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  badgeNivelGrande: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderWidth: 1,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
  },
  textoNivelGrande: {
    fontFamily: Typography.display,
    fontSize: 14,
    letterSpacing: 2,
  },
  descricaoModal: {
    fontFamily: Typography.body,
    color: Colors.textPrimary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: Spacing.md,
  },
  gradeModal: { gap: 2 },
  linhaModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  rotuloModal: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  valorModal: {
    fontFamily: Typography.bodyMedium,
    color: Colors.textPrimary,
    fontSize: 13,
    maxWidth: '55%',
    textAlign: 'right',
  },
  botaoFechar: {
    marginTop: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.rust,
    borderRadius: Radius.sm,
    padding: Spacing.md,
    alignItems: 'center',
  },
  textoFechar: {
    fontFamily: Typography.display,
    color: Colors.rust,
    fontSize: 11,
    letterSpacing: 2,
  },
});
