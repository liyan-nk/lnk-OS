# Engineering Decisions

### Decision 1: Use React
- **Reason**: Fast development and large ecosystem.

---

### Decision 2: Use Vite
- **Reason**: Vite provides a highly optimized, fast build cycle and lightweight development environment for single-page applications compared to older build tools.

---

### Decision 3: Use Tailwind CSS
- **Reason**: Rapid UI development and utility-first styling consistency.

---

### Decision 4: Terminal Inspired UI
- **Reason**: Memorable, interactive, and unique developer showcase.

---

### Decision 5: Avoid Full OS Simulation
- **Reason**: A full desktop/window manager simulation adds excessive UX friction and development complexity without adding corresponding portfolio value.

---

### Decision 6: Structured Portfolio Data
- **Reason**: Decoupling content from visual/rendering components by storing data inside `src/data/` (JSON or TypeScript objects) ensures clean code maintenance and easy updates.

---

### Decision 7: Constrained Initial Boot Sequence
- **Reason**: The boot screen must feel authentic but be strictly capped between 1.0 and 1.2 seconds on every fresh page load to prevent recruiter fatigue while establishing thematic entry, with ESC/click skip options.

---

### Decision 8: Mobile Clickable Command Chips
- **Reason**: Maximizes usability on mobile touchscreens where physical keyboards are absent and virtual typing is slow.

---

### Decision 9: Terminal-to-Content Layout Flow
- **Reason**: The terminal serves as the active navigation input hub, while detailed text/media content is rendered in clean, structured sections underneath to prioritize reading.

---

### Decision 10: CSS Variable Theme Styling
- **Reason**: Prepares the codebase for Version 2 multi-distro theme support by routing Tailwind colors to CSS Custom Properties under a dynamic `data-theme` attribute.