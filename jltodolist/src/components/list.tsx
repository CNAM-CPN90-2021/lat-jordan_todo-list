import React, { useState } from 'react';
import { IonList, IonItem, IonContent, IonCheckbox, IonLabel, IonRow, IonCol, IonGrid } from '@ionic/react';

const MakeList = (props) => {

    const list = props.list;
    const [checked, setChecked] = useState(false);

    return (
        <IonContent>
            <IonList>
                {list.map((e, index) => {
                    return (
                        <IonItem key={index}>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="1">
                                        <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                                    </IonCol>
                                    <IonCol>
                                        <p> {e.label}</p>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>)
                })}
            </IonList>
        </IonContent>
    )
}

export default MakeList;

