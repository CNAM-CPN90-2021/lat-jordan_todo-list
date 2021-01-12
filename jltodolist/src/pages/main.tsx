import React, { useState } from 'react';
import { IonContent, IonInput, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton } from '@ionic/react';

/** Mes comps */
import MakeList from '../components/list';
import Tab from '../components/tab';

const Main: React.FC = () => {

  const [text, setText] = useState<any>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>JOJO TODOLIST</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Tab />
      <IonContent>
        <MakeList />
      </IonContent>

      <IonFooter>
        <IonInput value={text} placeholder="Enter Input" 
        onKeyPress={
          e=> {
            handleKeyPress(e);
          }
        }

        onIonChange={e => {
          setText(e.detail.value!);
          }}></IonInput>

        <IonButton
        onClick={
          e=> {
            console.log(text);
          }
        }
        >Add</IonButton>
      </IonFooter>
    </IonPage>
  )
};

export default Main;

function handleKeyPress(event) {
  if(event.key === 'Enter'){
    console.log(event);
    // addElement(text);
  }
}

function addElement(data){
  console.log(data);
}