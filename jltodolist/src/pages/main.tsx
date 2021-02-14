import React, { useState } from 'react';
import { IonContent, IonInput, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonList, IonGrid, IonRow } from '@ionic/react';

/** Mes comps */
import MyTask from '../components/task';
import Tab from '../components/tab';


const Main: React.FC = () => {

  const [text, setText] = useState<any>();
  let [tableau, setTableau] = useState<any>([]);

  // Reset 
  // localStorage.setItem("todolist", JSON.stringify([]));
  // return
  const myData = JSON.parse(localStorage.getItem("todolist"));
  tableau = myData;
  // const oldTableau = [... tableau, myData];

  function getInput() {
    return text;
  }

  function addElement() {
    const value = getInput();
    // console.log(value);
    if (value === undefined || value === null || value === " " || value === "") {
      return
    }
      const myObject = {
        "isDone": false,
        "label": value
      };
      tableau = [...tableau, myObject];
      setTableau(tableau);
      setText("");

      localStorage.setItem("todolist", JSON.stringify(tableau));
    
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>JOJO TODOLIST</IonTitle>
        </IonToolbar>
      </IonHeader>
      <Tab  />
      <IonContent>
        <IonList>
          {tableau.map((e, index) => {
            return (
              <MyTask key={index} data={e} index={index}/>
            )
          })}
        </IonList>
      </IonContent>

      <IonFooter>
        <IonGrid>
          <IonRow>
            <IonInput
              color="dark"
              value={text}
              placeholder="Enter Input"
              onKeyPress={
                e => {
                  if (e.key === 'Enter') {
                    addElement();
                  }
                }
              }

              onIonChange={e => {
                setText(e.detail.value!);
              }}>
            </IonInput>
            <IonButton
              onClick={
                e => {
                  addElement();
                }
              }
            >Add</IonButton>

          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  )
};

export default Main;