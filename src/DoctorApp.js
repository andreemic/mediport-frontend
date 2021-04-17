import PatientRow from "./components/PatientRow";
import React, {useState, useEffect} from "react"
import PatientPersonalData from "./components/PatientPersonalData";
import firestore from "./util/firestore";
import PatientContent from "./components/PatientContent";


function DoctorApp() {
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)

    useEffect(() => {
        firestore.collection('patients').get().then(res => {
            setPatients(res.docs.map(d => {
                return {...d.data(), id: d.id};
            }))
            console.log(patients)
        })
    }, [])

    return <div className={" min-h-screen grid grid-cols-5 gap-2"}>
        <div className={""}>
            {patients.map(patient =>
                <PatientRow key={`prow-${patient.id}`} onClick={() => setSelectedPatient(patient)} patient={patient}
                            selected={patient.id === selectedPatient?.id}/>
            )}
        </div>
        <PatientPersonalData patient={selectedPatient}/>
        <PatientContent patient={selectedPatient}/>
    </div>
}

export default DoctorApp;
