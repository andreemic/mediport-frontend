import React from "react"

function PatientPersonalData({patient}) {
    return <div className="flex flex-col flex-auto overflow-y-auto">
        {patient === null && <h6>Choose a patient</h6>}
        {patient !== null &&
        <div className={"p-4 space-y-3"}>
            <div className={"flex flex-row"}>
                <div className={"w-48 mr-2"}><img className={"bg-gray-200 w-32 h-32 rounded-full"}
                                                  src={patient.avatar}/></div>
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