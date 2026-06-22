# UI Patterns & Interaction Standards

## CLI Shell Interface
- **Primary Input**: Interactive command prompt using a custom text field that mimics a terminal cursor.
- **Blinking Cursor**: Monospace caret animation (`50% opacity` blinking at a `1s` cycle).
- **Typewriter Effect**: Used for terminal messages and output responses. Speed is calibrated to complete text output rapidly (approx. `15-20ms` per character) to preserve usability.
- **Command History**: Pressing `Up Arrow` or `Down Arrow` scrolls through previously executed commands in the current session.
- **Auto-Completion**: Pressing `Tab` fills in the command suggestion when matching unique prefixes.

## Interactive Navigation & Mobile Chips
- **Command Chips**: To assist mobile readers and desktop clicks, a row of key action items (`help`, `about`, `projects`, `skills`, `resume`, `contact`) are rendered as inline styled buttons directly underneath the terminal input prompt.
- **Interactions**: Clicking a chip simulates entering that command in the console and triggers execution.
- **Smooth Scroll Transitions**: Executing content commands smooth-scrolls the viewpoint down to the Content Render Pane using CSS `scroll-behavior: smooth`.

## Themes & Custom Properties
- All color styles (background, terminal green/text, borders, selection highlights) are bound to CSS variables (e.g. `--color-bg`, `--color-terminal`, `--color-accent`) defined in `index.css`.
- The Tailwind configuration imports these custom variables to enable instant palette adjustments using the `data-theme` attribute on the DOM.

## Boot Sequence Constraint
- **Duration**: Strictly between `1.0 and 1.2 seconds` total (runs on every fresh page load).
- **Content**: Simulate brief system checks, mounting file systems, and launching LNK OS, followed by a screen-clearing animation that exposes the prompt.
- **Skip Control**: A tiny "Skip Intro" option is positioned in the corner (or ESC key press) for immediate bypass.