import { StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

export const estilos = StyleSheet.create({
  segura: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  conteudo: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  cabecalho: {
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  titulo: {
    fontFamily: Typography.display,
    color: Colors.textPrimary,
    fontSize: 24,
    letterSpacing: 3,
  },
  subtitulo: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },

  itemGlossario: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  linhaGlossario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  termoGlossario: {
    fontFamily: Typography.bodyBold,
    color: Colors.amberLight,
    fontSize: 14,
    flex: 1,
  },
  chevronGlossario: {
    color: Colors.textMuted,
    fontSize: 10,
    marginLeft: Spacing.sm,
  },
  definicaoGlossario: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: Spacing.sm,
  },
  exemploGlossario: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
    marginTop: Spacing.xs,
  },

  cardFonte: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  textoFonte: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },

  rodape: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 10,
    textAlign: 'center',
    marginTop: Spacing.md,
    letterSpacing: 0.5,
  },
});
