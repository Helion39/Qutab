# Font Documentation - Qutab NeoBrutalism Project

**Last Updated:** 2024  
**Purpose:** Comprehensive documentation of all fonts used in the project, including current implementation and available custom fonts.

---

## 📋 Table of Contents

1. [Current Font Implementation](#current-font-implementation)
2. [Available Custom Fonts](#available-custom-fonts)
3. [Font Usage Analysis](#font-usage-analysis)
4. [Font File Locations](#font-file-locations)
5. [Implementation Status](#implementation-status)
6. [Recommended Next Steps](#recommended-next-steps)

---

## 🎨 Current Font Implementation

### **Space Grotesk** (Primary Font)

**Status:** ✅ Currently Active  
**Source:** Google Fonts (CDN)  
**Location:** `src/styles/globals.css` and `src/index.css`

#### Implementation Details:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
```

**Applied to:**
- Body text: `font-family: 'Space Grotesk', sans-serif;`
- All default typography elements (h1, h2, h3, h4, labels, buttons, inputs)

#### Available Weights:
- **300** - Light
- **400** - Normal (Regular)
- **500** - Medium
- **600** - Semibold
- **700** - Bold

#### Usage in Codebase:
- **Primary font** for all body text and default elements
- Used via Tailwind CSS classes: `font-medium`, `font-bold`, `font-black`
- Applied globally in `body` selector
- Font smoothing enabled: `-webkit-font-smoothing: antialiased`

#### Font Weight Variables:
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-black: 900;
```

#### Current Usage Patterns:
1. **Headings:** `font-black` (900 weight) - Used extensively for large headings
2. **Body Text:** `font-medium` (500) - Used for paragraphs and descriptions
3. **Buttons:** `font-bold` (700) - Used for CTA buttons and labels
4. **Labels:** `font-medium` (500) - Used for form labels

---

### **Material Symbols Outlined** (Icon Font)

**Status:** ✅ Currently Active  
**Source:** Google Fonts (CDN)  
**Location:** `src/styles/globals.css` and `src/index.css`

#### Implementation Details:
```css
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
```

**Usage:**
- Icon system via `MaterialIcon` component
- Supports filled and outlined variants
- Variable font with weight and fill controls

#### Font Variation Settings:
```css
font-variation-settings:
  'FILL' 0,      /* 0 = outlined, 1 = filled */
  'wght' 400,    /* Weight: 100-700 */
  'GRAD' 0,      /* Grade */
  'opsz' 24      /* Optical size */
```

---

## 🎯 Available Custom Fonts

### **Status:** ⚠️ Files Present, Not Yet Implemented

All custom fonts are located in: `src/assets/fonts/`

### 1. **Annyeong**
- **Files:**
  - `Annyeong.otf` (Original OpenType)
  - `Annyeong.woff2` (Web-optimized format)
- **Format:** Korean/Hangeul font
- **Status:** Ready for implementation
- **Recommended Use:** Korean text, headings, decorative elements

### 2. **Busan Garden**
- **Files:**
  - `Busan Garden.otf` (Original OpenType)
  - `Busan Garden.woff2` (Web-optimized format)
- **Format:** Korean/Hangeul font
- **Status:** Ready for implementation
- **Recommended Use:** Korean text, body text, elegant typography

### 3. **Gangnam**
- **Files:**
  - `Gangnam.otf` (Original OpenType)
  - `Gangnam.woff2` (Web-optimized format)
- **Format:** Korean/Hangeul font
- **Status:** Ready for implementation
- **Recommended Use:** Korean text, modern headings, bold statements

### 4. **Hangeul Notes**
- **Files:**
  - `Hangeul Notes.otf` (Original OpenType)
  - `Hangeul Notes.woff2` (Web-optimized format)
- **Format:** Korean/Hangeul font
- **Status:** Ready for implementation
- **Recommended Use:** Korean text, handwritten style, casual typography

---

## 📊 Font Usage Analysis

### Current Typography Patterns in Components:

#### **Hero Component** (`src/components/Hero.tsx`)
- **Main Heading:** `text-6xl lg:text-8xl font-black` (Space Grotesk, 900 weight)
- **Subheading:** `text-lg lg:text-xl font-medium` (Space Grotesk, 500 weight)
- **Buttons:** `text-lg font-bold` (Space Grotesk, 700 weight)
- **Countdown Numbers:** `text-2xl md:text-4xl font-black` (Space Grotesk, 900 weight)
- **Countdown Labels:** `text-[10px] md:text-xs font-bold` (Space Grotesk, 700 weight)

#### **Benefits Component** (`src/components/Benefits.tsx`)
- **Section Heading:** `text-6xl md:text-8xl font-black` (Space Grotesk, 900 weight)
- **Card Titles:** `text-4xl md:text-5xl font-black` (Space Grotesk, 900 weight)
- **Card Descriptions:** `text-lg font-medium` (Space Grotesk, 500 weight)
- **Badges:** `text-sm font-bold` (Space Grotesk, 700 weight)

#### **ProductsPreview Component** (`src/components/ProductsPreview.tsx`)
- **Section Heading:** `text-5xl md:text-6xl font-black` (Space Grotesk, 900 weight)
- **Product Titles:** `text-2xl font-black` (Space Grotesk, 900 weight)
- **Prices:** `text-3xl font-black` (Space Grotesk, 900 weight)
- **Descriptions:** `text-sm font-medium` (Space Grotesk, 500 weight)

#### **Navbar Component** (`src/components/Navbar.tsx`)
- **Logo Text:** `text-base md:text-xl font-bold` (Space Grotesk, 700 weight)
- **Navigation Links:** `text-sm font-bold` (Space Grotesk, 700 weight)

### Typography Scale:
```css
--text-xs: 0.75rem      (12px)
--text-sm: 0.875rem     (14px)
--text-base: 1rem       (16px)
--text-lg: 1.125rem     (18px)
--text-xl: 1.25rem      (20px)
--text-2xl: 1.5rem       (24px)
--text-3xl: 1.875rem     (30px)
--text-4xl: 2.25rem      (36px)
--text-5xl: 3rem         (48px)
--text-6xl: 3.75rem      (60px)
--text-7xl: 4.5rem       (72px)
--text-8xl: 6rem         (96px)
```

### Font Weight Usage:
- **font-black (900):** Used for all major headings, large text, emphasis
- **font-bold (700):** Used for buttons, labels, navigation, badges
- **font-medium (500):** Used for body text, descriptions, paragraphs
- **font-normal (400):** Used for input fields

---

## 📁 Font File Locations

### Current Implementation:
```
src/
├── styles/
│   └── globals.css          # Space Grotesk import & body font
└── index.css                # Space Grotesk import & Tailwind config
```

### Available Custom Fonts:
```
src/assets/fonts/
├── Annyeong.otf
├── Annyeong.woff2
├── Busan Garden.otf
├── Busan Garden.woff2
├── Gangnam.otf
├── Gangnam.woff2
├── Hangeul Notes.otf
└── Hangeul Notes.woff2
```

---

## ⚙️ Implementation Status

### ✅ Completed:
- [x] Space Grotesk font loaded and active
- [x] Material Symbols icon font loaded and active
- [x] Font weight variables defined
- [x] Typography scale configured
- [x] WOFF2 files converted and ready

### ⚠️ Pending:
- [ ] Custom fonts (Annyeong, Busan Garden, Gangnam, Hangeul Notes) not yet implemented
- [ ] No `@font-face` declarations for custom fonts
- [ ] No Tailwind CSS configuration for custom fonts
- [ ] No font preloading for custom fonts

---

## 🚀 Recommended Next Steps

### 1. **Add @font-face Declarations**

Add to `src/styles/globals.css` (after Google Fonts imports):

```css
/* Custom Korean Fonts */
@font-face {
  font-family: 'Annyeong';
  src: url('/src/assets/fonts/Annyeong.woff2') format('woff2'),
       url('/src/assets/fonts/Annyeong.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Busan Garden';
  src: url('/src/assets/fonts/Busan Garden.woff2') format('woff2'),
       url('/src/assets/fonts/Busan Garden.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Gangnam';
  src: url('/src/assets/fonts/Gangnam.woff2') format('woff2'),
       url('/src/assets/fonts/Gangnam.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Hangeul Notes';
  src: url('/src/assets/fonts/Hangeul Notes.woff2') format('woff2'),
       url('/src/assets/fonts/Hangeul Notes.otf') format('opentype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### 2. **Configure Tailwind CSS** (if using Tailwind config file)

Add custom fonts to Tailwind configuration:

```js
// tailwind.config.js (if exists)
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'annyeong': ['Annyeong', 'sans-serif'],
        'busan-garden': ['Busan Garden', 'sans-serif'],
        'gangnam': ['Gangnam', 'sans-serif'],
        'hangeul-notes': ['Hangeul Notes', 'sans-serif'],
      }
    }
  }
}
```

### 3. **Add CSS Variables** (Optional)

Add to `:root` in `globals.css`:

```css
:root {
  /* ... existing variables ... */
  --font-annyeong: 'Annyeong', sans-serif;
  --font-busan-garden: 'Busan Garden', sans-serif;
  --font-gangnam: 'Gangnam', sans-serif;
  --font-hangeul-notes: 'Hangeul Notes', sans-serif;
}
```

### 4. **Preload Critical Fonts** (Performance Optimization)

Add to `index.html`:

```html
<link rel="preload" href="/src/assets/fonts/Annyeong.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/src/assets/fonts/Busan Garden.woff2" as="font" type="font/woff2" crossorigin>
```

### 5. **Test Font Rendering**

- Test in Chrome, Firefox, Safari, Edge
- Test on mobile devices (iOS Safari, Chrome Android)
- Verify Korean/Hangeul character rendering
- Check font loading performance

---

## 📝 Usage Examples

### Using Custom Fonts in Components:

#### **Via CSS:**
```css
.korean-heading {
  font-family: 'Gangnam', sans-serif;
  font-weight: normal;
}
```

#### **Via Tailwind Classes** (after config):
```jsx
<h1 className="font-gangnam text-4xl">한국어 제목</h1>
<p className="font-busan-garden text-lg">한국어 본문</p>
```

#### **Via Inline Styles:**
```jsx
<h1 style={{ fontFamily: "'Gangnam', sans-serif" }}>
  Korean Text
</h1>
```

---

## 🔍 Font Characteristics

### Space Grotesk (Current):
- **Style:** Modern, geometric sans-serif
- **Best For:** Body text, UI elements, headings
- **Language Support:** Latin characters, numbers, symbols
- **Personality:** Clean, professional, modern

### Custom Korean Fonts:
- **Style:** Various (handwritten, modern, decorative)
- **Best For:** Korean/Hangeul text, cultural elements
- **Language Support:** Korean characters (Hangeul), Latin characters
- **Personality:** Cultural, expressive, unique

---

## ⚠️ Important Notes

1. **Font Licensing:** Verify that all custom fonts have appropriate licenses for web use
2. **File Size:** WOFF2 files are optimized, but monitor total font bundle size
3. **Fallback Fonts:** Always include fallback fonts (sans-serif) in font-family declarations
4. **Performance:** Consider font subsetting if only specific characters are needed
5. **Loading Strategy:** Use `font-display: swap` to prevent invisible text during font load

---

## 📚 References

- **Space Grotesk:** [Google Fonts](https://fonts.google.com/specimen/Space+Grotesk)
- **Material Symbols:** [Google Fonts](https://fonts.google.com/icons)
- **WOFF2 Format:** Web Open Font Format 2.0 specification
- **Font Display:** [MDN - font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display)

---

**Document Created:** 2024  
**Maintained By:** Development Team  
**For:** Qutab - NeoBrutalism Project

