import { StyleSheet } from 'react-native';
import { Colors, Spacing, Radius, Typography } from '@/constants/theme';

export const estilos = StyleSheet.create({
  segura: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  conteudo: { padding: Spacing.md, paddingBottom: Spacing.xxl },

  // Cabeçalho
  cabecalho: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
    marginTop: Spacing.sm,
  },
  containerOrb: { position: 'relative', width: 72, height: 72 },
  orbMarte: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.rust },
  brilhoOrb: {
    position: 'absolute',
    top: -8, left: -8,
    width: 88, height: 88,
    borderRadius: 44,
    backgroundColor: Colors.rust,
    opacity: 0.1,
  },
  textoCabecalho: { flex: 1 },
  titulo: {
    fontFamily: Typography.display,
    color: Colors.textPrimary,
    fontSize: 32,
    letterSpacing: 4,
  },
  subtitulo: {
    fontFamily: Typography.body,
    color: Colors.rust,
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  descricao: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  // Curiosidades
  gradeCuriosidades: { gap: Spacing.sm, marginBottom: Spacing.md },
  cartaoCuriosidade: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  emojiCuriosidade: { fontSize: 20, width: 28 },
  labelCuriosidade: {
    fontFamily: Typography.bodyMedium,
    color: Colors.amber,
    fontSize: 12,
    width: 120,
    paddingTop: 2,
  },
  valorCuriosidade: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 12,
    flex: 1,
    lineHeight: 18,
    paddingTop: 2,
  },

  // Rovers
  cartaoRover: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  cabecalhoRover: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  nomeRover: {
    fontFamily: Typography.display,
    color: Colors.textPrimary,
    fontSize: 16,
    letterSpacing: 1,
  },
  chipStatus: {
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  textoStatus: {
    fontFamily: Typography.display,
    fontSize: 8,
    letterSpacing: 2,
  },
  metaRover: { gap: 4, marginBottom: Spacing.sm },
  itemMetaRover: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 12,
  },
  missaoRover: {
    fontFamily: Typography.body,
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 18,
    fontStyle: 'italic',
  },

  // Glossário
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
  },
  chevronGlossario: { color: Colors.textMuted, fontSize: 10 },
  definicaoGlossario: {
    fontFamily: Typography.body,
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginTop: Spacing.sm,
  },

  // Sobre o app
  cartaoFonte: {
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
    marginBottom: Spacing.md,
  },
  linkFonte: {
    color: Colors.amber,
    fontFamily: Typography.bodyMedium,
  },
  botaoLink: {
    borderWidth: 1,
    borderColor: Colors.rust,
    borderRadius: Radius.sm,
    padding: Spacing.sm,
    alignItems: 'center',
  },
  textoBotaoLink: {
    fontFamily: Typography.display,
    color: Colors.rust,
    fontSize: 9,
    letterSpacing: 2,
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
