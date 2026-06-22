# Architecture & Technology Stack

## Core Technologies
- **Build Tool**: Vite
- **Frontend Library**: React (SPA)
- **Styling**: Tailwind CSS with CSS custom properties (variables) for theme-switching support
- **Animations**: Framer Motion
- **Hosting**: Vercel

## System Data Architecture
All portfolio contents (projects, skills, resume details, and bio info) are isolated from rendering logic and stored under `src/data/` as static typed objects (e.g., TS files or JSON records). This facilitates clean updates.

## Component Layout Structure
```
+---------------------------------------------------+
|                  LNK OS Header                    |
+---------------------------------------------------+
|                                                   |
|             Terminal Shell / CLI Pane             |
|   (Interactive Input, Command Logs, UX Chips)     |
|                                                   |
+---------------------------------------------------+
|                                                   |
|             Content Render Pane / GUI             |
|   (Detailed showcase of selected command, e.g.     |
|    about details, project grids, contact forms)   |
|                                                   |
+---------------------------------------------------+
```

## User Experience Flow
1. **Boot Screen**: Speedy, realistic CLI system check (< 1.5s).
2. **Terminal Interface**: Command-focused input field with suggestions.
3. **Execution & Navigation**: Running a navigation command (e.g., `projects` or `skills`) scrolls the user smoothly to the corresponding detail block in the Content Render Pane.
4. **Interactive Chips**: Users can tap or click command chips to run them immediately without typing.