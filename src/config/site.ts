import type { LucideIcon } from 'lucide-react'
import { Aperture, Bot, Boxes, Layers3, PenTool, Sparkles } from 'lucide-react'

/**
 * 素材与文案总配置：替换本文件内容即可更新全站，不需要修改任何组件。
 * 图片放到 public/assets/images，视频放到 public/assets/video，并使用相对路径填写。
 */
export const siteConfig = {
  owner: {
    name: '孙琦',
    role: 'AI UI DESIGNER',
    headline: ['设计感知', '未来体验'],
    intro: '融合理性逻辑与感性视觉，打造引人驻足的智能产品体验',
    availability: 'AVAILABLE FOR SELECTED COLLABORATIONS',
    avatar: 'assets/images/avatar-sunqi-office-20260817.webp',
    resumeUrl: '#',
  },
  contact: {
    email: '1318158266@qq.com',
    phone: '19801109610',
    city: '北京 · 朝阳',
  },
  media: {
    heroVideo: 'assets/video/hero-jellyfish.mp4',
    heroPoster: 'assets/images/hero-jellyfish-poster.jpg',
  },
  socialLinks: [
    { label: '小红书', href: 'https://www.xiaohongshu.com/user/profile/5d6e685100000000010044e8?xsec_token=ABjlei0lsOo-7QwoPirOVT62SZpzCKm1WLo0CWqqDTIdw%3D&xsec_source=pc_search' },
    { label: 'EMAIL', href: 'mailto:1318158266@qq.com' },
    { label: '站酷', href: 'https://www.zcool.com.cn/u/ZODA3MTA0Njg=' },
  ],
  about: {
    eyebrow: 'ABOUT ME / 01',
    title: 'Hi, 我是孙琦。',
    copy: '7 年互联网产品设计经验，覆盖 AI、智能硬件、车载出行、教育与企业服务。我专注于从产品逻辑、交互流程到视觉系统的完整设计闭环，并持续探索 AI 工具为创意与效率带来的新可能。',
    stats: [
      { value: '07+', label: 'YEARS OF EXPERIENCE' },
      { value: '30+', label: 'SHIPPED PROJECTS' },
      { value: '95%', label: 'DESIGN FIDELITY' },
    ],
    focus: ['AI 产品体验', 'PC 设计系统', '智能硬件交互', '视觉与动效'],
    experience: [
      { date: '2025.03 — 至今', company: '软通动力（驻场小米）', role: 'UI 设计师', summary: '负责小米电脑管家、超级小爱与小米互联服务的全流程 UI 设计，覆盖 Windows / Mac 双端适配、组件库与双主题规范。' },
      { date: '2022.03 — 2025.02', company: '达芬骑科技（集团）有限公司', role: 'UI 设计师', summary: '主导控车 App、品牌官网与海外多语言产品体验，搭建企业级设计系统与车辆监控后台。' },
      { date: '2020.10 — 2022.03', company: '东奥教育集团', role: '视觉设计师', summary: '负责会计云课堂 App、PC 官网与移动端视觉升级，完成课程运营、专题活动及轻量化动效设计。' },
      { date: '2019.07 — 2020.10', company: '北京通泰信诚科技有限公司', role: 'UI 设计师', summary: '参与教育、电商、金融与短视频数据产品设计，覆盖 Web、App、H5 多类型项目的视觉与交互交付。' },
    ],
  },
  projects: [
    { id: 'mi-manager', number: '01', title: '小米电脑管家', type: 'PC DESIGN · DESKTOP', year: '2025—2026', image: 'assets/images/project-xiaomi-pc.webp', tone: 'blue', featured: true, description: '围绕小米电脑管家 6.0 的整机体验优化，建立清晰、轻盈的桌面端产品体验。' },
    { id: 'dm-system', number: '02', title: 'DM 车辆数据管理', type: 'IOT · ENTERPRISE', year: '2022—2025', image: 'assets/images/project-dm-system.webp', tone: 'cyan', description: '面向车辆运维团队的数据管理平台，以实时监控与可视化分析降低业务复杂度。' },
    { id: 'davinci', number: '03', title: 'DAVINCI 控车 APP', type: 'MOBILITY · MOBILE', year: '2022—2025', image: 'assets/images/project-davinci-dc100.webp', tone: 'violet', description: '围绕智能电动摩托车的出行体验，打造从控车 App 到品牌感知的一体化设计。' },
    { id: 'dongao', number: '04', title: '东奥教育', type: 'EDUCATION · WEB', year: '2020—2022', image: 'assets/images/project-dongao.webp', tone: 'blue', description: '为职业教育场景构建官网与学习产品的统一视觉体验，让知识服务更清晰易用。' },
    { id: 'illustration', number: '05', title: '插画', type: 'ILLUSTRATION · KV', year: 'SELECTED', image: 'assets/images/project-illustration.webp', tone: 'lime', description: '以角色、色彩与叙事构成高识别度的活动主视觉与品牌插画表达。' },
  ],
  skills: [
    { icon: Sparkles, number: '01', title: 'AI × 创意', tags: ['AI 视觉探索', '创意生成', '设计提效'], copy: '把 AI 作为更敏捷的创作伙伴，在概念发散、视觉资产与动态内容中寻找新的表达路径。', image: 'assets/images/skill-ai-creative.webp' },
    { icon: Layers3, number: '02', title: '产品 × 系统', tags: ['Design System', 'UX Strategy', 'Multi-platform'], copy: '从需求到交付建立可延展的设计语言，让复杂产品在每一处触点保持一致与清晰。', image: 'assets/images/skill-product-system.webp' },
    { icon: PenTool, number: '03', title: '视觉 × 叙事', tags: ['Visual Direction', 'Motion', 'Brand'], copy: '以细节、节奏与情绪构建品牌记忆，让功能体验拥有更具辨识度的感知温度。', image: 'assets/images/skill-visual-story.webp' },
  ] as Array<{ icon: LucideIcon; number: string; title: string; tags: string[]; copy: string; image: string }>,
  copyright: '© 2026 SUN QI. ALL RIGHTS RESERVED.',
}
