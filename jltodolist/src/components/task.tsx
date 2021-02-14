import React, { useState } from 'react';
import { IonItem, IonCheckbox, IonRow, IonCol, IonGrid, IonButton, IonIcon, IonInput, IonModal, IonLabel } from '@ionic/react';
import { create } from 'ionicons/icons';

const MyTask = (props) => {

    const task = props.data;
    const thisIndex = props.index;
    const [isDisable, setIsDisable] = useState(false);
    const [checked, setChecked] = useState(false);

    console.log("MA task: ", task);
    console.log("KEY: ", props.index);



    function onCheck(event) {
        console.log(event);
        console.log(event.detail.checked);

        const myData = JSON.parse(localStorage.getItem("todolist"));

        myData[thisIndex] = {
            "label": task.label,
            "isDone": event.detail.checked
        }
        console.log("Update DATA: ", myData);
        localStorage.setItem("todolist", JSON.stringify(myData));
    }

    function rayer(){
        if(task.isDone) {
            return "rayer"
        }
    }


    console.log("IS DISABLE: ", isDisable);
    return (

        <IonItem >
            <IonGrid>
                <IonRow>
                    <IonCol size="2">
                        <IonCheckbox checked={task.isDone} onIonChange={(e) => {
                            setChecked(task.isDone = e.detail.checked);
                            onCheck(e);
                        }} />
                    </IonCol>
                    <IonCol>
                        <h3 className={rayer()}>{task.label}</h3> 
                    </IonCol>
                    <IonCol size="2">
                        <IonButton
                            onClick={
                                () => {
                                    if (isDisable === false) {
                                        setIsDisable(true);
                                    } else {
                                        setIsDisable(false);
                                    }
                                }
                            }
                        >
                            <IonIcon icon={create} />
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            <IonModal isOpen={isDisable} cssClass='my-custom-class'>
                <p color="dark">This is modal content</p>
                <IonButton onClick={() => setIsDisable(false)}>Close Modal</IonButton>
            </IonModal>
        </IonItem>
    )
};

export default MyTask;

