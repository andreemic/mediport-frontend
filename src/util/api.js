// Example POST method implementation:
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(apiBase + url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response; // parses JSON response into native JavaScript objects
}


// export const apiBase =`http://192.168.178.24:5000`
export const apiBase = 'http://localhost:5000'
// export const apiBase = 'http://192.168.178.50:5000'
export function startGeneratingReport(patientId, appointmentId) {
    return postData('/create_report', {
        patient_id: patientId,
        appointment_id: appointmentId
    })
}

export async function sendReportToPatient(patientId, reportId) {
    return postData('/send_report', {
        patient_id: patientId,
        report_id: reportId
    })
}