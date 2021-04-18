import React from "react"
import Tooth from "./Tooth";
import "./jaw.css"

function Jaw({teeth, allDiagnoses, selectedDiagnosis}) {
    return <div className={`jaw-con`}>
        <div className={"flex justify-center flex-col"}>
            <div className={" cursor-default text-center text-2xl ml-2 font-bold mb-4"}>Upper Jaw</div>
            <div className={`jaw-bg upper-jaw ${selectedDiagnosis ? 'dimmed' : ''}`}>
                {Object.entries(teeth).filter(([key, val]) => key < 30).map(([toothIdx, toothInfo]) =>
                    <Tooth key={`tooth-${toothIdx}`} selectedDiagnosis={selectedDiagnosis} allDiagnoses={allDiagnoses}
                           toothIdx={toothIdx} toothInfo={toothInfo}/>)}
            </div>
        </div>

        <div className={"flex justify-center flex-col"}>
            <div className={"cursor-default text-center  font-bold ml-4  text-2xl mb-4"}>Lower Jaw</div>
            <div className={`jaw-bg lower-jaw ${selectedDiagnosis ? 'dimmed' : ''}`}>
                {Object.entries(teeth).filter(([key, val]) => key > 30).map(([toothIdx, toothInfo]) =>
                    <Tooth key={`tooth-${toothIdx}`} selectedDiagnosis={selectedDiagnosis} allDiagnoses={allDiagnoses}
                           toothIdx={toothIdx} toothInfo={toothInfo}/>)}
            </div>
        </div>
    </div>
}

export default Jaw;