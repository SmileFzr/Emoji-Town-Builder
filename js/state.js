// ==================== 应用状态 ====================
let state = {
  canvasObjects: [],
  selectedId: null,
  isRotateMode: false,
  activeCategory: 'buildings',
  isMenuCollapsed: false,
  nextId: 1,
  aspectRatio: '9/16'
};

// ==================== 历史记录（撤销 & 重做） ====================
let historyStack = [];
let redoStack = [];

function saveHistory() {
  historyStack.push(JSON.stringify(state.canvasObjects));
  if (historyStack.length > 25) {
    historyStack.shift();
  }
  redoStack = []; // 新操作清空重做栈
}

function undoLastAction() {
  if (historyStack.length === 0) {
    showToast('无可撤回操作');
    return;
  }
  // 当前状态压入重做栈
  redoStack.push(JSON.stringify(state.canvasObjects));
  
  const previousState = historyStack.pop();
  state.canvasObjects = JSON.parse(previousState);
  
  if (state.selectedId !== null && !state.canvasObjects.some(o => o.id === state.selectedId)) {
    selectObject(null);
  }
  renderCanvas();
  showToast(I18N[currentLang].undo + ' ✓');
}

function redoLastAction() {
  if (redoStack.length === 0) {
    showToast('无可重做操作');
    return;
  }
  // 当前状态压回历史栈
  historyStack.push(JSON.stringify(state.canvasObjects));
  
  const nextState = redoStack.pop();
  state.canvasObjects = JSON.parse(nextState);
  
  if (state.selectedId !== null && !state.canvasObjects.some(o => o.id === state.selectedId)) {
    selectObject(null);
  }
  renderCanvas();
  showToast(I18N[currentLang].redo + ' ✓');
}