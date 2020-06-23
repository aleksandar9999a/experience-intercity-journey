<img src="https://firebasestorage.googleapis.com/v0/b/experience-intercity-jouney.appspot.com/o/splash.png?alt=media&token=385f3b25-5895-4394-a254-5ca988444bdc" height="250" />

# Experience InterCIty Journey


## What is this?
* Mobile Application
* Social network for occasional transport

## Features
* Authentication
* Create new publications
* Manage it
* Writing messages
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
