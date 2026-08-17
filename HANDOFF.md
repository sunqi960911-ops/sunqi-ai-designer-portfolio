# 孙琦 AI 设计师作品集：会话交接文档

## 1. 当前任务是什么

这是一个可本地运行的个人作品集前端工程，技术栈为 Vite + React 18 + TypeScript + Tailwind CSS + Framer Motion + React Router v6。

项目目录：`/Users/sunqi/Desktop/作品集网站3`

当前目标是持续根据设计师的截图标注调整视觉与交互。用户不需要代码说明，通常要求“其他保持不变”，因此每次只改明确提出的范围，并在完成后运行构建检查。

本地预览地址通常是：`http://localhost:5174/`

启动命令：

```bash
npm run dev -- --host 0.0.0.0 --port 5174
```

构建检查命令：

```bash
npm run build
```

## 2. 已完成的核心页面与功能

### 全局视觉

- 全站为黑色暗色背景、极简科技风。
- 当前主色已恢复为黄绿色：`#D1FD41`。
- 主色变量在 `src/styles/index.css`：

  ```css
  :root { --brand-accent: #d1fd41; --brand-accent-rgb: 209,253,65; }
  ```

- Tailwind 的 `acid` 色、导航发光色和 `SideRays` 默认色也已同步为 `#D1FD41`。
- 全局版心为 1700px：`.site-shell { width: min(calc(100% - 64px), 1700px); }`。

### 固定导航

- 顶部导航固定、位于所有图层之上，并带背景遮罩与高斯模糊。
- 文件：`src/components/layout/Navigation.tsx`
- 导航目前指向 ABOUT / WORKS / SKILLS / CONTACT。

### 首页 Hero

- 文件：`src/components/sections/Hero.tsx`
- 主视觉布局为：左侧眼睛 + `SQ.` / 描边 `STUDIO`，右侧首页人物图片。
- 当前首页图片引用：

  ```tsx
  /assets/images/hero-sunqi-studio-20260817.png
  ```

- 该图片位于：

  ```text
  public/assets/images/hero-sunqi-studio-20260817.png
  ```

- 图片采用 `object-fit: contain`，以完整显示图片，不应改回 `cover`。
- 首页图片有轻量鼠标视差（位移约 16px、旋转约 0.8deg），逻辑在 `Hero.tsx` 的 `pointermove` 监听中。
- 两只眼睛的黑色瞳孔也随鼠标方向轻微移动，使用 CSS 变量 `--pupil-x`、`--pupil-y`。
- 首屏右下角的 `SCROLL ↓ / 浏览个人介绍` 指引已经删除，**不要恢复**。
- 旧的 `hero-work-link` JSX 仍在，但 CSS 已 `display: none`；不要为清理它而顺便改变首屏布局。
- 首页响应式规则已按宽度和高度 (`vw` / `vh`) 调整眼睛尺寸、标题字号、间距。关键 CSS 位于 `src/styles/index.css` 底部 `hero-sam-*` 段。

### 个人介绍 About

- 文件：`src/components/sections/About.tsx`
- 所有文案、经历、联系方式、统计数据由 `src/config/site.ts` 中的 `siteConfig` 统一提供。
- 左侧图片采用 `TiltedCard` 交互，保持现状。
- 当前个人介绍图片配置为：

  ```ts
  avatar: '/assets/images/avatar-sunqi-office-20260817.png'
  ```

- 图片位于：

  ```text
  public/assets/images/avatar-sunqi-office-20260817.png
  ```

- 该图在上一会话末尾已完成替换并且 `npm run build` 通过；若浏览器仍显示旧图，优先确认页面是否已刷新，而不是重新改布局。
- 桌面端个人照片卡片高度设置为 700px。用户曾多次调整高度和与右侧内容底部对齐，因此除非明确要求，勿更改 `.about-portrait` / `.about-intro-grid` 的尺寸与对齐逻辑。
- 已有 4 段工作经历，定义在 `siteConfig.about.experience`。

### 项目 Projects

- 文件：`src/components/sections/Projects.tsx`
- 项目数据在 `src/config/site.ts` 的 `siteConfig.projects`。
- 顺序为：
  1. 小米电脑管家
  2. DM 车辆数据管理
  3. DAVINCI 控车 APP
  4. 东奥教育
  5. 插画
- 项目卡片使用各自封面原比例（`aspect-ratio: 1701 / 1020`），图片使用 `background-size: contain`，应完整展示。
- 网页端当前为**每次完整展示两张卡片**，后续项目可横向滚动：

  ```css
  .project-card { flex: 0 0 calc((100% - 32px) / 2); }
  ```

- 项目横向滚动条被隐藏，但仍可鼠标滚轮/触控板横向滚动。
- 鼠标悬停时封面图会放大。用户明确要求保留封面放大效果。
- 为避免悬停放大时外轮廓被裁切，`project-grid` 保留上下内边距，禁止随意添加 `overflow: hidden` 到外层。

### 专业优势 Skills

- 文件：`src/components/sections/Skills.tsx`
- 数据在 `siteConfig.skills`。
- 排版已改为三行列表式（编号、标题、说明）。
- 鼠标悬停时会显示并跟随鼠标的对应图片预览。
- 标题字号已被用户定为约 50px 的视觉级别，相关规则为：

  ```css
  .skill-list-item h3 { font-size: clamp(2.3rem, 3.28vw, 50px); }
  ```

