# 🏙️ Emoji World Designer & Town Builder

> 🎨 用 Emoji 自由搭建你的微型世界 —— 拖拽、旋转、缩放、分层，一键导出 PNG 或文本网格。

[![Live Demo](https://img.shields.io/badge/Live%20Demo-在线体验-brightgreen?style=for-the-badge&logo=github)](https://smilefzr.github.io/Emoji-Town-Builder/)
[![Vanilla JS](https://img.shields.io/badge/Vanilla-JS-yellow?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

👉 **[点击这里立即在线体验 (Live Demo)](https://smilefzr.github.io/Emoji-Town-Builder/)** 👈

---

## ✨ 功能特性

- 🎨 **9:16 竖版画布** —— 适合社交媒体、手机壁纸、故事分享
- 🖱️ **拖拽移动** —— 鼠标 / 触屏单指拖动，实时定位
- 🔄 **旋转模式** —— 拖动旋转，自动吸附 0° / 90° / 180° / 270°
- 🤏 **双指缩放与平移** —— 移动端双指同时缩放和移动对象
- 🧩 **多分类 Emoji 面板** —— 建筑、自然、道路装饰、人物宠物、天空天气
- 🏡 **预设场景模板** —— Emoji Town、Forest Haven、空白画布
- 📚 **图层控制** —— 上移 / 下移 / 复制 / 删除 / 撤销（25 步历史）
- 📤 **导出能力**
  - 导出 PNG 图片（`html2canvas` 高清 2x）
  - 复制为 9×16 的 Emoji 文本网格
- 💎 **毛玻璃 UI** —— 深色主题、移动端友好、响应式布局

---

## 🚀 快速开始

本项目是纯静态页面，无需安装依赖或构建步骤。

### 方式一：直接打开

```bash
git clone https://github.com/<your-username>/emoji-world-designer.git
cd emoji-world-designer
# 直接用浏览器打开 index.html
```

### 方式二：本地静态服务器（推荐）

由于项目使用了 CDN 资源和 `html2canvas`，建议用本地服务器打开以避免文件协议限制：

```bash
# Python 3
python -m http.server 8080

# 或 Node.js (npx)
npx serve .

# 或 VS Code Live Server 插件
```

然后访问 `http://localhost:8080`。

---

## 📁 项目结构

```
emoji-world-designer/
├── index.html              # 页面结构（唯一 HTML 入口）
├── css/
│   └── styles.css          # 自定义样式：画布主题、选中态、毛玻璃面板
├── js/
│   ├── tailwind-config.js  # Tailwind CDN 主题配置
│   ├── config.js           # Emoji 分类数据 + 预设场景数据
│   ├── state.js            # 应用状态 + 撤销历史栈
│   ├── dom.js              # DOM 元素引用缓存
│   ├── ui.js               # Toast 通知等通用 UI 工具
│   ├── render.js           # 分类标签 / Emoji 面板 / 画布对象渲染
│   ├── interactions.js     # 鼠标拖拽、触屏单指移动、双指缩放、旋转
│   ├── presets.js          # 预设场景加载
│   ├── export.js           # PNG 与文本网格导出
│   ├── controls.js         # 工具栏与悬浮控制按钮事件
│   └── main.js             # 应用启动入口
└── README.md
```

**脚本加载顺序**（已按依赖在 `index.html` 中排列）：

```
config → state → dom → ui → render → interactions → presets → export → controls → main
```

---

## 🎮 操作指南

| 操作 | 桌面端 | 移动端 |
| --- | --- | --- |
| 添加 Emoji | 点击底部 Emoji 面板中的图标 | 点击底部 Emoji 面板中的图标 |
| 选中对象 | 单击画布中的 Emoji | 轻点画布中的 Emoji |
| 移动对象 | 按住并拖动 | 单指拖动 |
| 缩放对象 | — | 双指捏合 |
| 旋转对象 | 点击右侧 **Rotate** 按钮进入旋转模式，左右拖动 | 同左 |
| 摆正角度 | 点击 **Align** 按钮复位 0° | 同左 |
| 图层调整 | 点击 **Up** / **Down** | 同左 |
| 复制 / 删除 | 点击 **Copy** / **Delete** | 同左 |
| 撤销 | 点击 **Undo**（支持 25 步） | 同左 |
| 清空画布 | 顶部 **Clear** 按钮 | 同左 |
| 加载预设 | 顶部 **Presets** 下拉菜单 | 同左 |
| 导出 | 顶部 **Export** 下拉菜单 | 同左 |

> 💡 旋转模式下，角度接近 0° / 90° / 180° / 270° 时会自动吸附并显示 🎯 Snapped 提示。

---

## 🛠️ 技术栈

| 类别 | 技术 |
| --- | --- |
| 样式 | [Tailwind CSS](https://tailwindcss.com/)（CDN） |
| 图标 | [Font Awesome 6](https://fontawesome.com/) |
| 字体 | [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) |
| 图片导出 | [html2canvas 1.4](https://html2canvas.hertzen.com/) |
| 交互 | 原生 JavaScript（无框架、无构建） |

---

## 🔧 自定义扩展

### 添加新的 Emoji 分类

编辑 `js/config.js` 中的 `EMOJI_CATEGORIES`：

```js
{
  id: 'vehicles',
  name: 'Vehicles',
  icon: '🚗',
  emojis: ['🚗', '🚕', '🚙', '🚌', '🚓', '🚑', '🚒', '🚜', '🛵', '🚲']
}
```

### 添加新的预设场景

在 `js/config.js` 的 `PRESET_TEMPLATES` 中新增一项：

```js
PRESET_TEMPLATES.beach = [
  { emoji: '☀️', x: 230, y: 20, scale: 1.8 },
  { emoji: '🌊', x: 20, y: 340, scale: 1.5 },
  { emoji: '🏖️', x: 120, y: 260, scale: 1.6 },
  // ...
];
```

然后在 `index.html` 的 **Presets** 下拉菜单中添加按钮：

```html
<button onclick="loadPreset('beach')" class="...">
  <span>🏖️</span> Beach Day
</button>
```

### 调整画布尺寸

在 `index.html` 中修改 `#designCanvas` 的内联样式：

```html
<div id="designCanvas" ... style="width: 337px; height: 600px;">
```

保持宽高比为 9:16 即可（如 `360×640`、`450×800`）。

### 修改画布背景

在 `css/styles.css` 中修改 `.theme-grass`：

```css
.theme-grass {
  background: linear-gradient(135deg, #86efac 0%, #4ade80 50%, #22c55e 100%);
}
```

---

## 🌐 浏览器兼容性

推荐使用以下现代浏览器的最新版本：

- ✅ Chrome / Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+（iOS 14+）
- ✅ 主流 Android 浏览器

> 触摸交互依赖 Pointer / Touch Events；`html2canvas` 在部分旧版 Safari 上可能对 Emoji 渲染存在细微差异，建议导出前先在桌面端预览。

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/my-feature`
3. 提交更改：`git commit -m "feat: add my feature"`
4. 推送分支：`git push origin feature/my-feature`
5. 发起 Pull Request

### 提交信息规范（可选）

采用 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat: 新功能
fix: 修复问题
docs: 文档更新
style: 代码格式（不影响功能）
refactor: 重构
chore: 构建 / 工具相关
```

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。使用 Emoji 图形时请遵守各平台 / 字体的使用条款。

---

## 🙏 致谢

- 所有 Emoji 来自操作系统原生字体
- UI 灵感来自现代深色毛玻璃设计风格
- 感谢 [Tailwind CSS](https://tailwindcss.com/)、[Font Awesome](https://fontawesome.com/)、[html2canvas](https://html2canvas.hertzen.com/) 等开源项目

---

<div align="center">

**用 Emoji 搭建你的小世界 🏡🌳☀️**

如果这个项目对你有帮助，欢迎点一个 ⭐️ Star！

</div>