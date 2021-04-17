import React from "react"
import Tooth from "./Tooth";
import "./jaw.css"

function Jaw({teeth, allDiagnoses, selectedDiagnosis}) {
    return <div className={`jaw-con`}>
        <div className={`jaw-bg upper-jaw ${selectedDiagnosis ? 'dimmed' : ''}`}>
            {Object.entries(teeth).filter(([key, val]) => key < 30).map(([toothIdx, toothInfo]) =>
                <Tooth key={`tooth-${toothIdx}`} selectedDiagnosis={selectedDiagnosis} allDiagnoses={allDiagnoses} toothIdx={toothIdx} toothInfo={toothInfo}/>)}
        </div>

        <div className={`jaw-bg lower-jaw ${selectedDiagnosis ? 'dimmed' : ''}`}>
            {Object.entries(teeth).filter(([key, val]) => key > 30).map(([toothIdx, toothInfo]) =>
                <Tooth key={`tooth-${toothIdx}`} selectedDiagnosis={selectedDiagnosis} allDiagnoses={allDiagnoses} toothIdx={toothIdx} toothInfo={toothInfo}/>)}
        </div>
    </div>
}

export default Jaw;