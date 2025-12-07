# Mermaid Theme Architecture - Comprehensive Reference

**Last Updated:** 12/7/2025
**Source:** Official Mermaid.js theming documentation

## Complete Mermaid Theme Variables

### Core Global Variables

| Variable     | Type       | Description                  | Default                        |
| ------------ | ---------- | ---------------------------- | ------------------------------ |
| `background` | Background | Page background              | `#f4f4f4`                      |
| `fontFamily` | Text       | Font family                  | `trebuchet ms, verdana, arial` |
| `fontSize`   | Text       | Font size                    | `16px`                         |
| `darkMode`   | Boolean    | Affects color calculations   | `false`                        |
| `textColor`  | Text       | General text over background | calculated                     |
| `lineColor`  | Line       | Lines and connections        | calculated                     |
| `mainBkg`    | Background | Main background for objects  | calculated                     |

### Primary/Secondary/Tertiary Color Sets

Each set has 3 variables (background, text, border):

| Variable               | Type       | Description                |
| ---------------------- | ---------- | -------------------------- |
| `primaryColor`         | Background | Primary node background    |
| `primaryTextColor`     | Text       | Text in primary nodes      |
| `primaryBorderColor`   | Border     | Border for primary nodes   |
| `secondaryColor`       | Background | Secondary node background  |
| `secondaryTextColor`   | Text       | Text in secondary nodes    |
| `secondaryBorderColor` | Border     | Border for secondary nodes |
| `tertiaryColor`        | Background | Tertiary node background   |
| `tertiaryTextColor`    | Text       | Text in tertiary nodes     |
| `tertiaryBorderColor`  | Border     | Border for tertiary nodes  |

### Flowchart-Specific Variables

| Variable              | Type       | Description           |
| --------------------- | ---------- | --------------------- |
| `nodeBorder`          | Border     | Node border color     |
| `clusterBkg`          | Background | Subgraph background   |
| `clusterBorder`       | Border     | Subgraph border       |
| `defaultLinkColor`    | Line       | Link/edge color       |
| `titleColor`          | Text       | Title text color      |
| `edgeLabelBackground` | Background | Edge label background |
| `nodeTextColor`       | Text       | Text inside nodes     |

### Sequence Diagram Variables

| Variable                | Type       | Description           |
| ----------------------- | ---------- | --------------------- |
| `actorBkg`              | Background | Actor box background  |
| `actorBorder`           | Border     | Actor box border      |
| `actorTextColor`        | Text       | Actor text            |
| `actorLineColor`        | Line       | Actor lifeline        |
| `signalColor`           | Line       | Signal arrows         |
| `signalTextColor`       | Text       | Signal labels         |
| `labelBoxBkgColor`      | Background | Label box background  |
| `labelBoxBorderColor`   | Border     | Label box border      |
| `labelTextColor`        | Text       | Label text            |
| `loopTextColor`         | Text       | Loop text             |
| `activationBorderColor` | Border     | Activation border     |
| `activationBkgColor`    | Background | Activation background |
| `sequenceNumberColor`   | Text       | Sequence numbers      |

### Pie Chart Variables

| Variable              | Type       | Description                           |
| --------------------- | ---------- | ------------------------------------- |
| `pie1` - `pie12`      | Background | Fill colors for sections              |
| `pieTitleTextSize`    | Text       | Title font size (default: `25px`)     |
| `pieTitleTextColor`   | Text       | Title text color                      |
| `pieSectionTextSize`  | Text       | Section label size (default: `17px`)  |
| `pieSectionTextColor` | Text       | **Section label color (ON SLICES!)**  |
| `pieLegendTextSize`   | Text       | Legend font size (default: `17px`)    |
| `pieLegendTextColor`  | Text       | Legend text color                     |
| `pieStrokeColor`      | Border     | Slice borders (default: `black`)      |
| `pieStrokeWidth`      | Border     | Slice border width (default: `2px`)   |
| `pieOuterStrokeWidth` | Border     | Outer circle width (default: `2px`)   |
| `pieOuterStrokeColor` | Border     | Outer circle color (default: `black`) |
| `pieOpacity`          | Visual     | Slice opacity (default: `0.7`)        |

### State Diagram Variables

