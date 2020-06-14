import React, { useState } from 'react';
import { IonItem, IonLabel, IonInput, IonDatetime, IonSlides, IonSlide, IonButton, IonIcon } from '@ionic/react';
import './style.css';
import { arrowForward } from 'ionicons/icons';
import TCreateState from '../../types/TCreateState';
import { submitMessage } from '../../services/toast';
import isAfter from 'validator/lib/isAfter';
import { setPublication } from '../../services';

const CreatePublication: React.FC = () => {
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  function handleChanges(type: string, value: string) {
    const types: TCreateState = {
      from: setFrom,
      to: setTo,
      date: setDate,
      time: setTime
    }

    if (typeof types[type] === 'function') { types[type](value); return; }
    submitMessage('Invalid input format!');
  }

  function handleFrom(e: any) { return handleChanges('from', e.target.value); }
  function handleTo(e: any) { return handleChanges('to', e.target.value); }
  function handleDate(e: any) { return handleChanges('date', e.target.value); }
  function handleTime(e: any) { return handleChanges('time', e.target.value); }

  function validate() {
    if (from.length < 3 || to.length < 3) { submitMessage('Invalid locations. Minimum chars are 3!'); return false; }
    if (!isAfter(date)) { submitMessage('You must enter a date after today!'); return false; }
    return true;
  }

  function submit() {  if(!validate()) { return; } setPublication({ from, to, date, time }); }

  return (
    <IonSlides>
      <IonSlide>
        <div className="slide">
          <img src="https://www.kindpng.com/picc/m/65-652552_clipart-bee-signboard-cartoon-sign-board-png-transparent.png" alt="create-publicatio" />
          <IonItem >
            <IonLabel position="floating">From</IonLabel>
            <IonInput type="text" value={from} onIonChange={handleFrom} />
          </IonItem>
          <p>Enter your starting location!</p>
          <div className='slide-right'>
            <p>Slide Right</p>
          </div>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide">
          <img src="https://www.kindpng.com/picc/m/65-652552_clipart-bee-signboard-cartoon-sign-board-png-transparent.png" alt="create-publicatio" />
          <IonItem >
            <IonLabel position="floating">To</IonLabel>
            <IonInput type="text" value={to} onIonChange={handleTo} />
          </IonItem>
          <p>Enter your end location!</p>
          <div className='slide-right'>
            <p>Slide Right</p>
          </div>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide">
          <img src="https://www.kindpng.com/picc/m/65-652552_clipart-bee-signboard-cartoon-sign-board-png-transparent.png" alt="create-publicatio" />
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime placeholder="Select Date" value={date} onIonChange={handleDate}></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Time</IonLabel>
            <IonDatetime placeholder="Select Time" display-format="h:mm A" picker-format="h:mm A" value={time} onIonChange={handleTime}></IonDatetime>
          </IonItem>
          <p>Enter the date you will travel!</p>
          <div className='slide-right'>
            <p>Slide Right</p>
          </div>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide last-slide">
          <img src="https://www.kindpng.com/picc/m/65-652552_clipart-bee-signboard-cartoon-sign-board-png-transparent.png" className="create-img" alt="create-publicatio" />
          <IonButton fill="clear" className="create-btn" onClick={submit}>
            Create Publication
            <IonIcon slot="end" ios={arrowForward} md={arrowForward} />
          </IonButton>
        </div>
      </IonSlide>
    </IonSlides>
  );
};

export default CreatePublication;
