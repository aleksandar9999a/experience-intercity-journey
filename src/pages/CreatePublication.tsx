import React, { useState } from 'react';
import { observer } from 'mobx-react';

// Components
import {
  IonItem,
  IonLabel,
  IonInput,
  IonDatetime,
  IonSlides,
  IonSlide,
  IonButton,
  IonIcon,
  IonSelect,
  IonSelectOption,
  IonPage,
  IonContent
} from '@ionic/react';

// Icons
import { arrowForward } from 'ionicons/icons';

// Assets
import assets from '../config/assets';

// Interfaces
import { ICreatePublicationProps } from './../interfaces/interfaces';


export const CreatePublication = observer(({ validationManager, messageService, publicationsService, routerManager }: ICreatePublicationProps) => {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [type, setType] = useState<string>('');

  function handleFrom(e: any) {
    setFrom(e.target.value);
  }
  
  function handleTo(e: any) {
    setTo(e.target.value);
  }
  
  function handleDate(e: any) {
    setDate(e.target.value);
  }
  
  function handleTime(e: any) {
    setTime(e.target.value);
  }
  
  function handleType(e: any) {
    setType(e.target.value);
  }

  function submit() {
    const publication = { from, to, date, time, type };

    return validationManager.getPublicationError(publication)
      .then(_ => {
        return publicationsService.save(publication);
      })
      .then(() => {
        routerManager.push('/search');
      })
      .catch(error => {
        messageService.addErrorMessage(error.message);
      })
  }

  return (
    <IonPage>
      <IonContent>
        <IonSlides>
          <IonSlide>
            <div className="slide">
              <div className="slide-img">
                <img src={assets.start} alt="create-publication" />

                <h1>Where will you travel?</h1>
              </div>

              <div>
                <IonItem >
                  <IonLabel position="floating">From</IonLabel>

                  <IonInput type="text" value={from} onIonChange={handleFrom} />
                </IonItem>

                <IonItem >
                  <IonLabel position="floating">To</IonLabel>

                  <IonInput type="text" value={to} onIonChange={handleTo} />
                </IonItem>
              </div>

              <div className="slide-info">
                <p>It is recommended that you enter your current location and the one you will reach.</p>
              </div>

              <div className='slide-right'>
                <p>Slide Right</p>
              </div>
            </div>
          </IonSlide>

          <IonSlide>
            <div className="slide">
              <div className="slide-img">
                <img src={assets.when} alt="create-publication" />

                <h1>When are you travelling?</h1>
              </div>

              <div>
                <IonItem>
                  <IonLabel>Date</IonLabel>

                  <IonDatetime placeholder="Select Date" value={date} onIonChange={handleDate} />
                </IonItem>

                <IonItem>
                  <IonLabel>Time</IonLabel>

                  <IonDatetime placeholder="Select Time" display-format="h:mm A" picker-format="h:mm A" value={time} onIonChange={handleTime} />
                </IonItem>
              </div>

              <div className="slide-info">
                <p>On this page you must enter the date and time at which you will travel.</p>
              </div>

              <div className='slide-right'>
                <p>Slide Right</p>
              </div>
            </div>
          </IonSlide>

          <IonSlide>
            <div className="slide">
              <div className="slide-img">
                <img src={assets.kindOfTransport} alt="create-publication" />

                <h1>What kind of transport are you looking for?</h1>
              </div>

              <div>
                <IonItem>
                  <IonLabel>Search</IonLabel>

                  <IonSelect interface="action-sheet" value={type} onIonChange={handleType}>
                    <IonSelectOption value="transport">Transport</IonSelectOption>

                    <IonSelectOption value="drive">To Drive</IonSelectOption>
                  </IonSelect>
                </IonItem>
              </div>

              <div className="slide-info">
                <p>
                  Select type of your search.
  
                  <br /><br />
                  
                  Transport - If you have transport and looking for people to travel with you.

                  <br /><br />

                  Too Drive - If you do not have transport and are looking for one.
                </p>
              </div>

              <div className='slide-right'>
                <p>Slide Right</p>
              </div>
            </div>
          </IonSlide>

          <IonSlide>
            <div className="slide last-slide">
              <img src={assets.startJourney} className="create-img" alt="create-publicatio" />

              <div className="start-journey">
                <div className="start-journey-wrapper">
                  <h1>Start your journey!</h1>

                  <IonButton className="create-btn" onClick={submit}>
                    Create Publication
    
                    <IonIcon slot="end" ios={arrowForward} md={arrowForward} />
                  </IonButton>
                </div>
              </div>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
})
