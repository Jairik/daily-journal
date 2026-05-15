import { WebMockTerminal } from "../components/MockTerminal";

export function Home() {
  return (
    <main className="page">
      <section className="column-wide">
        <div className="hero">
          <div>
            <div className="hero-eyebrow">A daily journal</div>
            <h1>
              A quiet place
              <br />
              to <em>think it through</em>.
            </h1>
            <p className="hero-lead">
              Tracka is a typography-first journal — a digital sanctuary for
              the kind of writing you don't share. Calm surfaces, generous
              margins, and a serif that knows how to keep a secret.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#/signin">
                Begin writing
              </a>
              <a className="btn btn-ghost" href="#/entry">
                See the editor
              </a>
            </div>
          </div>

          <div className="hero-stack" aria-label="Product preview">
            <WebMockTerminal />
          </div>
        </div>
      </section>
    </main>
  );
}
