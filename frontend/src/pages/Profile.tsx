import { DEFAULT_PROFILE } from "../lib/profile";

const ENTRIES = [
  {
    date: "12 May",
    title: "Morning, slow",
    snippet:
      "The kettle clicked off before I noticed it had been on. There's a kind of attention that only shows up after the third cup…",
    tags: ["#morning", "#intention"],
  },
  {
    date: "10 May",
    title: "Notes on a rainy run",
    snippet:
      "Eight kilometres, all of them grey. I kept thinking about the shape of a sentence I haven't written yet.",
    tags: ["#running"],
  },
  {
    date: "08 May",
    title: "A quieter inbox",
    snippet:
      "I closed eleven tabs and felt, briefly, like I had moved house. It's strange how much a browser can carry.",
    tags: ["#focus"],
  },
];

export function Profile() {
  const profile = DEFAULT_PROFILE;
  const initial = profile.name.slice(0, 1).toUpperCase();

  return (
    <main className="page">
      <div className="column-wide">
        <div className="section-eyebrow">Profile</div>
        <h1 style={{ margin: 0 }} className="t-display-lg">
          Welcome back.
        </h1>

        <div className="profile-grid">
          <aside>
            <div className="avatar" aria-hidden="true">
              {initial}
            </div>
            <h2 className="profile-name">{profile.name}</h2>
            <p className="profile-handle">{profile.handle}</p>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                color: "var(--on-surface-variant)",
                margin: "0 0 24px",
              }}
            >
              Writing {profile.rhythm === "evening" ? "evenings" : "mornings"},
              with the intent to <em>{profile.intent}</em>.
            </p>

            <h3
              className="t-ui-label-sm"
              style={{ color: "var(--on-surface-variant)", margin: "0 0 10px" }}
            >
              Focus areas
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
              {profile.focusAreas.map((f) => (
                <span key={f} className="chip">
                  <span className="chip-dot" aria-hidden="true" />
                  {f}
                </span>
              ))}
            </div>
            <p
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 14,
                fontStyle: "italic",
                color: "var(--on-surface-variant)",
                margin: 0,
              }}
            >
              These shape today's guided questions.
            </p>

            <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
              <a className="btn btn-ghost" href="#/entry">
                Open today's entry
              </a>
            </div>
          </aside>

          <section>
            <div className="profile-stat-row" role="list">
              <div className="profile-stat" role="listitem">
                <span className="num">23</span>
                <span className="label">Day streak</span>
              </div>
              <div className="profile-stat" role="listitem">
                <span className="num">142</span>
                <span className="label">Entries</span>
              </div>
              <div className="profile-stat" role="listitem">
                <span className="num">38.2k</span>
                <span className="label">Words</span>
              </div>
            </div>

            <h3
              className="t-ui-label-sm"
              style={{ color: "var(--on-surface-variant)", marginBottom: 14 }}
            >
              Recent entries
            </h3>

            <div className="entry-list">
              {ENTRIES.map((e) => (
                <article key={e.title} className="card card-hoverable">
                  <div className="entry-list-meta">
                    <span>{e.date}</span>
                    {e.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <h4 className="entry-list-title">{e.title}</h4>
                  <p className="entry-list-snip">{e.snippet}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
