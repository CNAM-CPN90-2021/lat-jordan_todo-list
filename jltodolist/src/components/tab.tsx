/*
    ce fichier est inutilisé
*/

import React from 'react';
import {  IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';



const Tab: React.FC = () => {

    return (
        <IonSegment onIonChange={e => console.log('Segment selected', e.detail.value)}>
          <IonSegmentButton value="todo">
            <IonLabel>To do</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="all">
            <IonLabel>All</IonLabel>
          </IonSegmentButton>
        </IonSegment>
    )
};

export default Tab;