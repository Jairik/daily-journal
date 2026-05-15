import type { Route, Theme } from "../App";

type Props = {
  route: Route;
  theme: Theme;
  onThemeChange: (t: Theme) => void;
};

const NAV: { label: string; route: Route }[] = [
  { label: "Entry", route: "entry" },
  { label: "Profile", route: "profile" },
];

export function TopBar({ route, theme, onThemeChange }: Props) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#/" aria-label="Tracka home">
          <span className="brand-mark" aria-hidden="true" />
          <span>Tracka</span>
        </a>

        <nav className="topnav" aria-label="Primary">
          {NAV.map((n) => (
            <a
              key={n.route}
              className="navlink"
              href={`#/${n.route}`}
              aria-current={route === n.route ? "page" : undefined}
            >
              {n.label}
            </a>
          ))}
          <ThemeToggle theme={theme} onChange={onThemeChange} />
        </nav>
      </div>
    </header>
  );
}

function ThemeToggle({
  theme,
  onChange,
}: {
  theme: Theme;
  onChange: (t: Theme) => void;
}) {
  return (
    <div
      className="theme-toggle"
      role="group"
      aria-label="Color theme"
      style={{ marginLeft: 8 }}
    >
      <button
        type="button"
        aria-label="Use light theme"
        aria-pressed={theme === "light"}
        onClick={() => onChange("light")}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        aria-label="Use dark theme"
        aria-pressed={theme === "dark"}
        onClick={() => onChange("dark")}
      >
        <MoonIcon />
      </button>
    </div>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.5 14.5A8 8 0 0 1 9.5 3.5a.5.5 0 0 0-.7-.6 9 9 0 1 0 12.3 12.3.5.5 0 0 0-.6-.7Z" />
    </svg>
  );
}
