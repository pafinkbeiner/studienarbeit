import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { AMachine, Sensor } from "../../../models/Store";
import client from "../../../helper/mqtt";
import mqtt from "mqtt"
import { DatabaseHandler } from "../../../helper/db";

const MachineTable = (props: {selectedSensor: Sensor, machineId: string, addSensorValue: (machineId: string, sensorId: string, value: string) => void}) => {

    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const [messages, setMessages] = React.useState("");

    const [tableData, setTableData] = useState<Array<{date: string, value: number}>>([])

    const refreshTabelData = (data: {date: string, value: number}) => {

      // get sensor values from db 

      // sort by date to get newest 

      // load sensor values to state

        // // get recent data from params
        // // put old data into the newest db position 
        // db.get(props.machineId)?.sensors.find(s => s.id == props.selectedSensor.id)?.values.push(tableData[tableData.length - 1]);
        
        // //remove first element from tableData TODO eventuell add -1 at the end when there occurs an error
        // setTableData(state => state.slice(1, state.length))
        
        // // put recent data into newsest table position
        // setTableData((state: Array<{date: string, value: number}>) => {
        //     return [ ...state, data ];
        // })

    }

  //const data = props.selectedSensor.values;
  useEffect(() => {

    // load values from sensor into table
    setTableData(props.selectedSensor.values.slice(0,9));

    // Get new values from mqtt
    client.on('message', (topic: string, payload: Buffer, packet: mqtt.Packet) => {
        if(topic == `machine/${props.machineId}/data/${props.selectedSensor.topic}`){
          props.addSensorValue(props.machineId, props.selectedSensor.id, payload.toString());
          // TODO Check if sensor value is automatically changes the state and refreshes the table
        } 
    });
    // Todo change dependency
  }, [props.selectedSensor])

  return (
    <LineChart
      width={500}
      height={300}
      data={tableData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="value"
        stroke="#33cc99"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
}

export default MachineTable;