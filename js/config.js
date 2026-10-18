// ==================== Emoji 分类数据库 ====================
const EMOJI_CATEGORIES = [
  { id: 'buildings', name: 'Buildings', icon: '🏡', emojis: ['🏡', '🏘️', '🏚️', '🏠', '🏰', '⛪', '🕌', '🛕', '🏙️', '🏪', '🏫', '🏬', '🏭', '⛩️', '⛲', '🎪'] },
  { id: 'nature', name: 'Nature', icon: '🌳', emojis: ['🌳', '🌲', '🌴', '🌵', '🌱', '🌿', '☘️', '🍀', '🪵', '🍄', '🪨', '⛰️', '🏔️', '🌊'] },
  { id: 'decor', name: 'Roads & Decor', icon: '🛤️', emojis: ['🧱', '🛤️', '🛣️', '🚧', '🛑', '🪧', '🌷', '🌻', '🌼', '🌹', '🌺', '🌸', '🪷', '💡', '🔥'] },
  { id: 'characters', name: 'People & Pets', icon: '🚶', emojis: ['🚶', '🏃', '🚴', '👩', '👨', '👶', '🐱', '🐶', '🐰', '🦊', '🐻', '🐼', '🦅', '🦋', '🐝', '🐴', '🐄'] },
  { id: 'sky', name: 'Sky & Weather', icon: '☀️', emojis: ['☀️', '🌤️', '☁️', '🌧️', '⛈️', '❄️', '🌈', '🌙', '⭐', '⚡', '🛸', '🎈'] }
];

// ==================== 预设场景数据 ====================
const PRESET_TEMPLATES = {
  town: [
    { emoji: '☀️', x: 230, y: 20, scale: 1.8 },
    { emoji: '☁️', x: 20, y: 30, scale: 1.4 },
    { emoji: '⛰️', x: 120, y: 80, scale: 2.2 },
    { emoji: '🏔️', x: 10, y: 80, scale: 2.0 },
    { emoji: '⛪', x: 135, y: 150, scale: 1.8 },
    { emoji: '🏡', x: 30, y: 160, scale: 1.5 },
    { emoji: '🏡', x: 230, y: 160, scale: 1.5 },
    { emoji: '🛤️', x: 145, y: 270, scale: 1.2, rotate: 90 },
    { emoji: '🛤️', x: 145, y: 330, scale: 1.2, rotate: 90 },
    { emoji: '🏘️', x: 40, y: 260, scale: 1.6 },
    { emoji: '🏪', x: 210, y: 260, scale: 1.6 },
    { emoji: '🌲', x: 5, y: 140, scale: 1.6 },
    { emoji: '🌳', x: 275, y: 140, scale: 1.6 },
    { emoji: '🚶', x: 125, y: 280, scale: 1.0 },
    { emoji: '🌷', x: 95, y: 250, scale: 0.8 },
    { emoji: '🌻', x: 195, y: 250, scale: 0.8 },
    { emoji: '🍄', x: 85, y: 360, scale: 0.7 }
  ],
  forest: [
    { emoji: '☀️', x: 220, y: 20, scale: 1.6 },
    { emoji: '☁️', x: 40, y: 40, scale: 1.3 },
    { emoji: '🌲', x: 30, y: 110, scale: 2.0 },
    { emoji: '🌲', x: 120, y: 90, scale: 2.3 },
    { emoji: '🌳', x: 210, y: 120, scale: 2.0 },
    { emoji: '🏡', x: 120, y: 220, scale: 1.6 },
    { emoji: '🌊', x: 20, y: 340, scale: 1.5 },
    { emoji: '🪵', x: 200, y: 320, scale: 1.2 },
    { emoji: '🪨', x: 250, y: 340, scale: 1.0 },
    { emoji: '🦊', x: 170, y: 330, scale: 1.0 },
    { emoji: '🍄', x: 90, y: 310, scale: 0.8 },
    { emoji: '🍄', x: 110, y: 330, scale: 0.8 }
  ]
};