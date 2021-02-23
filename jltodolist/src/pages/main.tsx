import React, { useState } from 'react';
import { IonContent, IonInput, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonList, IonGrid, IonRow, IonLabel, IonSegment, IonSegmentButton, IonCol, IonIcon, IonItem } from '@ionic/react';

/** Mes comps */
import MyTask from '../components/task';
import { trash } from 'ionicons/icons';


function getData() {
  return JSON.parse(localStorage.getItem("todolist"));
}

const Main: React.FC = () => {

  const [text, setText] = useState<any>();
  let [tableau, setTableau] = useState<any>(getData());
  let [segment, setSegment] = useState("all");
  let nbrTodo = 0;

  tableau.forEach(task => {
    if (task.isDone === false) {
      nbrTodo = nbrTodo + 1;
    }
  });

  function hide() {
    if (tableau.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  function getInput() {
    return text;
  }

  function storeData() {
    localStorage.setItem("todolist", JSON.stringify(tableau));
  }

  function addElement() {
    const value = getInput();

    if (value === undefined || value === null || value === " " || value === "") {
      return
    }
    const myObject = {
      "label": value,
      "isDone": false
    };
    tableau = [...tableau, myObject];
    setTableau(tableau);
    setText("");
    storeData()
  }


  function changeTab(e) {
    const tab = e.detail.value;
    let filtreTableau = [];
    nbrTodo = 0;
    setTableau(filtreTableau);
    if (tab === "todo") {
      setSegment("todo");
      tableau.filter(task => task.isDone === false).map(filterTask => {
        filtreTableau = [...filtreTableau, filterTask];
      });

      setTableau(filtreTableau);
    } else {
      setSegment("all");
      const storeData = getData();
      setTableau(storeData);
    }
  }

  function removeTask(index) {
    tableau.splice(index, 1);
    storeData()
    setTableau(getData());
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">JOJO TODOLIST</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonSegment value={segment} onIonChange={(e) => changeTab(e)}>
        <IonSegmentButton value="todo">
          <IonLabel>To do ({nbrTodo})</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="all">
          <IonLabel>All</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <IonContent>

        <IonList>
          <IonItem  hidden={hide()}>
              <p>Wow nothing to do !</p>
          </IonItem>
          {tableau.map((e, index) => {
            return (
              <IonItem key={index}>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <MyTask data={e} index={index} />
                    </IonCol>
                    <IonCol size="2">
                      <IonButton
                        color="light"
                        onClick={() => { removeTask(index) }}
                      >
                        <IonIcon color="danger" icon={trash} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
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
            <IonButton onClick={() => { addElement(); }}>Add</IonButton>
          </IonRow>
        </IonGrid>
      </IonFooter>
    </IonPage>
  )
};

export default Main;