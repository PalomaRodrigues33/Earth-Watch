import { StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

export const estilos = StyleSheet.create({
  // Tela de carregamento
  centralizado: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  textoCarregando: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    marginTop: Spacing.md,
    fontSize: 14,
    letterSpacing: 1,
  },

  // Tela de erro
  iconeErro: { fontSize: 40, marginBottom: Spacing.md },
  tituloErro: {
    fontFamily: Typography.display,
    color: Colors.danger,
    fontSize: 18,
    marginBottom: Spacing.sm,
  },
  corpoErro: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  botaoTentar: {
    borderWidth: 1,
    borderColor: Colors.rust,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
  },
  textoTentar: {
    fontFamily: Typography.display,
    color: Colors.rust,
    fontSize: 11,
    letterSpacing: 2,
  },

  // StatCard
  cartaoStat: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    flex: 1,
  },
  cartaoStatDestaque: {
    borderColor: Colors.rust,
    backgroundColor: Colors.bgElevated,
  },
  iconestat: { fontSize: 18, marginBottom: Spacing.xs },
  rotuloStat: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: Spacing.xs,
  },
  linhaValorStat: { flexDirection: 'row', alignItems: 'flex-end' },
  valorStat: {
    fontFamily: Typography.display,
    color: Colors.textPrimary,
    fontSize: 22,
  },
  valorStatDestaque: { color: Colors.amberLight },
  unidadeStat: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 12,
    marginBottom: 3,
    marginLeft: 3,
  },

  // SectionHeader
  cabecalhoSecao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  linhaSecao: {
    width: 3,
    height: 20,
    backgroundColor: Colors.rust,
    borderRadius: 2,
  },
  titulosSecao: { flex: 1 },
  tituloSecao: {
    fontFamily: Typography.display,
    color: Colors.textPrimary,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  subtituloSecao: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },

  // Divider
  divisor: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },

  // Tag
  tag: {
    borderWidth: 1,
    borderColor: Colors.dustLight,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  textoTag: {
    fontFamily: Typography.body,
    color: Colors.dustLight,
    fontSize: 11,
    letterSpacing: 0.5,
  },

  // TempBar
  containerBarraTemp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  rotuloBarraTemp: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 12,
    width: 36,
  },
  trilhaBarraTemp: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.bgSubtle,
    borderRadius: Radius.full,
    overflow: 'hidden',
    position: 'relative',
  },
  preenchimentoBarra: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: Colors.rust,
    borderRadius: Radius.full,
  },
});
