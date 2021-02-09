import React, { useState } from 'react';
import { IonContent, IonInput, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton } from '@ionic/react';

/** Mes comps */
import MakeList from '../components/list';
import Tab from '../components/tab';


const Main: React.FC = () => {

  const [text, setText] = useState<any>();
  const [tableau, setTableau] = useState<any>([]);


  function getInput() {
    return text;
  }
  
  function addElement(){
    const myObject = {
      label: getInput(),
    };
    const newArray = [...tableau, myObject];
    setTableau(newArray);
    setText("");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>JOJO TODOLIST</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Tab />
      <IonContent>
        <MakeList list={tableau}/>
      </IonContent>

      <IonFooter>
        <IonInput
         value={text} 
         placeholder="Enter Input" 
          onKeyPress={
            e=> {
              if(e.key === 'Enter'){
                addElement();
                // addElement(text);
              }
            }
          }

          onIonChange={e => {
            setText(e.detail.value!);
          }}>
        </IonInput>

        <IonButton
        onClick={
          e=> {
            // console.log(text);
            addElement();
          }
        }
        >Add</IonButton>
      </IonFooter>
    </IonPage>
  )
};

export default Main;