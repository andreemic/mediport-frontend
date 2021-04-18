import React from "react"
import pretty from 'pretty-time';
import patm1 from "../images/patm1.png"
import patm2 from "../images/patm2.png"
import patf1 from "../images/patf1.png"

function getAvatar(patientId) {
    if (patientId === "7TfBClWZ1SzBGjJt6Enb")
        return patm1
    if (patientId === "suhuV0TOnZ7i7BNioClE")
        return patm2
    if (patientId === "fXSTWgGNTMx9IH3kGqld")
        return patf1
}


function PatientRow({patient, selected, onClick}) {
    return <div className="flex-auto overflow-y-auto">
        <a className="block border-b" onClick={onClick}>
            <div className={"flex cursor-pointer flex-row border-l-2 border-transparent hover:bg-gray-100 p-3 align-center " +(selected ? "border-l-2 border-blue-500 bg-blue-100" : "") }>
                <div className={"w-10 mr-2"}><div className={"rounded-full bg-gray-200 w-10 h-10 patient-avatar"} style={{backgroundImage: `url(${getAvatar(patient.id)})`}}/></div>
                <div className="flex flex-col">
                    <strong className="flex-grow text-sm">{`${patient.first_name} ${patient.last_name}`}</strong>
                </div>
            </div>
        </a>
    </div>

}

export default PatientRow;