import React from "react"
import pretty from 'pretty-time';
function PatientRow({patient, selected, onClick}) {
    return <div className="flex-auto overflow-y-auto">
        <a className="block border-b" onClick={onClick}>
            <div className={"flex cursor-pointer flex-row border-l-2 border-transparent hover:bg-gray-100 p-3 align-center " +(selected ? "border-l-2 border-blue-500 bg-blue-100" : "") }>
                <div className={"w-10 mr-2"}><img className={"rounded-full bg-gray-200 w-10 h-10"} src={patient.avatar}/></div>
                <div className="flex flex-col">
                    <strong className="flex-grow text-sm">{`${patient.first_name} ${patient.last_name}`}</strong>
                </div>
            </div>
        </a>
    </div>

}

export default PatientRow;