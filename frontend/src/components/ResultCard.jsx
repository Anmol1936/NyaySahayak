function ResultCard({ item }) {

    const law = item.result;

    return (

        <div className="result-card">

            <div className="result-header">

                <div className="ipc-box">
                    IPC {law.oldLaw.section}
                </div>

                <div className="arrow">
                    ↔
                </div>

                <div className="bns-box">
                    BNS {law.newLaw.section}
                </div>

            </div>

            <h2>
                {law.oldLaw.title}
            </h2>

            <div className="description">

                <h3>Indian Penal Code</h3>

                <p>{law.description.ipc}</p>

            </div>

            <div className="description">

                <h3>Bharatiya Nyaya Sanhita</h3>

                <p>{law.description.bns}</p>

            </div>

        </div>

    );

}

export default ResultCard;