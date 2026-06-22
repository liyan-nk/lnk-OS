# LNK OS: UX & Interaction Design Specification
*Version 1.0 — Architecture and Design Blueprint*

This document serves as the official UX Specification and architectural design guide for **LNK OS**, an interactive developer portfolio website designed to simulate a modern Linux terminal shell.

---

## 1. Core User Experience Philosophy
LNK OS bridges command-line nostalgia with clean web accessibility. To make the interface engaging yet highly functional for recruiters, the design adheres to three core tenets:
1. **Frictionless Navigation**: The terminal shell acts as a novelty input mechanism, but it must never block the user from accessing portfolio details. If typing fails, clicking/tapping must succeed.
2. **Speed & Snappiness**: Transitions, mock boot times, and typewriters must be fast. Recruiter attention spans are short; feedback must be near-instantaneous.
3. **Immersive Aesthetics**: The interface should capture the charm of a retro-modern CLI, complete with monospaced typography, scanning line overlays, custom prompt layouts, and terminal-inspired colorways.

---

## 2. Desktop Experience
The desktop layout maximizes space while preserving the mock desktop/terminal emulator aesthetic:
- **Terminal Header**: Displays mock tabs (e.g., `bash`, `neofetch`) and system information (local time, active session info).
- **Console Focus**: Clicking anywhere inside the main body of the terminal page automatically focuses the active command input line.
- **Command Suggestions**: Ghost-text autocompletion appears as the user types (e.g., typing `pr` shows `ojects` in a muted opacity).
- **Interactive Pane**: The terminal occupies the upper viewport, serving as the dashboard. Content is pushed to clean sections below, maintaining a structural grid.

---

## 3. Mobile Experience
A pure CLI on mobile is a major usability barrier. LNK OS adapts with a hybrid design:
- **Virtual Input Adaptability**: Standard text fields trigger native keyboards, which can obscure layout elements. The viewport dynamically adjusts (`100dvh`) to prevent layout breaking.
- **Clickable Command Chips**: A row of persistent touch buttons (chips) representing primary commands is located directly below the active terminal input line. Tapping a chip automatically writes and executes that command.
- **Mobile GUI Sections**: Detailed sections (projects, contact, resume) display content in stackable single-column cards with large touch targets.

---

## 4. Boot Sequence Behavior
The initial load simulates a Linux kernel boot sequence to set the atmosphere:
- **Duration**: Constrained strictly to **1.0 to 1.2 seconds** total.
- **Visuals**: Rapid lines of system logs (e.g., `Mounting file system... OK`, `Loading Liyan's portfolio... OK`, `Initializing shell... OK`) followed by a vertical screen sweep clearing animation.
- **Bypass (Skip)**: A small `[Press ESC to skip]` button in the top-right corner bypasses the sequence immediately.
- **State Persistence**: The boot sequence runs on every fresh page load (no `sessionStorage` or cache bypass) to guarantee that every visitor experiences the thematic introduction.

---

## 5. Terminal Behavior
The shell behaves like a simplified Unix bash console:
- **Input Line**: Features a custom prompt symbol (e.g., `visitor@lnk-os:~$ `) followed by the input caret.
- **Output Buffer**: Shows the scroll history of commands run in the active session. If the history grows, the terminal container automatically scrolls to the bottom.
- **Input History**: Pressing `Up Arrow` and `Down Arrow` cycles through previously entered command strings.
- **Command Auto-Completion**: Pressing `Tab` auto-completes unique command names.
- **Shell Commands**:
  - `help`: Lists all available commands with a brief description.
  - `about`: Prints biography/intro summary.
  - `projects`: Triggers project section focus.
  - `skills`: Triggers technical skill inventory view.
  - `resume`: Provides a link to download the PDF resume and shows highlights.
  - `contact`: Focuses the terminal email or contact section.
  - `clear`: Empties the command buffer.
- **Error Handling**: Invalid inputs print `Command not found. Type 'help' for options.` in red/accent warning color.

---

## 6. Command System Design
To support modularity and easy expansion:
- **Command Registry**: Commands are mapped inside a central dictionary.
- **Command Handler Schema**: Each command module defines:
  - `command`: The input string (key).
  - `description`: Text shown in the `help` prompt.
  - `execute(args)`: Function that runs custom logic and returns a styled React element to render in the buffer.
- This registry pattern separates execution logic from terminal render blocks.

---

## 7. Navigation Flow
Terminal execution triggers smooth navigation flows:
1. When a user runs a navigation command (e.g., `projects` or `skills`), the command buffer appends the success message.
2. An automatic smooth scroll (via JS/CSS) brings the Content Render Pane into viewport view.
3. Content panels include "Back to Terminal" floating chips in the bottom corner to quickly snap the viewport back to the command input prompt.

