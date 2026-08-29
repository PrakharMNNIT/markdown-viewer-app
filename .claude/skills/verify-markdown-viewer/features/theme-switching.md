# Theme switching

Users pick a color theme from the theme picker dropdown in the toolbar.

## Sub-features

- `theme-open-picker` — opens theme list.
- `theme-select-dark` — switches to a dark variant (e.g. Default Dark).
- `theme-persist` — theme survives reload (localStorage).

## How to get to it (user POV)

- Click the theme picker trigger showing current theme name (e.g. "Default Light").
- Choose a theme from the dropdown list.

## Driving it with agent-browser

Preconditions:

- App loaded; theme picker `#theme-picker-trigger` visible.

- **Open picker.** Run `npx agent-browser click "#theme-picker-trigger"`. Dropdown `#theme-picker-dropdown` expands.
- **Select dark.** Run `npx agent-browser click "text=Default Dark"` or click the list item with that label. Trigger label updates to `Default Dark`.
- **Proof.** Run `npx agent-browser screenshot /opt/cursor/artifacts/verify-theme-default-dark.png`. Page uses dark background colors.

## Gotchas

- Theme CSS loads from `themes/*.css`; first switch may flash briefly — wait 500ms before screenshot.
- Custom themes require separate feature file if added later.
