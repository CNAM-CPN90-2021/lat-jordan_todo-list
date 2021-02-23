import React, { useState } from 'react';
import { IonCheckbox, IonCol, IonRow } from '@ionic/react';

const MyTask = (props) => {
    const task = props.data;
    const thisIndex = props.index;
    let [checked, setChecked] = useState();

    checked = task.isDone;

    function onCheck(event) {
        const myData = JSON.parse(localStorage.getItem("todolist"));

        myData[thisIndex] = {
            "label": task.label,
            "isDone": event.detail.checked
        }
        localStorage.setItem("todolist", JSON.stringify(myData));
    }

    function rayer() {
        if (task.isDone) {
            return "rayer"
        } else {
            return ""
        }
    }

    return (
        <IonRow>
            <IonCol size="2">
                <IonCheckbox checked={checked} onIonChange={(e) => {
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

