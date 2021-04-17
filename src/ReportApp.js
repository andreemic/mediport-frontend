import React, {useState, useEffect, useCallback, useRef} from "react"
import {useParams} from "react-router";
import firestore, {parseDocs} from "./util/firestore";
import Jaw from "./components/Jaw";
import Section from "./components/Section";
import {Widget, addResponseMessage, toggleWidget} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import "./components/report.css"
import socketIOClient from "socket.io-client";
import {Link, animateScroll as scroll} from "react-scroll";
import ChatIcon from "../src/images/chat icon.png"

import ReactTooltip from 'react-tooltip';
import {apiBase} from "./util/api";


const teethNumbers = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48];

function ReportApp() {
    let {reportid} = useParams();
    const [report, setReport] = useState(null)
    const [error, setError] = useState(null)
    const [diagnoses, setDiagnoses] = useState(null)
    const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);
    const [teeth, setTeeth] = useState(null)
    const socketRef = useRef(null)

    const [chatSubject, setChatSubject] = useState(null)

    // Fetch and parse report
    useEffect(() => {
        firestore.collection("reports").doc(reportid).get().then(res => {
            if (!res.exists)
                setError(`There's no report with id ${reportid}.`)
            else {
                let report = res.data();
                let teeth = {};
                teethNumbers.forEach(num => {
                    if (report.hasOwnProperty(`tooth_${num}`)) {
                        teeth[num] = report[`tooth_${num}`];
                    } else {
                        teeth[num] = {
                            counter: 0,
                            issues: [],
                            notes: ""
                        };
                    }
                })
                setTeeth(teeth)
                setReport(report)
                return report
            }
        }).then(report => {
            firestore.collection("diagnoses").get().then(res => {
                let diags = {};
                res.docs.forEach(doc => {
                    diags[doc.id] = {...doc.data(), id: doc.id};
                })

                setDiagnoses(diags)
            })
        })
    }, [reportid])

    const handleNewUserMessage = useCallback((newMessage) => {
        socketRef.current.emit("new_message", newMessage)
    }, []);

    const startChat = useCallback((subject) => {
        const socket = socketIOClient(apiBase);
        socketRef.current = socket;
        socket.on("connect", () => {
            setChatSubject(subject)
            toggleWidget()
        })
        socket.emit("start_chat", subject)

        socket.on("new_message", msg => {
            addResponseMessage(msg)
        })
    }, []);

    return <div>
        {/*{error && <div className={"p-4 bg-red-200 rounded-md border-2 border-red-300"}>*/}
        {/*    {error}*/}
        {/*</div>}*/}
        {/*{<div>*/}

        {report &&
        <div>
            <Section>
                <div className={"flex flex-col justify-center items-center mb-48"}>
                    <h1 className={"font-bold mb-3 text-4xl"}>Hey <span
                        className={"text-blue-500"}>{report.first_name}</span>. Welcome to Mediport.</h1>
                    <span
                        className={"text-xl"}>This report contains an overview of your last appointment with Dr. Baumgartner.</span>
                </div>

                <Link to={"section2"}
                      spy={true}
                      smooth={true}
                      duration={800} className={"scroll-down-arrows"}>
                    <span/> <span/><span/>
                </Link>
            </Section>
            {report && <Section id={"section2"}>
                <div className={"w-4/6 m-auto bg-white shadow-md p-8 grid grid-cols-3 gap-2 rounded-md"}>
                    {/*<div>*/}
                    {/*    <h2 className={"text-6xl font-bold text-pink-600"}>MEDIPORT</h2>*/}

                    {/*</div>*/}
                    {report.gpt3_summary && <div className={"max-h-full overflow-auto"}>
                        <h1 className={`font-semibold text-2xl`}>Summary</h1>
                        {report.gpt3_summary?.map((paragraph, idx) => <p key={`summary-${idx}`} className={"mb-3 p-2"}>
                            {paragraph}
                        </p>)}
                    </div>}
                    {diagnoses && <div className={"col-span-2"}>
                        <Jaw selectedDiagnosis={selectedDiagnosis} teeth={teeth} allDiagnoses={diagnoses}/>
                        <div className={"flex flex-wrap w-full"}>
                            {report.issues_global.map(issueKey => {
                                let diag = diagnoses[issueKey]
                                return <div key={`iss-${issueKey}`}
                                          className={"relative cursor-default rounded-md hover:bg-blue-100 px-3 py-2 pb-6 m-2"}
                                          onMouseLeave={() => setSelectedDiagnosis(null)}
                                          onMouseEnter={() => setSelectedDiagnosis(issueKey)} style={{flex: '45%'}}>
                                    <b>{diag.display_name}</b> {diag.description}

                                    <span data-tip={`Chat about this topic`}
                                          onClick={() => startChat(diag.display_name)}
                                          className={"chaticon opacity-50 cursor-pointer hover:opacity-100 transition duration-200 ease float-right w-8 absolute right-4 bottom-2"}>
                                    <img src={ChatIcon}/>
                                    <ReactTooltip effect={'solid'} delayShow={300}/>
                                </span>
                                </div>
                            })}
                        </div>
                    </div>}
                </div>
            </Section>}
            {chatSubject && <Widget subtitle={null} title={<span className={"text-gray-500"}>Chatting about <span
                className={"text-blue-600"}>{chatSubject}</span></span>} handleNewUserMessage={handleNewUserMessage}/>}
        </div>}
    </div>
}

export default ReportApp;