import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_PROFILE } from "../lib/profile";

/* ── Typing engine ─────────────────────────────────────────────────────── */

type Line = { text: string; speed?: number; pauseAfter?: number };

/**
 * Drives a sequence of prompt lines, typed character by character. Reports
 * which line is currently being typed (and the partial text) plus the
 * indices of lines already fully committed. Loops with a hold at the end.
 */
function useTypedSequence(lines: Line[], holdMs = 6000) {
  const [renderedCount, setRenderedCount] = useState(0);
  const [active, setActive] = useState<{ index: number; text: string } | null>(
    null,
  );
  const cancelRef = useRef(false);

  useEffect(() => {
    cancelRef.current = false;
    setRenderedCount(0);
    setActive(null);

    const sleep = (ms: number) =>
      new Promise<void>((r) => setTimeout(r, ms));

    async function run() {
      while (!cancelRef.current) {
        for (let i = 0; i < lines.length; i++) {
          if (cancelRef.current) return;
          const line = lines[i];
          if (line === undefined) continue;
          const speed = line.speed ?? 22;
          let buf = "";
          setActive({ index: i, text: "" });
          for (const ch of line.text) {
            if (cancelRef.current) return;
            buf += ch;
            setActive({ index: i, text: buf });
            await sleep(speed + Math.random() * 28);
          }
          setActive(null);
          setRenderedCount(i + 1);
          await sleep(line.pauseAfter ?? 600);
        }
        // Hold on the completed view, then restart.
        await sleep(holdMs);
        if (cancelRef.current) return;
        setRenderedCount(0);
        setActive(null);
        await sleep(220);
      }
    }

    run();
    return () => {
      cancelRef.current = true;
    };
  }, [lines, holdMs]);

  return { renderedCount, active };
}

/* ── Today's Entry mock ────────────────────────────────────────────────── */

type ScaleQuestion = {
  id: string;
  text: string;
  scale: number;
  /** Which dot (1-indexed) reads as the chosen answer. */
  selected: number;
};

export function WebMockTerminal() {
  const goalX = DEFAULT_PROFILE.focusAreas[0] ?? "your first goal";
  const goalY = DEFAULT_PROFILE.focusAreas[1] ?? "your second goal";

  const questions = useMemo<ScaleQuestion[]>(
    () => [
      { id: "day", text: "How was your day?", scale: 5, selected: 4 },
      { id: "goalX", text: `How did you do with ${goalX}?`, scale: 3, selected: 2 },
      { id: "goalY", text: `How did you do with ${goalY}?`, scale: 3, selected: 3 },
    ],
    [goalX, goalY],
  );

  const lines = useMemo<Line[]>(
    () => questions.map((q) => ({ text: q.text, speed: 22, pauseAfter: 650 })),
    [questions],
  );

  const { renderedCount, active } = useTypedSequence(lines);

  const dateLabel = useMemo(
    () =>
      new Date().toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
      }),
    [],
  );

  const allDone = renderedCount === questions.length && active === null;

  return (
    <div className="terminal" aria-label="Today's entry preview">
      <div className="terminal-chrome">
        <span className="terminal-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="terminal-title">tracka.space/entry/today</span>
      </div>
      <div className="webmock-body">
        <div className="webmock-meta">
          <span>Today · {dateLabel}</span>
        </div>
        <h3 className="webmock-title">Today's Entry</h3>

        <div className="webmock-questions">
          {questions.map((q, i) => {
            const isActive = active !== null && active.index === i;
            const isDone = i < renderedCount;
            const isVisible = isActive || isDone;
            const displayText = isActive ? active!.text : isDone ? q.text : "";

            return (
              <div
                key={q.id}
                className={`webmock-q-row${isVisible ? " visible" : ""}`}
              >
                <p className="webmock-question">
                  {displayText}
                  {isActive && <span className="caret" aria-hidden="true" />}
                </p>
                {isDone && (
                  <div
                    className="webmock-scale"
                    role="img"
                    aria-label={`${q.selected} out of ${q.scale}`}
                  >
                    {Array.from({ length: q.scale }, (_, n) => (
                      <span
                        key={n}
                        className={`webmock-dot${
                          n === q.selected - 1 ? " filled" : ""
                        }`}
                        style={{ animationDelay: `${n * 70}ms` }}
                      />
                    ))}
                    <span className="webmock-scale-label">
                      {q.selected} / {q.scale}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div
          className={`webmock-footnote${allDone ? " visible" : ""}`}
          aria-hidden={!allDone}
        >
          <span className="dot" aria-hidden="true" />
          saved · just now
        </div>
      </div>
    </div>
  );
}
