# MiuNa Nails & Beauty Theme Update

## Overview
The theme has been completely updated to match the MiuNa Nails & Beauty brand identity, inspired by the logo featuring a light green four-leaf clover and the elegant black text styling from the menu.

## Color Palette Changes

### Primary Colors
- **Primary Green**: `#7FB069` - The signature light green from the four-leaf clover
- **Secondary Black**: `#1A1A1A` - Elegant black for text and accents
- **Accent White**: `#FFFFFF` - Clean white for contrast and backgrounds

### Color Scales
- **MiuNa Green Scale**: 50-900 shades of the brand green
- **Neutral Scale**: 50-900 shades of neutral grays for text and backgrounds

### Old vs New
- **Before**: Beige/pink color scheme (`#F8F2E9`, `#D8C293`)
- **After**: MiuNa green and neutral color scheme (`#7FB069`, `#1A1A1A`)

## Updated Files

### 1. CSS Variables (`client/src/index.css`)
- Updated root color variables to use new brand colors
- Changed primary from pink/beige to green (`120 30% 60%`)
- Changed secondary to black (`0 0% 10%`)
- Updated background to pure white (`0 0% 100%`)
- Updated foreground to dark black (`0 0% 10%`)

### 2. Tailwind Config (`tailwind.config.ts`)
- Added `miuna` color palette with 10 shades
- Added `neutral` color palette for text and backgrounds
- Removed old `beige` color palette

### 3. Constants (`client/src/lib/constants.ts`)
- Added `BRAND_COLORS` object with all brand colors
- Added `THEME` object with design constants
- Maintained existing `NO_IMAGE` constant

### 4. Component Updates (`client/src/pages/Box.tsx`)
- Updated service cards from `beige-*` to `miuna-*` colors
- Changed text colors from `beige-*` to `neutral-*` colors
- Updated pricing section colors to match new theme
- Maintained dark mode compatibility

### 5. New Theme Preview Component
- Created `ThemePreview.tsx` component to showcase new colors
- Added route `/theme-preview` to view the new theme
- Demonstrates all color scales and component examples

## Design Principles

### Brand Alignment
- **Green**: Represents the four-leaf clover, symbolizing luck and nature
- **Black**: Provides elegant contrast and readability
- **White**: Creates clean, spa-like aesthetic

### Accessibility
- High contrast ratios for text readability
- Consistent color usage across components
- Dark mode support maintained

### Consistency
- All UI components now use the new color system
- CSS variables ensure consistent theming
- Tailwind classes provide easy color application

## Usage Examples

### Primary Elements
```tsx
// Buttons
<Button className="bg-miuna-500 text-white hover:bg-miuna-600">
  Primary Action
</Button>

// Cards
<Card className="bg-gradient-to-br from-miuna-50 to-miuna-100 border-miuna-200">
  Content
</Card>

// Text
<h1 className="text-neutral-900">Title</h1>
<p className="text-neutral-600">Body text</p>
```

### Color Classes Available
- `bg-miuna-{50-900}` - Background colors
- `text-miuna-{50-900}` - Text colors
- `border-miuna-{50-900}` - Border colors
- `text-neutral-{50-900}` - Neutral text colors
- `bg-neutral-{50-900}` - Neutral background colors

## Benefits

1. **Brand Consistency**: Colors now match the MiuNa logo and menu
2. **Professional Appearance**: Elegant green and black create sophisticated look
3. **Better Readability**: Improved contrast ratios
4. **Scalable System**: 10-shade color scales for flexibility
5. **Maintainable**: Centralized color definitions in CSS variables

## Next Steps

1. **Test the new theme** by visiting `/theme-preview`
2. **Apply new colors** to remaining components if needed
3. **Update any hardcoded colors** found in other components
4. **Consider adding more brand-specific styling** (fonts, patterns, etc.)

## Preview
Visit `/theme-preview` in your application to see the complete new theme in action, including all color scales, component examples, and design patterns.
