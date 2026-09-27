# Design System

## 1. 设计主题

### 核心关键词

- Editorial Minimalism / 编辑式极简
- Builder / Indie Hacker 气质
- 高留白、低装饰
- 黑白灰主导
- 内容优先、图片作为证据
- 轻量品牌感，不依赖强视觉特效
- 接近个人博客、独立出版物、Notion 文档与产品 Landing Page 的混合形态

### 整体感受

页面不是传统 SaaS Landing Page 的“模块卡片 + 渐变 + 强 CTA”模式，而更接近一篇经过设计的长篇文章。

视觉重点来自三件事：

1. 大字号标题与明确的文字层级
2. 宽松的纵向节奏和大量空白
3. 截图、案例图等真实材料形成内容锚点

整体应保持安静、克制、可信。不要加入多余的渐变、玻璃拟态、强阴影或高饱和品牌色。

---

## 2. 视觉原则

### 2.1 内容先于容器

不要把每一段内容包进 Card。

默认结构：

```text
Section
├── Heading
├── Paragraph / Lead
├── Content
└── Image / Evidence
```

只有在确实需要区分“独立对象”时才使用容器。

### 2.2 留白承担分组职责

优先通过 spacing 表达层级，而不是通过边框、背景块和分割线。

推荐：

- section 间距：96–144px
- 标题到正文：24–32px
- 正文段落：16–24px
- 图片前后：32–56px

### 2.3 图片不是装饰，而是证据

页面中的图片主要用于证明：

- 社群真实存在
- 产品真实运行
- 项目真实获得反馈
- 知识库真实可用

因此图片应保持完整、清晰、克制，不做夸张裁切。

### 2.4 少量强调

页面主要依赖：

- 字号
- 字重
- 黑白反差
- 空间

而不是彩色标签、渐变文字、发光效果。

---

## 3. 页面结构

建议最大内容宽度：

```css
--layout-content: 760px;
--layout-wide: 1040px;
```

长文正文保持约 680–760px，可获得稳定阅读体验。

图片可以突破正文宽度，进入 `wide` 宽度，以制造节奏变化。

典型结构：

```text
Page
├── Header / Minimal Nav
├── Hero
│   ├── H1
│   ├── Subtitle / positioning
│   └── Lead paragraph
├── Story Section
├── Evidence Image
├── Content Section
├── Evidence Image Group
├── Feature / Capability Sections
├── Audience Section
└── Join / CTA Section
```

---

## 4. 色彩系统

整体采用 Neutral-first 策略。

### Background

- `#FFFFFF` — 主背景
- `#F7F7F5` — 极浅辅助背景
- `#F2F2EF` — hover / secondary surface

### Text

- `#171717` — 主文字
- `#3F3F3F` — 次级文字
- `#717171` — muted
- `#A3A3A3` — tertiary / metadata

### Border

- `rgba(23, 23, 23, 0.08)` — subtle
- `rgba(23, 23, 23, 0.14)` — default
- `rgba(23, 23, 23, 0.22)` — strong

### Accent

默认不设置高饱和品牌色。

交互强调继续使用黑色体系：

```text
primary   #171717
hover     #000000
inverse   #FFFFFF
```

如项目必须增加品牌色，仅用于链接、状态或极少数关键动作，覆盖面积应很小。

---

## 5. 字体系统

### 推荐字体栈

中文页面：

```css
font-family:
  Inter,
  ui-sans-serif,
  -apple-system,
  BlinkMacSystemFont,
  "SF Pro Display",
  "SF Pro Text",
  "PingFang SC",
  "Hiragino Sans GB",
  "Microsoft YaHei",
  Arial,
  sans-serif;
```

### Typography

#### Display / Hero

```text
Desktop: 56–64px
Mobile: 40–46px
Weight: 600–700
Line-height: 1.06–1.12
Letter-spacing: -0.035em
```

#### H2

```text
Desktop: 32–38px
Mobile: 28–32px
Weight: 600
Line-height: 1.2
Letter-spacing: -0.02em
```

#### H3

```text
20–24px
Weight: 600
Line-height: 1.35
```

#### Body

```text
17–18px
Weight: 400
Line-height: 1.75–1.9
```

中文长文必须保持偏高行高。

