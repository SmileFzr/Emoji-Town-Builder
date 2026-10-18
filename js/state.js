// ==================== 应用状态 ====================
let state = {
  canvasObjects: [],
  selectedId: null,
  isRotateMode: false,
  activeCategory: 'buildings',
  isMenuCollapsed: false,
  nextId: 1
};

// ==================== 撤销历史 ====================
let historyStack = [];

function saveHistory() {
  historyStack.push(JSON.stringify(state.canvasObjects));
  if (historyStack.length > 25) {
    historyStack.shift();
  }
}

function undoLastAction() {
  if (historyStack.length === 0) {
    showToast('Nothing to undo');
    return;
  }
  const previousState = historyStack.pop();
  state.canvasObjects = JSON.parse(previousState);
  if (state.selectedId !== null && !state.canvasObjects.some(o => o.id === state.selectedId)) {
    selectObject(null);
  }
  renderCanvas();
  showToast('Action undone');
}