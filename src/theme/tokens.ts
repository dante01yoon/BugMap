// Screen-specific values from the selected Figma frame 2:3 / background 2:2.
// Provider colors are brand colors, not additional app accent colors.
export const colors = {
  background: '#FAF8FF',
  surface: '#FFFFFF',
  subtle: '#F9FAFB',
  muted: '#F3F4F6',
  border: '#E5E7EB',
  divider: '#F3F4F6',
  primary: '#15803D',
  primaryTint: 'rgba(21, 128, 61, 0.10)',
  primaryOutline: 'rgba(21, 128, 61, 0.20)',
  text: '#111827',
  body: '#4B5563',
  secondary: '#6B7280',
  quiet: '#9CA3AF',
  kakao: '#FEE500',
  kakaoText: '#191919',
  naver: '#03C75A',
  apple: '#000000',
} as const;

export const layout = {
  gutter: 16,
  cardGap: 12,
  radius: 32,
  buttonHeight: 48,
  maxWidth: 430,
} as const;
