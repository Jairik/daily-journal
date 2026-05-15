import { useEffect, useState } from "react";
import "./index.css";

import { TopBar } from "./components/TopBar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { Entry } from "./pages/Entry";
import { Profile } from "./pages/Profile";

export type Route = "home" | "signin" | "entry" | "profile";
export type Theme = "light" | "dark";

const THEME_KEY = "tracka.theme";

function parseRoute(hash: string): Route {
  const h = hash.replace(/^#\/?/, "").split("?")[0];
  switch (h) {
    case "signin":
      return "signin";
    case "entry":
      return "entry";
    case "profile":
      return "profile";
    default:
      return "home";
  }
}

export function navigate(route: Route) {
  const path = route === "home" ? "#/" : `#/${route}`;
  if (window.location.hash !== path) {
    window.location.hash = path;
  }
}

export function App() {
  const [route, setRoute] = useState<Route>(() =>
    parseRoute(window.location.hash),
  );
  const [theme, setTheme] = useState<Theme>(
    () =>
      (document.documentElement.getAttribute("data-theme") as Theme) || "light",
  );

  useEffect(() => {
    const onHash = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}
  }, [theme]);

  // Scroll to top whenever the route changes — feels less jarring.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [route]);

  return (
    <div className="shell">
      <TopBar route={route} theme={theme} onThemeChange={setTheme} />
      {route === "home" && <Home />}
      {route === "signin" && <SignIn />}
      {route === "entry" && <Entry />}
      {route === "profile" && <Profile />}
      <Footer />
    </div>
  );
}

export default App;
