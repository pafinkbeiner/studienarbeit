import "./styles.css";
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
import { Sensor } from "../../../models/Store";
import client from "../../../helper/mqtt";
import mqtt from "mqtt"
import { DatabaseHandler } from "../../../helper/db";
import { table } from "console";

const data = [
  {
    date: "Page A",
    value: 4000
  },
  {
    date: "Page B",
    value: 3000
  },
  {
    date: "Page C",
    value: 2000
  },
  {
    date: "Page D",
    value: 2780
  },
  {
    date: "Page E",
    value: 1890
  },
  {
    date: "Page F",
    value: 2390
  },
  {
    date: "Page G",
    value: 3490
  }
];

const MachineTable = (props: {selectedSensor: Sensor, machineId: string}) => {

    let db = DatabaseHandler.getDbInstance();

    const [connectionStatus, setConnectionStatus] = React.useState(false);
    const [messages, setMessages] = React.useState("");

    const [tableData, setTableData] = useState<Array<{date: string, value: number}>>([])

    const refreshTabelData = (data: {date: string, value: number}) => {
        // get recent data from params
        // put old data into the newest db position 
        db.get(props.machineId)?.sensors.find(s => s.id == props.selectedSensor.id)?.values.push(tableData[tableData.length - 1]);
        
        //remove first element from tableData TODO eventuell add -1 at the end when there occurs an error
        setTableData(state => state.slice(1, state.length))
        
        // put recent data into newsest table position
        setTableData((state: Array<{date: string, value: number}>) => {
            return [ ...state, data ];
        })

    }

  //const data = props.selectedSensor.values;
  useEffect(() => {

      // load content from db to table 10 values
    const sensor = db.get(props.machineId)?.sensors.find(s => s.id == props.selectedSensor.id);
    
    if(sensor != undefined){
        setTableData(sensor.values.slice(0,9));
    }


    client.on('message', (topic: string, payload: Buffer, packet: mqtt.Packet) => {

        if(topic.search(props.selectedSensor.topic) !== -1){
            const sensorValue = {
                date: Date.now().toLocaleString(),
                value: Number.parseInt(payload.toString())
            }
            refreshTabelData(sensorValue);
        } 
    });
  })

  return (
    <LineChart
      width={500}
      height={300}
      data={data}
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
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
    </LineChart>
  );
}

export default MachineTable;