"use client";

import { AreaChart, Card, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function TempChart({ results }: Props) {
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
    "Temperature (°C)": results.hourly.temperature_2m[i],
    "Apparent Temperature (°C)": results.hourly.apparent_temperature[i],
  }));

  const dataFormatter = (number: number) =>
    `${number} ${results.hourly_units.temperature_2m}`;

  return (
    <Card>
      <Title>Temperature & Apparent Temperature</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Temperature (°C)", "Apparent Temperature (°C)"]}
        colors={["yellow", "rose"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={50}
      />
    </Card>
  );
}

export default TempChart;
