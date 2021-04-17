import React from "react"

function firstDigitOfToothnumber(number) {
    return parseInt(number.toString()[0])
}

function haveToFlip(toothNumber) {
    let firstDigit = firstDigitOfToothnumber(toothNumber)
    return firstDigit === 2 || firstDigit === 3;
}

function tooltipDirection(toothIdx) {
    if (parseInt(toothIdx[1]) < 4) {
        return 'top'
    }
    if (parseInt(toothIdx[1]) >= 4 && parseInt(toothIdx[1]) < 6) {
        return 'top' + toothSide(toothIdx)
    }

    return toothSide(toothIdx)
}

function toothSide(toothIdx) {

    if (toothIdx[0] === '1' || toothIdx[0] === '4') return 'left'
    if (toothIdx[0] === '2' || toothIdx[0] === '3') return 'right'
}

// toothInfo = { counter: int, issues: []string, notes: string }
function Tooth({toothIdx, toothInfo, selectedDiagnosis, allDiagnoses, ...rest}) {
    return <div
        className={`tooth-con tooth tooth-${toothIdx} ${selectedDiagnosis ? (toothInfo.issues.indexOf(selectedDiagnosis) === -1 ? 'dimmed' : 'highlighted') : ''}`}>
        <div className={"absolute w-14 h-14 circle rounded-full border-4 border-blue-400 z-20"}/>
        <div className={"absolute w-14 h-14 circle circle-bg rounded-full bg-blue-400 opacity-50"}/>
        {(toothInfo.issues.length !== 0 || toothInfo.notes !== "") &&
        <span
            className={`tooltip bg-gray-900 px-2 py-2 text-white bg-opacity-70 text-small tooltip-${tooltipDirection(toothIdx)}`}>
            <ul>
                {allDiagnoses && toothInfo.issues.map(issue => <li>{allDiagnoses[issue].display_name}</li>)}
            </ul>
            {toothInfo.notes !== "" &&
            <div className={"mt-2 p-1 rounded-md w-full bg-gray-300 bg-opacity-50"}>
                {/*<span className={"notes-title bg-gray-400"}>Notes</span>*/}
                {toothInfo.notes}
            </div>}
        </span>}
        <img
            src={`/teeth/${toothIdx[0] === '2' ? '1' + toothIdx[1] : (toothIdx[0] === '3' ? '4' + toothIdx[1] : toothIdx)}.png`}
            className={`${haveToFlip(toothIdx) ? 'flip' : ''} tooth-issues_${toothInfo.counter}`}
        />

    </div>
}


export default Tooth;