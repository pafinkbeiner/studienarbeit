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

const MachineTable = (props: {selectedSensor: Sensor, machine: AMachine}) => {

    let db = DatabaseHandler.getDbInstance();

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

      // load content from db to table 10 values
    const sensor = db.get(props.machine.id)?.sensors.find(s => s.id == props.selectedSensor.id);
    
    if(sensor != undefined){
        setTableData(sensor.values.slice(0,9));
    }


    client.on('message', (topic: string, payload: Buffer, packet: mqtt.Packet) => {

      // Push value to db 
      // and call method to refresh the table data

        if(topic.search(props.selectedSensor.topic) !== -1){
            const sensorValue = {
                date: Date.now().toLocaleString(),
                value: Number.parseInt(payload.toString())
            }
            // Add new Sensor value to database
            const newMachine = props.machine;
            newMachine.sensors.find(s => s.id == props.selectedSensor.id)?.values.push(sensorValue);
            db.update(newMachine);
        } 
    });
  })

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