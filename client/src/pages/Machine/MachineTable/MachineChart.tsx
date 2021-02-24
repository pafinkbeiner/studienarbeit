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

const MachineChart = (props: {values: Array<{value: number, date: string}>} ) => {

  const [tableData, setTableData] = useState<{value: number, date: string}[]>([])

  useEffect(() => {
    const tempTableData = props.values.sort(compareFunc)
    setTableData(tempTableData.slice(0,9))
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

export default MachineChart;