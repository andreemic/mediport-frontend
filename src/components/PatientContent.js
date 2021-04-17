import React, {useEffect, useState, useMemo} from "react"
import firestore, {parseDocs} from "../util/firestore";
import SmallSpinner from "./SmallSpinner";
import reqStatus from "../util/reqStatus";
import {Link} from "react-router-dom";
import {startGeneratingReport} from "../util/api";

function PatientContent({patient}) {
    const [appointments, setAppointments] = useState([])
    const [selectedAppointment, setSelectedAppointment] = useState(null)
    const [teeth, setTeeth] = useState([])

    const [prescriptions, setPrescriptions] = useState([])

    const [reportRequestStatus, setReportRequestStatus] = useState(reqStatus.NOT_STARTED)

    const appointmentsRef = useMemo(() =>
        patient !== null && firestore.collection('patients').doc(patient.id)
            .collection('appointments')
        , [patient?.id])

    useEffect(() => {
        if (patient === null) return
        appointmentsRef.get().then(res => {
            let apptmnts = parseDocs(res.docs)
            setAppointments(apptmnts)
            setSelectedAppointment(apptmnts[0])
        })
    }, [patient?.id, appointmentsRef])

    useEffect(() => {
        if (selectedAppointment === null) return
        appointmentsRef.doc(selectedAppointment.id).collection('prescription').get().then(res => {
                setPrescriptions(parseDocs(res.docs))
            }
        )

        appointmentsRef.doc(selectedAppointment.id).collection('teeth').get().then(res =>
            setTeeth(parseDocs(res.docs))
        )
    }, [selectedAppointment, appointmentsRef])

    const sendReport = () => {
        setReportRequestStatus(reqStatus.LOADING)
        //Todo:
    }
    const genReport = () => {
        setReportRequestStatus(reqStatus.LOADING)

        startGeneratingReport(patient.id, selectedAppointment.id).then(res => {
            setSelectedAppointment(selectedAppointment => {
                return {...selectedAppointment, report_creation_started: true}
            })
        }).catch(e => {

        })
    }

    return <div className="flex flex-col flex-auto overflow-y-auto p-4 col-span-3">
        {patient != null && <div className={"flex flex-col h-full"}>
            <select className={"px-4 py-1 w-48 rounded-sm"} value={selectedAppointment?.id} onChange={e =>
                // Caution: bs
                setSelectedAppointment(appointments.filter(a => a.id === e.target.value)[0])
            }>
                {appointments.map(appointment => <option key={`papp-${appointment.id}`}
                                                         value={appointment}>{appointment.date}</option>)}
            </select>

            {selectedAppointment !== null && <div className={"flex h-full flex-col"}>
                <div className={"flex-grow"}>
                    <div>
                        <h2 className={"text-2xl mt-6 font-bold"}>Patient History</h2>
                        <div className={"h-28 flex-col flex flex-wrap"}>
                            {Object.entries(selectedAppointment).map(([key, val]) => typeof val === "boolean" &&
                                val &&
                                <div key={`patient-hist-${key}`}>
                                    <input
                                        className={'m-2'}
                                        name={key}
                                        type="checkbox"
                                        checked={val} disabled/>
                                    <label htmlFor={key}>{key}</label>
                                </div>
                            )}
                        </div>
                    </div>

                    {<div>
                        <h2 className={"text-2xl mt-6 font-bold"}>Notes</h2>
                        <p>
                            {selectedAppointment.therapy_notes}
                        </p>
                    </div>}
                </div>

                <div className={"flex space-x-4 justify-end pr-14 pb-5 "}>
                    {selectedAppointment.report_created && selectedAppointment.report_key && <Link
                        to={`/report/${selectedAppointment.report_key}`}
                        className={"inline-flex justify-center items-center border-2 h-10 border-blue-300 text-blue-400 font-bold py-2 px-4 rounded w-32 self-end"}>
                        See Report
                    </Link>}
                    {!selectedAppointment.report_sent && selectedAppointment.report_created &&
                    <button
                        onClick={sendReport}
                        className={"inline-flex items-center justify-center items-center h-10 bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded w-48 self-end shadow-lg"}>
                        {reportRequestStatus === reqStatus.NOT_STARTED ?
                            <span>Send Report to {patient.first_name}</span>
                            : <SmallSpinner/>}
                    </button>}
                    {!selectedAppointment.report_sent && !selectedAppointment.report_created && selectedAppointment.report_creation_started &&
                    <button
                        className={"self-end w-56 items-center bg-gray-400 h-10 inline-flex justify-center items-center px-4 py-2 border border-transparent text-base text-white font-bold py-2 px-4 rounded w-48 self-end shadow-lg transition ease-in-out duration-150 cursor-not-allowed"}>
                        <SmallSpinner/>
                        <span className={"ml-2"}>Generating Report</span>
                    </button>}

                    {!selectedAppointment.report_sent && !selectedAppointment.report_created && !selectedAppointment.report_creation_started &&
                    <button
                        onClick={genReport}
                        className={" inline-flex items-center justify-center bg-blue-500 hover:bg-blue-700  h-10 text-white font-bold py-2 px-4 rounded w-48 self-end shadow-lg"}>
                        {reportRequestStatus === reqStatus.NOT_STARTED ?
                            <span>Generate Report</span>
                            : <SmallSpinner/>}
                    </button>}

                    {selectedAppointment.report_sent && <span
                        className={"bg-green-500 items-center cursor-default opacity-50 h-10 text-white flex justify-center font-bold py-2 px-4 rounded w-48 self-end"}>
                   Report sent!
                </span>}
                </div>
            </div>}
        </div>}
    </div>
}

export default PatientContent;