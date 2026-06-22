# 💻 LNK OS — Interactive Developer Portfolio Terminal

**LNK OS** is a lightweight, responsive, and highly interactive web terminal-inspired developer portfolio designed for **Liyan Nechikaden** (B.Tech Computer Science & Engineering student at KMCT CEETM). 

Built to mimic a retro CLI environment, the project provides a terminal-first developer showcase without operating-system simulation bloat.

---

## 🚀 Key Features

* **Interactive Command Loop**: Fully functional command parser supporting commands like `about`, `projects`, `skills`, `resume`, `journey`, `contact`, `whoami`, `neofetch`, `theme`, `clear`, and `help`.
* **Ghost Autocomplete & Suggestions**: 
  - Sub-character *ghost text suggestions* rendered in 30% opacity directly under the block cursor as you type (e.g., typing `jour` suggests `ney` $\to$ `jour▮ney`).
  - Pressing `Tab` instantly completes the command in the input field.
* **Context-Aware Argument Auto-Completion**:
  - Arguments are autocompleted dynamically. E.g., typing `theme ub` + `Tab` completes immediately to `theme ubuntu`.
  - Pressing `Tab` on an option command like `theme ` lists available arguments (`theme mint`, `theme ubuntu`, `theme matrix`, `theme amber`) as clickable tokens.
* **Grouped Command Discovery**: Pressing `Tab` on a blank prompt displays available commands grouped cleanly into *Navigation*, *Profile*, and *System* panels.
* **Fuzzy Typo Corrections**: Generates intelligent suggestions if a typo is made (e.g. typing `projcts` outputs: *Did you mean: `[projects]`*).
* **Multi-Theme Engine**: Swaps accent glows and border tones instantly, persisting selection to `localStorage`. Includes:
  1. **Mint** (Default) — Clean green-and-slate Linux-inspired console.
  2. **Ubuntu** — Classic aubergine and orange terminal.
  3. **Matrix** — Cyberpunk green-glowing mainframe.
  4. **Amber CRT** — Nostalgic amber phosphors monitor.
* **Fast Diagnostic Boot Sequence**: Diagnostics log simulation complete within 1.0 - 1.2s, skippable instantly with the `Escape` key.
* **Mobile-Optimized Command Bar**: Clickable touchscreen buttons at the footer allowing mobile visitors to navigate easily.
* **Accessibility (a11y) Focus**: Integrated `role="log"` and `aria-live` announcements to ensure terminal logs are read dynamically by screen readers.

---

## 🛠️ Technology Stack

* **Core**: React 19, TypeScript, Vite
* **Styling**: Tailwind CSS v4 (CSS-first configuration)
* **Animations**: Framer Motion
* **Typography**: Fira Code Monospace (with true step-end blinking block caret)

---

## 📖 Command Dictionary

| Command | Action / Output |
| :--- | :--- |
| `help` | Prints the terminal command guide. |
| `about` | Prints biography and education summary. |
| `projects` | Renders developed software dossiers with clickable Live Demo anchors. |
| `skills` | Lists languages, backend, databases, and tool proficiencies. |
| `resume` / `cv` | Prints a complete CV summary and provides a download link to `resume.pdf`. |
| `journey` | Timelines chronological education, work, and leadership items. |
| `contact` | Displays secure contact links (GitHub, LinkedIn, Email). |
| `whoami` | Displays current visitor node identity details. |
| `neofetch` | Compiles a retro system overview and developer stats. |
| `theme <option>` | Lists themes or updates active theme style (`theme mint`/`ubuntu`/`matrix`/`amber`). |
| `home` | Resets the terminal back to the initial boot logs state. |
| `clear` | Clears the console output history log. |

---

## 💻 Local Setup & Development

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed.

### 2. Clone the Repository
```bash
git clone https://github.com/liyan-nk/lnk-OS.git
cd lnk-OS
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

### 5. Build for Production
```bash
npm run build
```
The compiled, production-ready static assets will be generated in the `/dist` directory.
