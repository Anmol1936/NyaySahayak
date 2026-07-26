import SearchBar from "./SearchBar";

function Hero({ onResults }) {
  return (
    <section className="hero">

      <div className="hero-content">

        <div className="badge">
          ⚖ India's Smart Legal Search Platform
        </div>

        <h1>
          Nyay<span>Sahayak</span>
        </h1>

        <p>
          Search IPC Sections, BNS Sections, legal offences,
          compare IPC ↔ BNS instantly and access legal
          descriptions within seconds.
        </p>

        <SearchBar onResults={onResults} />

      </div>

    </section>
  );
}

export default Hero;