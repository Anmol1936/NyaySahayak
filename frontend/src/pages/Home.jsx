import { useState } from "react";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import ResultCard from "../components/ResultCard";

function Home() {

  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  return (
    <>

      <Navbar />

      <Hero
        onResults={(data) => {
            setResults(data);
            setHasSearched(true);
        }}
        />

      <section className="features">

        <FeatureCard
          icon="⚖️"
          title="563 Sections"
          text="Complete IPC & BNS legal database."
        />

        <FeatureCard
          icon="🔄"
          title="IPC ↔ BNS"
          text="Instant mapping between IPC and BNS."
        />

        <FeatureCard
          icon="⚡"
          title="Fast Search"
          text="Find legal sections and offences instantly."
        />

      </section>

                <section className="results">

                {!hasSearched ? null : results.length === 0 ? (

                    <div className="no-results">

                    <h2>🔍 No matching section found</h2>

                    <p>
                        Try another IPC section, BNS section or legal keyword.
                    </p>

                    </div>

                ) : (

                    results.map(item => (

                    <ResultCard
                        key={item.result._id}
                        item={item}
                    />

                    ))

                )}

                </section>

    </>
  );
}

export default Home;