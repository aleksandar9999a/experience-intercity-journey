import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonDatetime, IonSlides, IonSlide, IonButton, IonIcon, IonSelect, IonSelectOption } from '@ionic/react';
import './style.css';
import { arrowForward } from 'ionicons/icons';
import TCreateState from '../../types/TCreateState';
import { submitMessage } from '../../services/toast';
import isAfter from 'validator/lib/isAfter';
import { setPublication } from '../../services';
import assets from './../../config/assets';

const CreatePublication: React.FC = () => {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [type, setType] = useState<string>('');

  function handleChanges(type: string, value: string) {
    const types: TCreateState = {
      from: setFrom,
      to: setTo,
      date: setDate,
      time: setTime,
      type: setType
    }

    if (typeof types[type] === 'function') { types[type](value); return; }
    submitMessage('Invalid input format!');
  }

  function handleFrom(e: any) { return handleChanges('from', e.target.value); }
  function handleTo(e: any) { return handleChanges('to', e.target.value); }
  function handleDate(e: any) { return handleChanges('date', e.target.value); }
  function handleTime(e: any) { return handleChanges('time', e.target.value); }
  function handleType(e: any) { return handleChanges('type', e.target.value); }

  function validate() {
    const typesOfTransport = ['transport', 'drive'];
    if (from.length < 3 || to.length < 3) { submitMessage('Invalid locations. Minimum chars are 3!'); return false; }
    if (!isAfter(date)) { submitMessage('You must enter a date after today!'); return false; }
    if (!typesOfTransport.includes(type)) { submitMessage('Invalid type of transport!'); return false; }
    return true;
  }

  function submit() { if (!validate()) { return; } setPublication({ from, to, date, time, type }); }

  return (
    <IonSlides>
      <IonSlide>
        <div className="slide">
          <div className="slide-img">
            <img src={assets.start} alt="create-publication" />
            <div><h1>Where will you travel?</h1></div>
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
          <div className='slide-right'>
            <p>Slide Right</p>
          </div>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide">
          <div className="slide-img">
            <img src={assets.when} alt="create-publication" />
            <div><h1>When are you travelling?</h1></div>
          </div>
          <div>
            <IonItem>
              <IonLabel>Date</IonLabel>
              <IonDatetime placeholder="Select Date" value={date} onIonChange={handleDate}></IonDatetime>
            </IonItem>
            <IonItem>
              <IonLabel>Time</IonLabel>
              <IonDatetime placeholder="Select Time" display-format="h:mm A" picker-format="h:mm A" value={time} onIonChange={handleTime}></IonDatetime>
            </IonItem>
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
            <div><h1>What kind of transport are you looking for?</h1></div>
          </div>
          <div>
            <IonItem >
              <IonLabel>Search</IonLabel>
              <IonSelect interface="action-sheet" value={type} onIonChange={handleType}>
                <IonSelectOption value="transport">Transport</IonSelectOption>
                <IonSelectOption value="drive">To Drive</IonSelectOption>
              </IonSelect>
            </IonItem>
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
  );
};

export default CreatePublication;
