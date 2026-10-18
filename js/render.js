function renderCategoryTabs() {
  categoryTabs.innerHTML = EMOJI_CATEGORIES.map(cat => `
    <button onclick="switchCategory('${cat.id}')"
            class="px-2 py-1 rounded-md flex items-center gap-1 whitespace-nowrap transition text-[11px] ${state.activeCategory === cat.id ? 'bg-brand-600 text-white font-semibold' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700'}">
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

function renderEmojiGrid() {
  const cat = EMOJI_CATEGORIES.find(c => c.id === state.activeCategory);
  const emojis = cat ? cat.emojis : [];

  // 使用 grid 布局渲染
  emojiGrid.innerHTML = emojis.map(emoji => `
    <button onclick="addEmojiToCanvas('${emoji}')"
         class="w-8 h-8 flex items-center justify-center text-xl bg-slate-800/60 hover:bg-brand-600/30 border border-slate-700/50 hover:border-brand-500 rounded-lg cursor-pointer transition transform active:scale-90 shrink-0">
      ${emoji}
    </button>
  `).join('');
}

function selectObject(id) {
  state.selectedId = id;
  state.isRotateMode = false;
  updateVisuals();
}

function addEmojiToCanvas(emojiStr, customProps = {}) {
  saveHistory();
  const canvasRect = designCanvas.getBoundingClientRect();
  const spawnX = canvasRect.width / 2 - 20;
  const spawnY = canvasRect.height / 2 - 20;

  let defaultScale = 1.0;
  if (['🏡', '🏘️', '⛪', '🏰', '🏙️', '🌲', '🌳', '⛰️', '🏔️'].includes(emojiStr)) defaultScale = 1.5;
  else if (['🌿', '☘️', '🌷', '🌼', '🍄'].includes(emojiStr)) defaultScale = 0.85;

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
        rotateAngleTxt.textContent = `Rotate (${Math.round(activeObj.rotate)}°)`;
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

// ==================== 比例切换逻辑 ====================
function changeAspectRatio(ratioStr) {
  if (state.aspectRatio === ratioStr) return;
  
  const [wRatio, hRatio] = ratioStr.split('/').map(Number);
  const oldW = designCanvas.clientWidth;
  const oldH = designCanvas.clientHeight;

  // 更新状态和标签
  state.aspectRatio = ratioStr;
  document.getElementById('lblAspectRatio').textContent = ratioStr.replace('/', ':');

  // 计算新尺寸 (限制最大高度约为视口高度的 60%)
  const maxH = window.innerHeight * 0.62; 
  let newH = maxH;
  let newW = newH * (wRatio / hRatio);
  
  // 如果宽度超出屏幕宽度，则按宽度重新计算
  if (newW > window.innerWidth - 20) {
    newW = window.innerWidth - 20;
    newH = newW * (hRatio / wRatio);
  }

  // 应用新尺寸
  designCanvas.style.width = `${newW}px`;
  designCanvas.style.height = `${newH}px`;

  // 重新映射现有 Emoji 的坐标 (按比例缩放)
  if (oldW > 0 && oldH > 0) {
    const scaleX = newW / oldW;
    const scaleY = newH / oldH;
    
    state.canvasObjects.forEach(obj => {
      obj.x = obj.x * scaleX;
      obj.y = obj.y * scaleY;
    });
  }

  renderCanvas();
  showToast(`Ratio changed to ${ratioStr.replace('/', ':')}`);
}
window.changeAspectRatio = changeAspectRatio;

// 监听窗口大小变化，自动调整画布以保持比例
window.addEventListener('resize', () => {
  changeAspectRatio(state.aspectRatio);
});