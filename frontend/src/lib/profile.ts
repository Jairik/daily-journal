/**
 * User profile + daily-prompt derivation.
 *
 * For the skeleton the profile is a static fixture; eventually it'll come
 * from the Go backend / auth. The `buildPrompts` function takes that
 * profile and produces the day's guided questions so the entry page is
 * personalised without hard-coding strings in the UI.
 */

export type TimeOfDay = "morning" | "evening";

export type Profile = {
  name: string;
  handle: string;
  /** A short verb-phrase the user wrote when they set up Tracka — e.g. "stay present". */
  intent: string;
  /** Areas of life the user wants to track — drives the rotating focus prompt. */
  focusAreas: string[];
  /** Which side of the day they journal on. */
  rhythm: TimeOfDay;
};

export const DEFAULT_PROFILE: Profile = {
  name: "Jairik",
  handle: "@quiet.studio",
  intent: "stay present",
  focusAreas: ["writing", "long walks", "mornings"],
  rhythm: "morning",
};

/** A prompt fragment — plain text, or an italicised user-derived phrase. */
export type PromptPart = { kind: "text"; value: string } | { kind: "em"; value: string };

export type Question = {
  id: string;
  parts: PromptPart[];
  hint?: string;
  placeholder: string;
};

const t = (value: string): PromptPart => ({ kind: "text", value });
const em = (value: string): PromptPart => ({ kind: "em", value });

/** Pick a focus area for today — rotates daily so the same area doesn't dominate. */
function focusForDate(areas: string[], date: Date): string {
  if (!areas.length) return "what's on your mind";
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24),
  );
  return areas[dayOfYear % areas.length];
}

export function buildPrompts(profile: Profile, today: Date = new Date()): Question[] {
  const greeting = profile.rhythm === "evening" ? "Good evening" : "Good morning";
  const todayFocus = focusForDate(profile.focusAreas, today);
  const reflection =
    profile.rhythm === "evening"
      ? "Looking back at today, what's worth keeping?"
      : "What does today already feel like?";

  return [
    {
      id: "weather",
      parts: [t(`${greeting}, ${profile.name}. ${reflection}`)],
      hint: "A mood, a weather, a single colour — whatever shows up first.",
      placeholder: "Today feels…",
    },
    {
      id: "carry",
      parts: [t("What are you carrying into the page?")],
      hint: "Anything still tugging at your attention from yesterday or earlier today.",
      placeholder: "Still on my mind…",
    },
    {
      id: "intent",
      parts: [
        t("You wanted to "),
        em(profile.intent),
        t(". What's one small step today?"),
      ],
      hint: "Something the size of an hour, not a year.",
      placeholder: "A small step might be…",
    },
    {
      id: "focus",
      parts: [
        t("On "),
        em(todayFocus),
        t(" — anything you've noticed lately?"),
      ],
      hint: "Doesn't need to be a thought yet. Notice the noticing.",
      placeholder: "I've noticed…",
    },
    {
      id: "remember",
      parts: [t("One sentence you'd want to remember from today?")],
      hint: "Write it like you're handing it to your future self.",
      placeholder: "A note for later…",
    },
  ];
}

/** Flatten a prompt's parts to a plain string (used for summaries / a11y). */
export function promptToString(q: Question): string {
  return q.parts.map((p) => p.value).join("");
}
