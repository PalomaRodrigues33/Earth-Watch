import { StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

export const estilos = StyleSheet.create({
  segura: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  conteudo: { paddingBottom: Spacing.xxl },

  // Imagem de fundo
  bgContainer: {
    marginBottom: Spacing.md,
  },
  bgImagem: {
    opacity: 0.35,
  },
  bgOverlay: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
    backgroundColor: 'rgba(10, 4, 0, 0.6)',
  },

  // Cabeçalho
  cabecalho: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  cabecalhoEsquerda: {},
  cabecalhoDireita: {
    alignItems: 'flex-end',
    gap: Spacing.sm,
  },
  rotuloSol: {
    fontFamily: Typography.display,
    color: Colors.textMuted,
    fontSize: 9,
    letterSpacing: 3,
  },
  numeroSol: {
    fontFamily: Typography.display,
    color: Colors.amber,
    fontSize: 52,
    lineHeight: 56,
  },
  dataTerra: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  chipAtmo: {
    backgroundColor: Colors.bgElevated,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.rust,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
  },
  textoAtmo: {
    fontFamily: Typography.display,
    color: Colors.rust,
    fontSize: 9,
    letterSpacing: 2,
  },

  // Relógio marciano
  cardRelogio: {
    backgroundColor: 'rgba(20, 10, 2, 0.85)',
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  relogioEsquerda: { flex: 1 },
  rotuloRelogio: {
    fontFamily: Typography.display,
    color: Colors.textMuted,
    fontSize: 8,
    letterSpacing: 2,
    marginBottom: 4,
  },
  horaRelogio: {
    fontFamily: Typography.display,
    color: Colors.amberLight,
    fontSize: 32,
    letterSpacing: 2,
  },
  subRelogio: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 4,
  },
  orbRelogio: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.bgSubtle,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Spacing.md,
  },
  emojiOrb: { fontSize: 24 },

  // Temperatura
  cardHero: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.bgElevated,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.md,
    overflow: 'hidden',
  },
  rotuloHero: {
    fontFamily: Typography.display,
    color: Colors.textMuted,
    fontSize: 9,
    letterSpacing: 2,
    marginBottom: Spacing.md,
  },
  gradeTemp: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.lg,
  },
  colunaTemp: { alignItems: 'flex-start' },
  miniRotuloTemp: {
    fontFamily: Typography.display,
    color: Colors.textMuted,
    fontSize: 8,
    letterSpacing: 3,
    marginBottom: 2,
  },
  tempMin: {
    fontFamily: Typography.display,
    color: Colors.dustLight,
    fontSize: 36,
    lineHeight: 40,
  },
  tempMax: {
    fontFamily: Typography.display,
    color: Colors.amberLight,
    fontSize: 36,
    lineHeight: 40,
  },
  tempF: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  divisorTemp: {
    width: 1,
    height: 50,
    backgroundColor: Colors.border,
  },
  orbHero: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.rust,
    opacity: 0.2,
    marginLeft: 'auto',
    shadowColor: Colors.rustLight,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },

  // Grade de condições
  grade: {
    gap: Spacing.sm,
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.md,
  },
  linhaGrade: { flexDirection: 'row', gap: Spacing.sm },
  celulaGrade: { flex: 1 },

  // Atmosfera
  cardAtmo: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    marginHorizontal: Spacing.md,
  },
  linhaAtmo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  chaveAtmo: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
  },
  valorAtmo: {
    fontFamily: Typography.bodyMedium,
    color: Colors.textPrimary,
    fontSize: 13,
  },
  descAtmo: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
    marginTop: 2,
    marginBottom: Spacing.xs,
  },

  // Botão histórico de sols
  botaoSols: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  botaoSolsConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  botaoSolsIcone: { fontSize: 24 },
  botaoSolsTextos: { flex: 1 },
  botaoSolsTitulo: {
    fontFamily: Typography.display,
    color: Colors.textPrimary,
    fontSize: 11,
    letterSpacing: 2,
  },
  botaoSolsSub: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
  },
  botaoSolsSeta: {
    fontFamily: Typography.display,
    color: Colors.amber,
    fontSize: 28,
    lineHeight: 32,
  },

  rodape: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
});
