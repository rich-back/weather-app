"use client";

import { AreaChart, Card, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
  const hourly = results?.hourly.time.map((time) =>
    new Date(time)
      .toLocaleString("en-GB", {
        hour: "numeric",
        hour12: false,
      })
      .slice(0, 24)
  );

  const data = hourly.map((hour, i) => ({
    time: Number(hour),
    "Temperature (°C)": results.hourly.temperature_2m[i],
    "Relative Humidity (%)": results.hourly.relativehumidity_2m[i],
  }));

  const dataFormatter = (number: number) => `${number} °C`

  return (
    <Card>
      <Title>Temperature & UV Index</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Temperature (°C)", "Relative Humidity (%)"]}
        colors={["yellow", "rose"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={40}
      />
    </Card>
  );
}

export default TempChart;