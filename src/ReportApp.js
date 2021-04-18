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
import 'status-indicator/styles.css'
import ChatIcon2 from "../src/images/chat_icon2.png"

import ReactTooltip from 'react-tooltip';
import {apiBase} from "./util/api";
import RatingCircle from "./components/RatingCircle";


const teethNumbers = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28, 31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48];

function ReportApp() {
    let {reportid} = useParams();
    const [report, setReport] = useState(null)
    const [widgetOpen, setWidgetOpen] = useState(false)
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
        socketRef.current.emit("new_message", newMessage.endsWith('?') ? newMessage : newMessage + '?')
    }, []);

    const _toggleWidget = () => {
        toggleWidget()
        setWidgetOpen(!widgetOpen)
    }

    const startChat = useCallback((subject = null) => {
        if (!socketRef.current) {
            const socket = socketIOClient(apiBase);
            socketRef.current = socket;

            socketRef.current.on("connect", () => {
                setChatSubject(subject)
            })

            socketRef.current.on("new_message", msg => {
                addResponseMessage(msg)
            })

            socketRef.current.emit("start_chat", subject || "" + ".")
        } else if (subject !== chatSubject) {
            setChatSubject(subject)
            socketRef.current.emit("start_chat", subject || "")
        }
        if (subject !== null && !widgetOpen)
            _toggleWidget()
    }, [addResponseMessage, _toggleWidget]);

    return <div>
        {error && <div className={"p-4 bg-red-200 rounded-md border-2 border-red-300"}>
            {error}
        </div>}

        {report &&
        <div>
            <Section>
                <div className={"flex flex-col justify-center items-center mb-48"}>
                    <h1 className={"font-bold mb-3 text-4xl"}>Hey <span
                        className={"text-blue-500"}>{report.first_name}</span>. Welcome to Mediport.</h1>
                    <span
                        className={"text-xl"}>This report contains an overview of your appointment with Dr. Baumgartner from {report.date}.</span>
                </div>

                <Link to={"section2"}
                      spy={true}
                      smooth={true}
                      duration={800} className={"scroll-down-arrows"}>
                    <span/> <span/><span/>
                </Link>
            </Section>
            {report && <Section id={"section2"}>
                <div
                    className={"w-4/6 m-auto shadow-md p-8 grid grid-rows-1 grid-cols-3 gap-2 rounded-md h-5/6"}>
                    {/*<div>*/}
                    {/*    <h2 className={"text-6xl font-bold text-pink-600"}>MEDIPORT</h2>*/}

                    {/*</div>*/}
                    {report.overall_index && <div className={"max-h-full overflow-auto"}>

                        <h1 className={`font-semibold text-2xl mb-2`}>Your Dental Health</h1>
                        <div className={"flex items-stretch py-2 justify-center cursor-default"}>
                            {report.overall_index &&
                            <div data-tip={"Combined dental health score."} className={"inline-block m-2"}>
                                <RatingCircle rating={report.overall_index}/>
                                <div className={"text-center cursor-default text-center mt-2 text-gray-400"}>
                                    Overall Score
                                </div>
                            </div>}

                            <div className={"flex flex-col justify-between cursor-default items-between px-10"}>
                                {report.hygiene_index && <div data-tip={"Based on plaque and bacteria presence."}
                                                              className={"flex flex-col justify-center items-center"}>
                                    <RatingCircle small rating={report.hygiene_index}/>
                                    <div
                                        className={"text-center cursor-default text-center text-xs mt-1 text-gray-400"}>
                                        Hygiene Score
                                    </div>
                                </div>}
                                {report.health_index && <div data-tip={"Based on bleeding and tooth conditions."}
                                                             className={"flex flex-col justify-center items-center"}>
                                    <RatingCircle small rating={report.health_index}/>
                                    <div
                                        className={"text-center cursor-default text-center text-xs mt-1 text-gray-400"}>
                                        Health Score
                                    </div>
                                </div>}
                                <ReactTooltip delayShow={400} effect={"solid"} place={"bottom"}/>
                            </div>
                        </div>
                        <div>
                            <h1 className={`font-semibold text-2xl`}>Summary</h1>
                            {report.gpt3_summary?.map((paragraph, idx) => <p key={`summary-${idx}`}
                                                                             className={"mb-3 p-2"}>
                                {paragraph}
                            </p>)}
                            <h1 className={`font-semibold text-2xl`}>Therapy</h1>
                            <p className={"mb-3 p-2"}>
                                {report.gpt3_therapy}
                            </p>
                        </div>
                    </div>}

                    {diagnoses && <div className={"col-span-2 flex flex-col justify-around"}>
                        <Jaw selectedDiagnosis={selectedDiagnosis} teeth={teeth} allDiagnoses={diagnoses}/>
                        <div className={"flex flex-wrap w-full overflow-y-auto"}>
                            {report.issues_global.map(issueKey => {
                                let diag = diagnoses[issueKey]
                                return <div key={`iss-${issueKey}`}
                                            className={"relative group cursor-pointer inline-block cursor-default rounded-md hover:bg-blue-100 px-3 py-2 pb-10 m-2"}
                                            onMouseLeave={() => setSelectedDiagnosis(null)}
                                            onMouseEnter={() => setSelectedDiagnosis(issueKey)}
                                            data-tip={`Chat about this topic`}
                                            onClick={() => startChat(diag.display_name)}
                                            style={{flex: '45%'}}>
                                    <b>{diag.display_name}</b> {diag.description}

                                    <div
                                        className={"opacity-0 group-hover:opacity-50 hover:opacity-100 absolute right-4 bottom-2 transition duration-200 ease"}>

                                        <span className={"mr-2 text-gray-700 text-xs"}>Chat about this topic</span>
                                        <span
                                            className={"chaticon float-right w-8"}>
                                <img src={ChatIcon}/>
                                </span>
                                    </div>

                                </div>
                            })}
                        </div>
                    </div>}
                </div>
            </Section>}
            <Widget showTimeStamp={false} subtitle={null} launcher={(handleToggle) =>
                <div className={"group self-end mt-4 flex justify-center flex-col items-center"}>
                    <div
                        className={"bg-blue-200  flex justify-center items-center rounded-full w-16 h-16 cursor-pointer  shadow-lg"}
                        onClick={() => {
                            if (!socketRef.current) startChat()
                            handleToggle()
                            setWidgetOpen(!widgetOpen)
                        }}><img src={ChatIcon2}/>
                    </div>
                    <div
                        className={"opacity-0 transition ease duration-150 group-hover:opacity-100 text-gray-400 text-sm mt-2"}>
                        Chat with an AI assistant
                    </div>
                </div>
            }
                    title={<div className={"flex justify-center items-center space-x-2"}>
                        <status-indicator className={"m-4"} positive={socketRef?.current?.connected}
                                          intermediary={!socketRef?.current?.connected}/>
                        {chatSubject && <span className={"text-gray-500"}>Chatting about <span
                            className={"text-blue-600"}>{chatSubject}</span></span>}
                    </div>}
                    handleNewUserMessage={handleNewUserMessage}/>
        </div>
        }
    </div>
}

export default ReportApp;