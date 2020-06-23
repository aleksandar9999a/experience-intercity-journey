<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/splash.png?alt=media&token=385f3b25-5895-4394-a254-5ca988444bdc" height="250" />

# Experience InterCity Journey


## What is this?
* Mobile Application
* Social network for occasional transport

## Features
* Authentication
* Create new publications
* Manage it
* Writing messages
* Dark Mode
* etc. 

## Dependencies
* Ionic
* React
* Capacitor
* Firebase
* Firebase Hooks
* Typescript
* RxJS
* UID
* Validator
* React Router

## How to run it?

It is good to read the following documentation before all this:

[Ionic](https://ionicframework.com/)

[Firebase](https://firebase.google.com/docs)

[React](https://reactjs.org/docs/getting-started.html)

In order for the project to work, you need to register and make a new project in Firebase. Also you must be registered in Pixabay.
Once you have the necessary configuration for Firebase, you need to copy and paste it in src/config/firebase.tsx.

```bash
const fbConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}
```

When you get and auth key from Pixabay, you must copy and paste it in src/config/pixabay_config.tsx.

```bash
const pixabay_config = {
	auth_key: ''
}
```

Next step is to install dependencies with next command. Also it is a good idea to have globally installed Ionic, React, Capacitor.

```bash
    npm install
```

The last step:

```bash
    ionic serve
```

This will create new server. Project will run on it.

<p align="center">
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095118_InterCity_Journey.png?alt=media&token=9b69a057-0ea1-42ea-bc17-9fe1571a083a" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095130_InterCity_Journey.png?alt=media&token=88227115-2eb3-4649-8876-05c71120189b" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095209_InterCity_Journey.png?alt=media&token=803e8524-c6d4-47d6-9c13-556f1856ee82" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095216_InterCity_Journey.png?alt=media&token=34cab632-6c30-4b5f-b6ff-85ea49ecf566" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095225_InterCity_Journey.png?alt=media&token=8e919859-3159-4769-adbd-792317403cc9" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095231_InterCity_Journey.png?alt=media&token=10763286-d2cd-4e2b-82ed-1c0ec0e0dcbb" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095235_InterCity_Journey.png?alt=media&token=a35bca62-1d77-4888-9536-b1f6c0f06260" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095239_InterCity_Journey.png?alt=media&token=c9cf2c85-7885-40eb-8bed-65243b87e921" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095243_InterCity_Journey.png?alt=media&token=5110d175-a2e9-475d-9c87-8b17d8d6fd20" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095321_InterCity_Journey.png?alt=media&token=2aab238f-22b9-44ac-a136-589baa417305" width="250" />
	<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/scr%2FScreenshot_20200623-095336_InterCity_Journey.png?alt=media&token=ef1fa9af-5d5e-4c64-af21-d97566aea3a3" width="250" />
</p>
