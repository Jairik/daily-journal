import { useEffect, useMemo, useRef, useState } from "react";
import {
  buildPrompts,
  DEFAULT_PROFILE,
  promptToString,
  type Question,
} from "../lib/profile";
import { navigate } from "../App";

type Answers = Record<string, string>;

type DailyEntry = {
  date: string;
  answers: Answers;
  completed: boolean;
  updatedAt: number;
};

function todayKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function storageKey(date: string) {
  return `tracka.daily.${date}`;
}

function loadEntry(date: string): DailyEntry {
  try {
    const raw = localStorage.getItem(storageKey(date));
    if (raw) return JSON.parse(raw) as DailyEntry;
  } catch {}
  return { date, answers: {}, completed: false, updatedAt: Date.now() };
}

function saveEntry(entry: DailyEntry) {
  try {
    localStorage.setItem(storageKey(entry.date), JSON.stringify(entry));
  } catch {}
}

function autoResize(el: HTMLTextAreaElement | null) {
  if (!el) return;
  el.style.height = "auto";
  el.style.height = Math.max(el.scrollHeight, 240) + "px";
}

function PromptText({ q }: { q: Question }) {
  return (
    <>
      {q.parts.map((p, i) =>
        p.kind === "em" ? <em key={i}>{p.value}</em> : <span key={i}>{p.value}</span>,
      )}
    </>
  );
}

export function Entry() {
  const profile = DEFAULT_PROFILE;
  const today = useMemo(() => new Date(), []);
  const dateKey = useMemo(() => todayKey(today), [today]);
  const questions = useMemo(() => buildPrompts(profile, today), [profile, today]);

  const initial = useMemo(() => loadEntry(dateKey), [dateKey]);
  const [answers, setAnswers] = useState<Answers>(initial.answers);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(initial.completed);
  const [savedAt, setSavedAt] = useState<number | null>(initial.updatedAt);

  const answerRef = useRef<HTMLTextAreaElement | null>(null);
  const saveTimer = useRef<number | null>(null);

  const current = questions[step];
  const value = answers[current?.id] ?? "";

  useEffect(() => {
    autoResize(answerRef.current);
    answerRef.current?.focus({ preventScroll: true });
  }, [step, completed]);

  // Debounced autosave whenever answers change.
  useEffect(() => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      const now = Date.now();
      saveEntry({ date: dateKey, answers, completed, updatedAt: now });
      setSavedAt(now);
    }, 450);
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, [answers, completed, dateKey]);

  function setValue(v: string) {
    setAnswers((a) => ({ ...a, [current.id]: v }));
  }

  function goPrev() {
    if (completed) {
      setCompleted(false);
      setStep(questions.length - 1);
      return;
    }
    setStep((s) => Math.max(0, s - 1));
  }

  function goNext() {
    if (step >= questions.length - 1) {
      const now = Date.now();
      setCompleted(true);
      saveEntry({ date: dateKey, answers, completed: true, updatedAt: now });
      setSavedAt(now);
      return;
    }
    setStep((s) => s + 1);
  }

  if (completed) {
    return <Done profile={profile} questions={questions} answers={answers} onRevise={goPrev} />;
  }

  const dateLabel = today.toLocaleDateString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const isLast = step === questions.length - 1;
  const filledCount = questions.filter((q) => (answers[q.id] ?? "").trim()).length;

  return (
    <main className="entry-page">
      <div className="guided">
        <div className="guided-header">
          <div className="guided-meta">
            <span>{dateLabel}</span>
            <span className="dot" aria-hidden="true" />
            <span>
              Question {step + 1} of {questions.length}
            </span>
            <span className="dot" aria-hidden="true" />
            <span>{filledCount} answered</span>
          </div>

          <div
            className="guided-dots"
            role="tablist"
            aria-label="Question progress"
          >
            {questions.map((q, i) => (
              <button
                key={q.id}
                type="button"
                role="tab"
                className={`guided-dot${
                  (answers[q.id] ?? "").trim() && i !== step ? " done" : ""
                }`}
                aria-current={i === step ? "step" : undefined}
                aria-label={`Question ${i + 1}`}
                onClick={() => setStep(i)}
              />
            ))}
          </div>
        </div>

        <section className="guided-card" aria-live="polite">
          <p className="guided-eyebrow">A guided journal</p>
          <h1 className="guided-question">
            <PromptText q={current} />
          </h1>
          {current.hint && <p className="guided-hint">{current.hint}</p>}

          <textarea
            ref={answerRef}
            className="guided-answer"
            placeholder={current.placeholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              autoResize(e.currentTarget);
            }}
            onKeyDown={(e) => {
              // ⌘/Ctrl + Enter advances without forcing newline-as-submit.
              if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                e.preventDefault();
                goNext();
              }
            }}
          />
        </section>

        <div className="guided-nav">
          <span className="guided-nav-status" aria-live="polite">
            <span className="dot" aria-hidden="true" />
            {savedAt
              ? `Saved · ${new Date(savedAt).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}`
              : "Not saved"}
          </span>
          <div className="guided-actions">
            <button
              type="button"
              className="btn btn-ghost"
              style={{ padding: "10px 18px" }}
              onClick={goPrev}
              disabled={step === 0}
            >
              Back
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ padding: "10px 18px" }}
              onClick={goNext}
            >
              {isLast ? "Finish entry" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function Done({
  profile,
  questions,
  answers,
  onRevise,
}: {
  profile: { name: string };
  questions: Question[];
  answers: Answers;
  onRevise: () => void;
}) {
  const totalWords = Object.values(answers).reduce(
    (n, a) => n + (a.trim() ? a.trim().split(/\s+/).length : 0),
    0,
  );

  return (
    <main className="entry-page">
      <div className="guided">
        <div className="guided-done">
          <p className="guided-eyebrow">Today's entry</p>
          <h2>
            Thanks, {profile.name}. <em>Saved.</em>
          </h2>
          <p>
            {totalWords} {totalWords === 1 ? "word" : "words"} on the page. Come
            back tomorrow — the questions will be waiting.
          </p>

          <div className="hero-actions" style={{ marginTop: 8 }}>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onRevise}
              style={{ padding: "10px 18px" }}
            >
              Revise
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("profile")}
              style={{ padding: "10px 18px" }}
            >
              See your profile
            </button>
          </div>

          <div className="guided-summary">
            {questions.map((q) => {
              const a = (answers[q.id] ?? "").trim();
              return (
                <div key={q.id} className="guided-summary-item">
                  <p className="q">{promptToString(q)}</p>
                  <p className={`a${a ? "" : " empty"}`}>
                    {a || "Left blank — that's fine too."}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
