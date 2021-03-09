import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';
import { AMachine } from '../../models/Store';

// const data = [
//   { name: 'Active', value: 400 },
//   { name: 'Inactive', value: 300 },
// ];

const COLORS = ['green', 'red'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const MachineOverviewChart: React.FC<{machines: AMachine[]}> = (props) => {

    const [data, setData] = useState<{name: string, value: number}[]>([])

    useEffect(() => {
        let countActiveMachines = 0;
        let countInactiveMachines = 0;
        props.machines.map(m => {
            if(m.active === true){
                countActiveMachines += 1;
            }else{
                countInactiveMachines += 1;
            }
        });
        console.log(props.machines);
        setData([{name: 'Active', value: countActiveMachines}, {name: 'Inactive', value: countInactiveMachines}]);
    },[])

    return (
      <ResponsiveContainer width="80%" height="80%">

        <PieChart>
          <Pie
            data={data}
            cx="60%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
  
}

export default MachineOverviewChart;