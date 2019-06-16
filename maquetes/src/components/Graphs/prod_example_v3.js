import React, { Component } from "react";
import Highcharts from "highcharts";
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Subtitle,
  Legend,
  LineSeries
} from "react-jsx-highcharts";

const plotOptions = {
  series: {
    pointStart: 2010
  }
};

const prod_example_v3 = () => (
  <div className="app">
    <HighchartsChart plotOptions={plotOptions}>
      <Chart />

      <Title>Solar Employment Growth by Sector, 2010-2016</Title>

      <Subtitle>Source: thesolarfoundation.com</Subtitle>

      <Legend layout="vertical" align="right" verticalAlign="middle" />

      <XAxis>
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <YAxis>
        <YAxis.Title>Number of employees</YAxis.Title>
        <LineSeries
          name="Total Pedidos"
          data={[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]}
        />
        <LineSeries
          name="% pedidos não avaliados"
          data={[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]}
        />
        <LineSeries
          name="Tempo médio de resposta"
          data={[11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]}
        />
        <LineSeries
          name="Avaliação média do Serviço"
          data={[null, null, 7988, 12169, 15112, 22452, 34400, 34227]}
        />
        <LineSeries
          name="Desvio padrão votações"
          data={[12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]}
        />
      </YAxis>
    </HighchartsChart>
  </div>
);

export default withHighcharts(prod_example_v3, Highcharts);
