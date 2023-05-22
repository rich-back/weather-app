"use client";

import { AreaChart, Card, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function HumidityChart({ results }: Props) {
  const hourly = results?.hourly.time
    .map((time) =>
      new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
      })
    )
    .slice(0, 24);

  const data = hourly.map((hour, i) => ({
    time: `${Number(hour)}h`,
    "Humidity (%)": results.hourly.relativehumidity_2m[i],
    "Precipitation Probability (%)": results.hourly.precipitation_probability[i],
  }));

  const dataFormatter = (number: number) =>
    `${number} ${results.hourly_units.relativehumidity_2m}`;

  return (
    <Card>
      <Title>Humidity & Precipitation Probability</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Humidity (%)", "Precipitation Probability (%)"]}
        colors={["orange", "indigo"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={80}
      />
    </Card>
  );
}

export default HumidityChart;
