import React, { useState } from 'react';
import { IonContent, IonInput, IonHeader, IonPage, IonTitle, IonToolbar, IonFooter, IonButton, IonList, IonGrid, IonRow, IonLabel, IonSegment, IonSegmentButton, IonCol, IonIcon, IonItem } from '@ionic/react';

/** Mes comps */
import MyTask from '../components/task';
import { trash } from 'ionicons/icons';

const Main: React.FC = () => {
  const [text, setText] = useState<any>();
  let [tableau, setTableau] = useState<any>([]);
  console.log("start");
  // Reset data
  // localStorage.setItem("todolist", JSON.stringify([]));
  // return
  const myData = JSON.parse(localStorage.getItem("todolist"));
  /*
    Gros plantage au premier démarrage car ce tableau valait null !
  */
  tableau = myData || [];

  /*
    pourquoi se compliquer la vie ?
  */
  function getInput() {
    return text;
  }

  /*
    👍
  */
  function addElement() {
    const value = getInput();

    /*
      conseil pour plus tard (fait la même chose) :
      
      if(!value.?trim()) {
    */
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
    localStorage.setItem("todolist", JSON.stringify(tableau));
  }


  // ne marche pas tout a fait comme je veux
  /*
    en effet, tu mélanges "données de stockage" et "données d'affichage"
    ce que j'attendais était en gros :

    function List() {
      const [todoList, setTodoList] = useState([])

      let displayedList
      if(tab === 'todo') {
        displayedList = todoList.filter(task => task.isDone === false)
      } else {
        displayedList = todoList
      }

      return (
        displayedList.map(() => TodoItem)
      )
    }
  */
  function filter(e) {
    const tab = e.detail.value;
    let filtreTableau = [];
    if (tab === "todo") {
      /*
        pourquoi se compliquer la vie ? (2)

        La méthode .filter() retourne le tableau filtré
        tu peux faire directement :

        filtreTableau = tablaeu.filter(task => task.isDone === false)
      */
      
      tableau.filter(task => task.isDone === false).map(filterTask => (
        filtreTableau = [...filtreTableau, filterTask]
      ));

      /* 
        Attention ! Tu es en train de modifier le tableau qui contient toutes les TODOS, en faisant ça tu perds des données
      */
      setTableau(filtreTableau);
    } else {
      /*
        tu multiplies les sources de donnée, ça peut créer des bugs
      */
      const storeData = JSON.parse(localStorage.getItem("todolist"));
      setTableau(storeData);
    }
  }


  function removeTask(index) {
    /*
      Oui et non
      Dans un contexte js classique c'est OK
      Mais faire une mutation sur un tableau ou un objet est déconseillé en React (je peux t'expliquer plus en détails durant le courts)
    */
    tableau.splice(index, 1);

    /*
      Yes 👍
    */
    localStorage.setItem("todolist", JSON.stringify(tableau));
    setTableau(tableau);
  }



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">JOJO TODOLIST</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonSegment value="todo" onIonChange={e => filter(e)}>
        <IonSegmentButton value="todo">
          <IonLabel>To do</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="all">
          <IonLabel>All</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      <IonContent>
        <IonList>
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