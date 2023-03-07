
const SummaryPrintPage = ({summary}) => {

    return (
        <div id="summary-page">
            <div className="summary-title">
                <h2>Meeting Summary</h2>
            </div>
            <div className="summary-items">
                <ul>
                    {summary.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SummaryPrintPage;
