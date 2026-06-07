import { StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

export const estilos = StyleSheet.create({
  segura: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  conteudo: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  cabecalho: { marginBottom: Spacing.lg, marginTop: Spacing.sm },
  titulo: {
    fontFamily: Typography.display,
    color: Colors.textPrimary,
    fontSize: 22,
    letterSpacing: 3,
  },
  subtitulo: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 4,
    letterSpacing: 1,
  },

  // Linha de cada sol
  linhaSol: { flexDirection: 'row', gap: Spacing.md, paddingVertical: Spacing.sm },
  esquerdaSol: { justifyContent: 'flex-start', paddingTop: 2 },
  badgeSol: {
    backgroundColor: Colors.bgSubtle,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
    alignItems: 'center',
    minWidth: 52,
  },
  rotuloNumeroSol: {
    fontFamily: Typography.display,
    color: Colors.textMuted,
    fontSize: 7,
    letterSpacing: 2,
  },
  numeroSol: {
    fontFamily: Typography.display,
    color: Colors.amber,
    fontSize: 16,
    marginTop: 2,
  },

  meioCentral: { flex: 1 },
  dataSol: {
    fontFamily: Typography.bodyMedium,
    color: Colors.textPrimary,
    fontSize: 13,
  },
  estacaoSol: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 10,
    marginBottom: Spacing.xs,
  },
  linhaRotulosTemp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  rotuloTemp: {
    fontFamily: Typography.display,
    color: Colors.textMuted,
    fontSize: 7,
    letterSpacing: 2,
  },
  textoTemps: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },

  direitaSol: {
    alignItems: 'flex-end',
    gap: 4,
    justifyContent: 'flex-start',
    paddingTop: 2,
  },
  chipSol: {
    backgroundColor: Colors.bgSubtle,
    borderRadius: Radius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textoChipSol: { fontFamily: Typography.body, color: Colors.dustLight, fontSize: 10 },
  pressaoSol: { fontFamily: Typography.body, color: Colors.textMuted, fontSize: 10 },
  uvSol: { fontFamily: Typography.body, color: Colors.textMuted, fontSize: 10 },
  divisorLinha: { marginVertical: 0 },

  rodape: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: Spacing.xl,
    letterSpacing: 0.5,
  },
});
