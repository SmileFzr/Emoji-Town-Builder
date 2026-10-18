// ==================== 分类标签渲染 ====================
function renderCategoryTabs() {
  categoryTabs.innerHTML = EMOJI_CATEGORIES.map(cat => `
    <button onclick="switchCategory('${cat.id}')"
            class="px-2.5 py-1 rounded-lg flex items-center gap-1.5 whitespace-nowrap transition text-xs ${state.activeCategory === cat.id ? 'bg-brand-600 text-white font-semibold' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'}">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');
}

function switchCategory(catId) {
  state.activeCategory = catId;
  renderCategoryTabs();
  renderEmojiGrid();
}
window.switchCategory = switchCategory;

// ==================== Emoji 网格渲染 ====================
function renderEmojiGrid() {
  const cat = EMOJI_CATEGORIES.find(c => c.id === state.activeCategory);
  const emojis = cat ? cat.emojis : [];

  emojiGrid.innerHTML = emojis.map(emoji => `
    <button onclick="addEmojiToCanvas('${emoji}')"
         class="h-10 w-10 shrink-0 flex items-center justify-center text-2xl bg-slate-800/80 hover:bg-brand-600/30 border border-slate-700/60 hover:border-brand-500 rounded-xl cursor-pointer transition transform active:scale-90">
      ${emoji}
    </button>
  `).join('');
}

// ==================== 选中状态 ====================
function selectObject(id) {
  state.selectedId = id;
  state.isRotateMode = false;
  updateVisuals();
}

// ==================== 添加 Emoji 到画布 ====================
function addEmojiToCanvas(emojiStr, customProps = {}) {
  saveHistory();
  const canvasRect = designCanvas.getBoundingClientRect();
  const spawnX = canvasRect.width / 2 - 20;
  const spawnY = canvasRect.height / 2 - 20;

  let defaultScale = 1.0;
  if (['🏡', '🏘️', '⛪', '🏰', '🏙️', '🌲', '🌳', '⛰️'].includes(emojiStr)) defaultScale = 1.5;
  else if (['🌿', '☘️', 'mushroom', '🌷', '🌼'].includes(emojiStr)) defaultScale = 0.85;

  const newObj = {
    id: state.nextId++,
    emoji: emojiStr,
    x: customProps.x !== undefined ? customProps.x : spawnX,
    y: customProps.y !== undefined ? customProps.y : spawnY,
    scale: customProps.scale !== undefined ? customProps.scale : defaultScale,
    rotate: customProps.rotate !== undefined ? customProps.rotate : 0,
    zIndex: customProps.zIndex || state.canvasObjects.length + 1
  };

  state.canvasObjects.push(newObj);
  selectObject(newObj.id);
  renderCanvas();
}
window.addEmojiToCanvas = addEmojiToCanvas;

// ==================== 画布整体渲染 ====================
function renderCanvas() {
  emptyHint.classList.toggle('hidden', state.canvasObjects.length > 0);
  canvasObjectsContainer.innerHTML = '';

  state.canvasObjects.forEach(obj => {
    const isSelected = obj.id === state.selectedId;

    const el = document.createElement('div');
    el.className = `canvas-obj ${isSelected ? 'emoji-item-selected' : ''} ${isSelected && state.isRotateMode ? 'emoji-item-rotating' : ''}`;
    el.style.left = `${obj.x}px`;
    el.style.top = `${obj.y}px`;
    el.style.zIndex = obj.zIndex;
    el.style.fontSize = `32px`;
    el.style.transform = `scale(${obj.scale}) rotate(${obj.rotate}deg)`;
    el.innerHTML = obj.emoji;
    el.dataset.id = obj.id;

    canvasObjectsContainer.appendChild(el);
  });

  updateFloatingControls();
}

// ==================== 选中态 / 位置增量更新 ====================
function updateVisuals() {
  const elements = canvasObjectsContainer.querySelectorAll('.canvas-obj');
  elements.forEach(el => {
    const id = parseInt(el.dataset.id);
    const isSelected = id === state.selectedId;

    if (isSelected) {
      el.classList.add('emoji-item-selected');
      if (state.isRotateMode) el.classList.add('emoji-item-rotating');
      else el.classList.remove('emoji-item-rotating');
    } else {
      el.classList.remove('emoji-item-selected', 'emoji-item-rotating');
    }

    const obj = state.canvasObjects.find(o => o.id === id);
    if (obj) {
      el.style.left = `${obj.x}px`;
      el.style.top = `${obj.y}px`;
      el.style.zIndex = obj.zIndex;
      el.style.transform = `scale(${obj.scale}) rotate(${obj.rotate}deg)`;
    }
  });
  updateFloatingControls();
}

// ==================== 悬浮控制面板显隐 ====================
function updateFloatingControls() {
  if (state.selectedId !== null) {
    floatingObjectControls.classList.remove('scale-0', 'opacity-0', 'pointer-events-none');
    floatingObjectControls.classList.add('scale-100', 'opacity-100');

    if (state.isRotateMode) {
      btnToggleRotateMode.classList.add('bg-amber-500', 'text-slate-950');
      btnToggleRotateMode.classList.remove('glass-panel', 'text-amber-400');
      rotateBanner.classList.remove('hidden');
      rotateBanner.classList.add('flex');
      const activeObj = state.canvasObjects.find(o => o.id === state.selectedId);
      if (activeObj) {
        rotateAngleTxt.textContent = `Rotation Mode (${Math.round(activeObj.rotate)}°) - Drag anywhere`;
      }
    } else {
      btnToggleRotateMode.classList.remove('bg-amber-500', 'text-slate-950');
      btnToggleRotateMode.classList.add('glass-panel', 'text-amber-400');
      rotateBanner.classList.add('hidden');
      rotateBanner.classList.remove('flex');
    }

  } else {
    floatingObjectControls.classList.add('scale-0', 'opacity-0', 'pointer-events-none');
    floatingObjectControls.classList.remove('scale-100', 'opacity-100');
    rotateBanner.classList.add('hidden');
    rotateBanner.classList.remove('flex');
  }
}