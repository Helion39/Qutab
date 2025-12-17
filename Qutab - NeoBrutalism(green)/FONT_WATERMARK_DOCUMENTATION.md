# Font Watermark Documentation

## Overview
The custom Korean fonts (Annyeong, Busan Garden, Gangnam, Hangeul Notes) are **demo/trial versions** from **Dita Type** (www.ditatype.com) with embedded watermarks. These watermarks appear when certain characters are rendered.

## Watermarked Characters

### 1. Numbers (0-9)
**All digits are watermarked:**
- `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`
- When rendered, these numbers display watermark text instead of the actual digits

### 2. Punctuation Marks
**The following punctuation characters are watermarked:**
- `.` (Period/Dot)
- `,` (Comma)
- `:` (Colon)
- `;` (Semicolon)
- `!` (Exclamation mark)
- `?` (Question mark)
- `/` (Forward slash) - appears in mixed language text
- `-` (Hyphen) - may be affected

### 3. Watermark Text Patterns Observed

When numbers and punctuation are rendered, they display the following watermark text:

#### English Watermarks:
- **"Dita"** - appears multiple times
- **"Pita"** - appears in body text
- **"TYPE"** - appears as watermark
- **"PERSONAL USE ONLY"** - licensing watermark
- **"WWW.DITATYPE.COM"** - website watermark
- **"DUTYDita"** - appears in text
- **"?ita"** - appears appended to text (likely from question mark + "ita")

#### Korean Watermarks:
- **"디새제"** - Korean watermark text

### 4. Affected Text Examples

Based on observations from the font test page:

1. **"Idul Adha 1445H"** - The numbers `1445` and possibly the `H` show watermarks
2. **"Qurban Tanpa Batas / 구르반 타나 바타스"** - The `/` (slash) shows watermark
3. **"Empowering local farmers / 지역 농부를 강화하면서"** - The `/` shows watermark
4. **"0123456789 !@#$%^&*()"** - All numbers and punctuation show watermarks
5. **"가나다 ABC 123"** - The numbers `123` show watermarks
6. **Body text with periods and commas** - All punctuation shows watermarks

### 5. Fonts Affected

All four custom Korean fonts have watermarks:
- ✅ **Annyeong** - Numbers and punctuation watermarked
- ✅ **Busan Garden** - Numbers and punctuation watermarked
- ✅ **Gangnam** - Numbers and punctuation watermarked
- ✅ **Hangeul Notes** - Numbers and punctuation watermarked

### 6. Characters NOT Affected

The following characters render correctly (no watermarks):
- ✅ Korean characters (가-힣) - All Hangeul characters work fine
- ✅ English letters (A-Z, a-z) - All Latin letters work fine
- ✅ Spaces - Work correctly
- ✅ Some special characters may work, but numbers and common punctuation are definitely watermarked

## Impact

### What This Means:
1. **Any text containing numbers** (dates, prices, quantities, etc.) will show watermarks
2. **Any text with punctuation** (periods, commas, colons, etc.) will show watermarks
3. **Mixed language text** with slashes (e.g., "English / Korean") will show watermarks on the slash
4. **URLs and email addresses** will show watermarks on dots and other punctuation

### Examples of Problematic Text:
- ❌ "Price: $99.99" - Numbers and dot will show watermarks
- ❌ "Date: 2024-12-16" - Numbers and hyphens will show watermarks
- ❌ "Visit www.example.com" - Dots will show watermarks
- ❌ "Call us at 123-456-7890" - Numbers and hyphens will show watermarks
- ❌ "Qurban Tanpa Batas / 구르반 타나 바타스" - Slash will show watermark
- ✅ "구르반 타나 바타스" - Pure Korean text works fine
- ✅ "Qurban Tanpa Batas" - Pure English letters work fine (but numbers/punctuation don't)

## Solutions

### Option 1: Purchase Commercial Licenses
- Visit: **www.ditatype.com**
- Purchase full commercial licenses for the fonts
- Replace current font files with licensed versions

### Option 2: Use Different Fonts
- Find alternative Korean fonts without watermarks
- Use system fonts or Google Fonts for Korean text

### Option 3: JavaScript Workaround (Complex)
- Wrap numbers and punctuation in spans
- Apply fallback font (Space Grotesk) to those spans
- Requires significant code changes

### Option 4: Accept Limitations
- Use fonts only for Korean text without numbers/punctuation
- Use fallback font for any text containing numbers or punctuation

## Recommendation

**Do NOT use these fonts in production** without purchasing proper licenses. The watermarks make them unsuitable for:
- E-commerce sites (prices, quantities)
- Forms (dates, phone numbers)
- Any content with numbers or punctuation
- Professional/commercial projects

## Font Source

- **Foundry:** Dita Type
- **Website:** www.ditatype.com
- **License Type:** Personal Use Only (Demo/Trial)
- **Watermark Protection:** Embedded in font glyphs for numbers and punctuation

---

*Document created: 2024-12-16*
*Based on visual inspection of font test page*


