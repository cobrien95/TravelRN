/**
 * TravelRN — Design Tokens
 * Matches the web dashboard's dark theme.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#f0f2f8',
    background: '#0a0e1a',
    tint: '#3b82f6',
    icon: '#8b95b8',
    tabIconDefault: '#5a6488',
    tabIconSelected: '#3b82f6',
  },
  dark: {
    text: '#f0f2f8',
    background: '#0a0e1a',
    tint: '#3b82f6',
    icon: '#8b95b8',
    tabIconDefault: '#5a6488',
    tabIconSelected: '#3b82f6',
  },
};

// App-wide palette (always dark themed)
export const Theme = {
  bgPrimary: '#0a0e1a',
  bgSecondary: '#111827',
  bgCard: '#1a1f35',
  bgCardHover: '#222845',
  bgInput: '#1e2340',
  borderColor: '#2d3555',
  borderAccent: '#4f5b93',
  textPrimary: '#f0f2f8',
  textSecondary: '#8b95b8',
  textMuted: '#5a6488',
  accentBlue: '#3b82f6',
  accentPurple: '#8b5cf6',
  accentGreen: '#10b981',
  accentGreenSoft: '#10b98130',
  accentAmber: '#f59e0b',
  accentAmberSoft: '#f59e0b30',
  accentRose: '#f43f5e',
  accentRoseSoft: '#f43f5e30',
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
