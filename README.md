# 孙琦 - AI 设计师作品集

深海水母氛围的 AI UI 设计师个人作品集。使用 React 18、Vite、TypeScript、Tailwind CSS、Framer Motion 与 React Router v6 搭建，PC 端固定 1700px 版心。

## 本地打开

```bash
npm install
npm run dev
```

浏览器访问命令行显示的地址（默认 `http://localhost:5174`）。生产构建：

```bash
npm run build
```

## 项目结构

```text
src/
├── components/
│   ├── layout/Navigation.tsx       # 顶部导航
│   ├── sections/                  # 首页 5 个独立区块
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   └── Footer.tsx
│   └── ui/                        # 通用玻璃卡片、标题、媒体占位组件
├── config/site.ts                 # 全站唯一内容、链接、素材配置入口
├── pages/HomePage.tsx             # 首页
├── pages/WorksPage.tsx            # /works/:workId 作品详情占位页
├── styles/index.css               # 全局设计 Token 与样式
├── App.tsx                        # 路由与页面入场动效
└── main.tsx                       # 应用入口
public/assets/
├── images/                        # 图片素材替换目录
└── video/                         # 视频素材替换目录
```

## 替换素材 / 文案

所有文字、联系方式、社交链接、作品信息及文件路径均在 `src/config/site.ts`：

- `owner.avatar`：个人头像；将文件放在 `public/assets/images/`，路径示例 `/assets/images/my-avatar.jpg`。
- `media.heroVideo` / `media.heroPoster`：首屏 MP4 视频与封面；没有视频时，页面会自动使用深海氛围 CSS 占位视觉。
- `projects[].image`：作品封面；替换为图片路径即可。
- `about`、`skills`、`socialLinks`：分别控制履历、能力与社交信息。能力项支持直接新增或删除对象。

每个未替换媒体都将显示带网格的占位容器，便于设计师确认素材位置。当前表单为前端展示状态；如需真实提交，可在 `Footer.tsx` 的 `onSubmit` 接入邮件或表单服务。