| Variable        | Type       | Description                |
| --------------- | ---------- | -------------------------- |
| `labelColor`    | Text       | State label color          |
| `altBackground` | Background | Composite state background |

### Class Diagram Variables

| Variable    | Type | Description      |
| ----------- | ---- | ---------------- |
| `classText` | Text | Class text color |

### User Journey Variables

| Variable                  | Type       | Description   |
| ------------------------- | ---------- | ------------- |
| `fillType0` - `fillType7` | Background | Section fills |

## Critical Insights

### 1. Pie Section Text Contrast Issue

**Problem:** `pieSectionTextColor` is text **ON** the colored pie slices!

- If slices are dark and text is dark → **UNREADABLE**
- If slices are light and text is light → **UNREADABLE**

**Solution:** `pieSectionTextColor` must contrast with `pie1-pie12` colors!

### 2. Background vs Text Variables

- **Background variables** (end with `Bkg`, `Color`, or are named `pie1-12`)
- **Text variables** (contain `Text` or `textColor`)
- **Border variables** (contain `Border` or `Stroke`)
- **Line variables** (contain `Line` or `lineColor`)

### 3. Calculated vs Explicit

- Mermaid **calculates** many colors if not provided
- But calculation may not match our theme aesthetics
- **We should set ALL critical variables explicitly**

## Implementation Strategy

### For Each Theme, Define

1. **Core Backgrounds** (3 levels for hierarchy)
   - `primaryColor`, `secondaryColor`, `tertiaryColor`

2. **All Text Colors** (must contrast with their backgrounds!)
   - `primaryTextColor`, `secondaryTextColor`, `tertiaryTextColor`
   - `nodeTextColor`, `actorTextColor`, `signalTextColor`
   - `pieTitleTextColor`, `pieSectionTextColor`, `pieLegendTextColor`

3. **All Border Colors** (visible against backgrounds)
   - `primaryBorderColor`, `secondaryBorderColor`, `tertiaryBorderColor`
   - `nodeBorder`, `actorBorder`, `clusterBorder`
   - `pieStrokeColor`, `pieOuterStrokeColor`

4. **Line/Connection Colors**
   - `lineColor`, `defaultLinkColor`
   - `signalColor`, `actorLineColor`

5. **Pie Slice Backgrounds** (12 distinct colors)
   - `pie1` through `pie12` - must be DISTINCT from text color!

## Architecture Pattern

```javascript
mermaid.initialize({
  theme: 'base',
  themeVariables: {
    // Core (affects ALL diagrams)
    background: bgPrimary,
    fontFamily: '...',
    fontSize: '16px',

    // Primary set (most nodes)
    primaryColor: [BACKGROUND],
    primaryTextColor: [TEXT - must contrast!],
    primaryBorderColor: [BORDER - visible],

    // Secondary set (clusters, special nodes)
    secondaryColor: [BACKGROUND],
    secondaryTextColor: [TEXT - must contrast!],
    secondaryBorderColor: [BORDER - visible],

    // Tertiary set (nested elements)
    tertiaryColor: [BACKGROUND],
    tertiaryTextColor: [TEXT - must contrast!],
    tertiaryBorderColor: [BORDER - visible],

    // Flowchart specific
    nodeBorder: [VISIBLE],
    nodeTextColor: [CONTRASTING],
    edgeLabelBackground: [BACKGROUND],

    // Sequence diagram specific
    actorBkg: [BACKGROUND],
    actorTextColor: [CONTRASTING],

    // Pie chart specific
    pie1-12: [12 DISTINCT COLORS],
    pieSectionTextColor: [CONTRASTS WITH pie1-12!],

    // Lines
    lineColor: [VISIBLE],
    signalColor: [VISIBLE],
  }
});
```

## Testing Checklist

- [ ] Flowchart - nodes, clusters, edges readable
- [ ] Sequence diagram - actors, signals, loops readable
- [ ] Pie chart - slices, percentages, legend readable
- [ ] State diagram - states, transitions readable
- [ ] Class diagram - classes, methods readable
- [ ] User journey - tasks, emotions readable

## References

- [Mermaid Theming Documentation](https://mermaid.js.org/config/theming.html)
- [Base Theme Source](https://github.com/mermaid-js/mermaid/blob/develop/packages/mermaid/src/themes/theme-base.js)
