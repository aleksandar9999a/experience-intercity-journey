import React from 'react';
import { IonItem, IonLabel, IonInput, IonDatetime, IonSlides, IonSlide, IonButton, IonIcon } from '@ionic/react';
import './style.css';
import { arrowForward } from 'ionicons/icons';

const CreatePublication: React.FC = () => {
  return (
    <IonSlides>
      <IonSlide>
        <div className="slide">
          <img src="https://www.kindpng.com/picc/m/65-652552_clipart-bee-signboard-cartoon-sign-board-png-transparent.png" />
          <IonItem >
            <IonLabel position="floating">From</IonLabel>
            <IonInput type="text" />
          </IonItem>
          <p>Enter your starting location!</p>
          <div className='slide-right'>
            <p>Slide Right</p>
          </div>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide">
          <img src="https://www.kindpng.com/picc/m/65-652552_clipart-bee-signboard-cartoon-sign-board-png-transparent.png" />
          <IonItem >
            <IonLabel position="floating">To</IonLabel>
            <IonInput type="text" />
          </IonItem>
          <p>Enter your end location!</p>
          <div className='slide-right'>
            <p>Slide Right</p>
          </div>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide">
          <img src="https://www.kindpng.com/picc/m/65-652552_clipart-bee-signboard-cartoon-sign-board-png-transparent.png" />
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime placeholder="Select Date"></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Time</IonLabel>
            <IonDatetime placeholder="Select Time" display-format="h:mm A" picker-format="h:mm A"></IonDatetime>
          </IonItem>
          <p>Enter the date you will travel!</p>
          <div className='slide-right'>
            <p>Slide Right</p>
          </div>
        </div>
      </IonSlide>
      <IonSlide>
        <div className="slide last-slide">
          <img src="https://www.kindpng.com/picc/m/65-652552_clipart-bee-signboard-cartoon-sign-board-png-transparent.png" className="create-img" />
          <IonButton fill="clear" className="create-btn">
            Create Publication
            <IonIcon slot="end" ios={arrowForward} md={arrowForward} />
          </IonButton>
        </div>
      </IonSlide>
    </IonSlides>
  );
};

export default CreatePublication;
