import {
  IonBadge,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Sensor, StoreModel } from "../../../models/Store";

const Algorithm: React.FC<{ selectedSensor: Sensor }> = (props) => {

  const [tableData, setTableData] = useState<{value: number, date: string}[]>([])  
  const [algorithm, setAlgorithm] = useState<string>("");
  const [depth, setDepth] = useState(10);
  const [reachMax, setReachMax] = useState("");
  const [reachMin, setReachMin] = useState("");

  const compareFunc = (
    a: { value: number; date: string },
    b: { value: number; date: string }
  ) => {
    if (a.date < b.date) {
      return -1;
    }
    if (a.date > b.date) {
      return 1;
    }
    // a muss gleich b sein
    return 0;
  };

  useEffect(() => {

    // sort table data - todo could lead to performance problems
    const tempTableData = props.selectedSensor.values.sort(compareFunc);
    const dataLength = props.selectedSensor.values.length;
    // limit table data
    setTableData(tempTableData.slice(dataLength - depth, dataLength));

    if(algorithm === "linearreg"){

        linearreg();


    }else{
        setReachMax("N/A")
        setReachMin("N/A")
    }

  }, [props, algorithm, depth]);

  const linearreg = () => {
    //basis bildet tabledata
    //Indexe: min ist 0 und max ist depth - 1
    console.log(tableData)

    // berechnung avg x
    let avgx: number;
    let sumx: number = 0;
    tableData.map((item: {value: number, date: string}) => {
        let date = Number.parseInt(item.date);
        sumx += date;
    }); 
    avgx = sumx * (1 / depth);

    // berechnung avg y
    let avgy: number;
    let sumy: number = 0;
    tableData.map((item: {value: number, date: string}) => {
        let value = item.value;
        sumy += value;
    }); 
    avgy = sumy * (1 / depth);

    // berechnung div x
    let divx: number[] = [];
    tableData.map((item: {value: number, date: string}) => {
        let date = Number.parseInt(item.date);
        divx.push(date - avgx);
    }); 

    // berechnung div y
    let divy: number[] = [];
    tableData.map((item: {value: number, date: string}) => {
        divy.push(item.value - avgy);
    }); 

    // berechnung b zaehler
    let bzaehler: number = 0;
    divx.map((xelem: number, index: number) => {
        let prod = xelem * divy[index];
        bzaehler += prod;
    })

    // berechnung b nenner
    let bnenner: number = 0;
    divx.map((xelem: number) => {
        bnenner += xelem * xelem;
    })

    // berechnung b 
    let b: number = bzaehler / bnenner; 

    // berechnung a
    let a: number = avgy - b * avgx;

    // y = a + b * x

    // cut min (y = props.selectedSensor.min)
    let cutMin = ( props.selectedSensor.min - a ) / b;
    let cutMax = ( props.selectedSensor.max - a ) / b

    // format date
    let cutMinDate = new Date(cutMin).toDateString().toString();
    let cutMaxDate = new Date(cutMax).toDateString().toString();
    let cutMinTime = new Date(cutMin).toTimeString().toString();
    let cutMaxTime = new Date(cutMax).toTimeString().toString();

    //am ende müssen zwangsläufig reachmin und reachmax gesetzt werden
    setReachMin(cutMinDate+" at: "+cutMinTime)
    setReachMax(cutMaxDate+" at: "+cutMaxTime)
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel>Algorithm</IonLabel>
          <IonSelect
            value={algorithm}
            placeholder="Select One"
            onIonChange={(e) => setAlgorithm(e.detail.value)}
          >
            <IonSelectOption value="linearreg">
              Linear Regression
            </IonSelectOption>
          </IonSelect>
        </IonItem>
        {
            (algorithm !== "") && 
            <IonItem>
                <IonLabel>Depth</IonLabel>
                <IonInput type="number" value={depth} placeholder="Enter Number" onIonChange={e => setDepth(parseInt(e.detail.value!))}></IonInput>
            </IonItem>
        }

        <IonGrid>
          <IonRow>
            <IonCol>
              <p>Reaching max: {reachMax}</p>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <p>Reaching min: {reachMin}</p>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Algorithm;