#### Small / Metadata

```text
13–14px
Line-height: 1.5
Color: muted
```

---

## 6. 间距系统

采用 4px 基础栅格，但主要使用宽松尺度。

```text
4   micro
8   compact
12  inline
16  standard
24  paragraph
32  group
48  block
64  section-small
96  section
128 section-large
160 hero-space
```

页面整体不应显得“紧凑”。

---

## 7. 圆角

视觉语言不是强 Card 化，因此圆角保持克制。

```text
6px   controls
10px  small surfaces
14px  media / modal
18px  large panel
999px pill only
```

普通正文内容不使用圆角容器。

---

## 8. 阴影

默认不用阴影。

需要浮层时只使用非常轻的自然阴影：

```css
box-shadow:
  0 1px 2px rgba(0, 0, 0, 0.04),
  0 8px 30px rgba(0, 0, 0, 0.06);
```

禁止：

- 大面积 glow
- 彩色 shadow
- 高强度 elevation

---

## 9. 图片规范

### 大图

```text
Border radius: 10–14px
Border: 1px solid subtle border
Background: #f7f7f5
```

图片周围应有足够的呼吸空间。

### Screenshot

对于界面截图：

- 保留完整 UI
- 不增加 mock device frame，除非内容本身需要
- 不增加夸张透视
- 不使用高饱和背景承托

### 多图

两张或多张截图可使用窄 gap 并列：

```text
gap: 12–20px
```

移动端改为单列。

---

## 10. Button

Primary Button：

```text
Background: near-black
Text: white
Height: 44–48px
Padding-inline: 18–22px
Radius: 8–10px
Font-weight: 500–600
```

Hover：

- 颜色略加深
- 可上移 1px
- 不增加 glow

Secondary Button：

```text
Background: transparent
Border: subtle
Text: primary
```

不要使用渐变 Button。

---

## 11. Link

正文链接保持接近文字，不要变成按钮。

推荐：

```text
color: currentColor
text-decoration: underline
underline-offset: 3px
```

hover 提高下划线对比度。

---

## 12. Section 模式

### Narrative Section

用于故事、背景和解释：

```text
H2
Paragraph
Paragraph
Image
```

### Evidence Section

用于展示真实结果：

```text
Image / Screenshot
Caption (optional)
```

caption 使用 muted small text。

### Feature Section

不建议使用传统三列 icon cards。

优先：

```text
H3
2–3 paragraphs / bullets
```

或者单列连续展示。

### CTA Section

CTA 可以适度收紧内容，形成页面结束感。

推荐：

```text
Title
Description
Price / core value
Primary action
Secondary explanation
```

允许使用浅灰背景或黑底白字，但不添加额外装饰。

---

## 13. 动效

动效不是页面重点。

### 推荐

```text
duration: 160–240ms
easing: cubic-bezier(.2,.8,.2,1)
```

可用在：

- button hover
- link opacity
- image hover
- modal / payment panel

### Scroll Reveal

如使用：

```text
opacity: 0 → 1
translateY: 8px → 0
duration: 450–600ms
```

幅度必须很小。

禁止：

- 大范围 parallax
- 复杂 3D
- 连续漂浮
- 大面积 stagger animation

---

## 14. Responsive

### Desktop

```text
page padding: 32–48px
content width: 720–760px
wide width: 960–1040px
section gap: 112–144px
```

### Tablet

```text
page padding: 28–32px
section gap: 88–112px
```

### Mobile

```text
page padding: 20px
section gap: 72–88px
body: 16–17px
hero: 40–46px
H2: 28–32px
```

移动端保持长文阅读感，不要把所有内容折叠成 Accordion。

---

## 15. Design Do / Don't

### Do

- 用 typography 建立重点
- 使用真实截图和案例
- 让大量空白参与构图
- 保持内容列窄而稳定
- 控制颜色数量
- 使用弱边框和弱背景
- 保持组件简单

### Don't

- 不要每个 section 都做 card
- 不要使用蓝紫渐变作为默认科技感
- 不要使用玻璃拟态
- 不要使用巨大 box-shadow
- 不要堆 icon
- 不要过度使用 badge
- 不要用复杂装饰抢内容注意力
- 不要把页面做成典型模板化 SaaS 官网

---