### 联系方式 Footer

- 文件：`src/components/sections/ContactFooter.tsx`（如需确认，可用 `rg "contact-layout|contact-statement" src` 查找）。
- 当前为静态右侧联系方式卡片，**不要恢复 Lanyard / 3D 动效**。用户尝试过后明确要求恢复原样。
- 左侧大标题为 `LET’S BUILD BETTER VISUAL SYSTEMS`，使用 Anton 字体，已调整为更宽松的字距和行高。
- 底部空白已压缩；用户不希望 Footer 底部留大面积空白。

## 3. 当前状态 / 是否有阻塞

当前没有已知功能阻塞。

- 最近已运行 `npm run build` 并通过。
- 当前正在处理的最后一个有效改动是：个人介绍模块图片改为办公场景图。
- 用户下一条消息应按新的视觉请求继续处理，不需要重复首页或项目模块的已完成工作。

## 4. 关键文件索引

```text
src/
├── components/
│   ├── layout/Navigation.tsx        # 固定顶部导航
│   ├── sections/Hero.tsx            # 首页、瞳孔跟随与图片视差
│   ├── sections/About.tsx           # 个人介绍与 TiltedCard
│   ├── sections/Projects.tsx        # 项目卡片横向滚动
│   ├── sections/Skills.tsx          # 优势列表与悬停图片
│   └── ui/
│       ├── TiltedCard.tsx
│       └── SideRays.tsx             # 当前未作为首屏效果使用
├── config/site.ts                   # 绝大多数文案、数据、资源路径
└── styles/index.css                 # 全局样式与最新视觉覆盖规则

public/assets/images/
├── hero-sunqi-studio-20260817.png   # 当前首页人物图
├── avatar-sunqi-office-20260817.png # 当前 About 图片
├── project-xiaomi-pc.png
├── project-dm-system.png
├── project-davinci-dc100.png
├── project-dongao.png
└── project-illustration.png
```

## 5. 后续操作建议

每个小改动建议遵循以下顺序：

1. 先用 `rg` 查找真实负责样式或数据的文件。
2. 只修改用户明确指出的区域，避免“顺手整理”其他样式。
3. 代码文本改动使用 `apply_patch`。
4. 新图片应复制到 `public/assets/images/`，并在 `siteConfig` 或组件中引用新文件名。
5. 最后运行 `npm run build`。
6. 给用户用简短中文说明改动和构建结果。

## 6. 已踩过的坑：绝对不要再踩

### 不要让首页图片仍使用同一路径替换

用户曾反馈“图片没换过来”。原因是浏览器可能缓存静态资源。

正确方式：每次替换视觉图片时使用一个**新文件名**，然后更新引用，例如：

```text
hero-sunqi-studio-20260817.png
avatar-sunqi-office-20260817.png
```

不要只覆盖同名文件后宣称已完成。

### 不要恢复用户已删除或已否决的效果

以下内容用户已经明确删除/否决：

- 首屏 `SCROLL ↓` 浏览指引。
- 首页视频以及试图把视频黑色背景抠透明的方案。
- 首屏背景中心光晕。
- 联系方式右侧卡片的 Lanyard / 3D 动效。
- 项目卡片封面上方的光效覆盖层。

除非用户再次明确提出，否则不要恢复。

### 不要破坏首屏主视觉

- 首页人物图必须 `object-fit: contain`，以完整展示。
- 眼睛和标题现已做宽高自适应；不要改回只依赖 `vw` 的超大固定字体。
- 首页文案、眼睛与标题要对齐至 1700px 版心左边缘。
- 顶部导航始终最高层，有模糊遮罩。

### 不要破坏项目模块现状

- 当前桌面端一行两张完整项目卡片，而不是三张。
- 保留横向滚动和隐藏滚动条。
- 保留封面图 hover 放大。
- 不要对项目滚动容器设置会裁切悬停放大外轮廓的 `overflow: hidden`。

### 不要大规模重写 `src/styles/index.css`

此文件前半部分为压缩式长行 CSS，后半段含多次针对用户反馈添加的覆盖规则。应该使用 `rg` 精确定位并做最小补丁；不要格式化整份文件、不要全局替换颜色或重排规则，以免覆盖已经确认的视觉效果。

### 本地服务打不开时的处理

曾多次发生页面“打不开”，通常是 Vite 开发服务未运行，而不是代码本身坏了。

优先运行：

```bash
npm run build
```

确认构建通过后，启动：

```bash
npm run dev -- --host 0.0.0.0 --port 5174
```

若受执行环境限制导致 `EPERM`，应按工具流程请求运行本地预览服务的权限，不要靠无关代码改动来“修复”打不开的问题。

### 用户沟通原则

- 用户是设计师，回复应直接说视觉结果，不要长篇解释工程细节。
- 用户截图内的红框、蓝框和浏览器标记只是定位信息，不应被做进页面。
- 用户写“其他不变”时，只动指定元素。
- 任何素材替换后都要构建验证；必要时提醒刷新页面以加载新资源。

