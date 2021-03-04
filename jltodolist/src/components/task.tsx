import React, { useState } from 'react';
import { IonCheckbox, IonCol, IonRow } from '@ionic/react';


const MyTask = (props) => {

    const task = props.data;
    const thisIndex = props.index;
    const [checked, setChecked] = useState(task.isDone);


    function onCheck(event) {
        /*
            étrange façon de faire remonter l'information
            
            Pose problème car :
            - ne déclenche pas de rerender
            - tu multiplies les sources d'information
            - le flux des données est invisibilisé : on peut lire et écrire sur le localStorage de n'importe où, c'est pas mieux qu'une variable globale ;)
        */
        const myData = JSON.parse(localStorage.getItem("todolist"));

        myData[thisIndex] = {
            "label": task.label,
            "isDone": event.detail.checked
        }

        localStorage.setItem("todolist", JSON.stringify(myData));
    }

    /*
        Tu peux te contenter d'une déclaration de variable :

        const labelClassName = task.isDone ? "rayer" : ""

        return (
            <h3 className={labelClassName}></h3>
        )
    */
    function rayer() {
        if (task.isDone) {
            return "rayer"
        }
    }


    return (


        <IonRow>
            <IonCol size="2">
                <IonCheckbox checked={checked} onIonChange={(e) => {
                    /*
                        modifier ton objet ici est inutile (ne déclenche pas de rerender)
                        et même dangereux (tu peux te retrouver avec des données fausses ailleurs dans ton application)
                    */
                    task.isDone = e.detail.checked
                    setChecked(task.isDone);
                    onCheck(e);
                }} />
            </IonCol>
            <IonCol>
                <h3 className={rayer()}>{task.label}</h3>
            </IonCol>
        </IonRow>

    )
};

export default MyTask;

