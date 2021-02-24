import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { DatabaseHandler } from "../../../helper/db";

const MachineChart = (props: {values: Array<{value: number, date: string}>} ) => {

  const [tableData, setTableData] = useState<{value: number, date: string}[]>([])

  useEffect(() => {
    const tempTableData = props.values.sort(compareFunc)
    const dataLength = props.values.length;
    setTableData(tempTableData.slice(dataLength-10,dataLength))
    setTableData( (state: {value: number, date: string}[]) => {
      const newState: {value: number, date: string}[] = [];
      state.map(item => newState.push({
        ...item,
        date: new Date(item.date).toTimeString().toString().slice(0, 8)
      }));
      return newState;
    })
  }, [props])

  const compareFunc = (a: {value: number, date: string}, b: {value: number, date: string}) => {
      if (a.date < b.date) {
        return -1;
      }
      if (a.date > b.date) {
        return 1;
      }
      // a muss gleich b sein
      return 0;
  }

  return (
    <ResponsiveContainer height='100%' width='100%'>
      <LineChart
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
    </ResponsiveContainer>
  );
}

export default MachineChart;