```
       [Boot Screen]
             │
             ▼
     [Terminal Shell] ◄──────────────────────┐
             │                               │
    (Input Command / Chip)                   │
             │                               │
             ▼                               │
   (Smooth Viewport Scroll)                  │
             │                               │
             ▼                               │
  [Content Pane (GUI Section)] ──────[Back to Terminal]
```

---

## 8. Animation System
Animations are handled by Framer Motion for high performance:
- **Blinking Caret**: The typing cursor flashes at a rate of `1s` (`ease-in-out` opacity between `0.2` and `1.0`).
- **Typewriter Effect**: Outputs are printed character-by-character at a rapid pace of `15ms` per character. Long text outputs bypass this effect to prevent UX delays.
- **Section Scroll**: Smooth ease-in-out viewport transitions over `600ms`.
- **Card Reveal**: Fade-in and slide-up animations (`y: 20` to `y: 0`, duration `0.4s`) as grid elements scroll into viewport.

---

## 9. Theme System
Theme configuration is fully abstracted for scalability:
- **CSS Custom Properties**: Color tokens are declared on root:
  ```css
  :root[data-theme="matrix"] {
    --bg-color: #0d0e15;
    --text-primary: #00ff66;
    --text-muted: #005a24;
    --border-color: #1b3024;
    --accent-color: #39ff14;
    --font-mono: 'Fira Code', monospace;
  }
  ```
- **Tailwind Config**: Maps standard classes back to these variables:
  ```javascript
  colors: {
    bg: 'var(--bg-color)',
    terminal: 'var(--text-primary)',
    muted: 'var(--text-muted)',
    border: 'var(--border-color)',
    accent: 'var(--accent-color)'
  }
  ```
- **V2 Themes Planned**:
  - `matrix` (Classic Terminal Green)
  - `ubuntu` (Aubergine and Orange)
  - `dracula` (Dark Purple and Pastel Pink)
  - `classic-light` (Retro white-paper CRT)

---

## 10. Layout Structure
LNK OS follows a two-tier structural layout:
1. **The Console Tier (CLI)**:
   - Fixed height or high prominence on landing (`75vh` to `100vh` initial view).
   - Simulates terminal app chrome.
2. **The Display Tier (GUI)**:
   - Positioned below the console.
   - Houses high-fidelity, styled portfolios blocks.
   - Automatically populated/revealed upon CLI command execution.

---

## 11. Accessibility Considerations
CLI simulators can pose significant barriers to screen readers and keyboard users:
- **Screen Reader Announcements**: Output buffers utilize `aria-live="polite"` so screen readers speak terminal outputs as they print.
- **Semantic DOM**: Hidden semantic tags (`<h1>`, `<nav>`, `<section>`) back the presentation layout to provide a clear document outline.
- **Visual Switch**: A prominent toggle button in the utility header swaps the entire page into a standard, clean text portfolio layout (Classic GUI Portfolio mode) for screen-reader efficiency.

---

## 12. Folder Structure
To align with Vite, React, and modular command patterns, the project folder structure is specified as:
```
c:/Users/lnk/Documents/LNK OS/
├── brain/                   # Project memory, ADRs, and specs
├── public/                  # Static assets (fonts, pdf resume, favicon)
├── src/
│   ├── assets/              # Icons and raw graphics
│   ├── components/          # Reusable UI parts
│   │   ├── terminal/        # Shell, input, prompt, output components
│   │   ├── gui/             # About, Projects, Contact section containers
│   │   └── common/          # Button, Card, ThemeToggle, Header components
│   ├── data/                # Static portfolio content (about.ts, projects.ts)
│   ├── hooks/               # Custom React hooks (useTerminal.ts)
│   ├── styles/              # Global styles & Tailwind entry (index.css)
│   ├── utils/               # Command handlers and parser (commandRegistry.ts)
│   ├── App.tsx              # Application layout assembler
│   └── main.tsx             # Entry point mount
├── index.html               # Vite HTML template
├── package.json             # NPM dependencies & scripts
├── tailwind.config.js       # Tailwind configuration file
└── vite.config.ts           # Vite configuration file
```

---

## 13. Future Expansion Opportunities
- **Git Command Integration**: Allow developers/visitors to run `git status` or `git log` to see recent commits pushed directly to the portfolio's GitHub repo.
- **Embedded Easter Egg Games**: Simple retro terminal games (e.g., `play snake`, `play tic-tac-toe`) rendered directly in the terminal output buffer.
- **Neofetch Integration**: The `neofetch` command prints a beautifully formatted summary of Liyan's specs, tools, and visual profile logo in ASCII art.
