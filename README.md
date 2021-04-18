# Demo
### Dentist view 
Assistant or doctor generates, chooses an appointment, checks, and sends report to patient.
![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/27695722/115143742-6b688200-a049-11eb-82e2-ea3f0ba7f1b0.gif)


### Patient view
Patients get a link to their report via email.


![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/27695722/115143753-7ae7cb00-a049-11eb-8f8f-31cfdf86a37c.gif)

The report informs the patient about their appointments. Patient can chat about them with GPT-3.

![ezgif com-gif-maker](https://user-images.githubusercontent.com/27695722/115143724-4aa02c80-a049-11eb-92d8-aa0b49dcf169.gif)

###


# Running locally

Clone, execute in directory:
```
  npm install
  npm start
```

You need a src/util/cred.js:
```
  export default {
    REACT_APP_FIREBASE_API_KEY:"",
    "REACT_APP_FIREBASE_AUTH_DOMAIN": "",
    "REACT_APP_FIREBASE_PROJECT_ID": "",
    "REACT_APP_FIREBASE_APP_ID": ""
  }

```

Make sure your npm and node.js are updated and [backend](https://github.com/andreemic/mediport-frontend) is running on `http://localhost:5000`.
