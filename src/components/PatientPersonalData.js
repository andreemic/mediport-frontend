import React from "react"
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
function PatientPersonalData({patient}) {
    return <div className="flex flex-col flex-auto overflow-y-auto">
        {patient === null && <h6 className={"p-6 text-gray-400 cursor-default"}>Choose a patient</h6>}
        {patient !== null &&
        <div className={"p-4 space-y-3"}>
            <div className={"flex flex-row"}>
                <div className={"w-48 mr-2"}><div className={"patient-avatar bg-gray-200 w-32 h-32 rounded-full"}
                                                  style={{backgroundImage: `url(${getAvatar(patient.id)})`}}/></div>
                <div className={"flex flex-grow flex-col justify-center  flex-w-full "}>
                    <span className={" text-2xl"}>{patient.first_name} {patient.last_name}</span>
                    <span className={"text-sm text-gray-600"}>{patient.date_of_birth}</span>
                </div>
            </div>

            <div>
                <div className={"text-m "}>
                    <b>Email: </b> {patient.mail}
                </div>
                <div className={"text-m "}>
                    <b>Sex: </b> {patient.sex}
                </div>
            </div>
        </div>
        }
    </div>

}

export default PatientPersonalData;