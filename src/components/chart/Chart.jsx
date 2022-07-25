import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import styled from "styled-components";

import data from "./data";

const Container = styled.div`
  overflow-y: hidden;
  overflow-y: auto;
`;

const Chart = () => {
  return (
    <Container>
      <LineChart
        width={3200}
        height={500}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="trainees"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="centres"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="tradeAreas"
          stroke="#3f7956"
          activeDot={{ r: 8 }}
        />
        <Line
          type="monotone"
          dataKey="sips"
          stroke="#878c89"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </Container>
  );
};

export default Chart;
