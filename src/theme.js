import { Platform } from 'react-native';
export const colors = {
  ink: '#14110F',
  inkSoft: '#1F1A17',
  inkLine: '#322B26',
  paper: '#F4EBDD',
  paperDim: '#E4D6BF',
  onPaper: '#2A221C',
  onPaperMuted: '#7A6B5B',
  textMain: '#F4EBDD',
  textMuted: '#A39688',
  ember: '#FF5A36',
  sun: '#F6B73C',
  white: '#FFFFFF',
  overlayLight: 'rgba(20, 17, 15, 0.35)',
  overlayHeavy: 'rgba(20, 17, 15, 0.65)',
};

export const fonts = {
  mono: Platform.select({ ios: 'Menlo', android: 'monospace', default: 'monospace' }),
};
