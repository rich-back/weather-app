"use client";

import { AreaChart, Card, Title } from "@tremor/react";

type Props = {
  results: Root;
};

function RainChart({ results }: Props) {
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
    "Rain (mm)": results.hourly.rain[i],
    "Precipitation (mm)": results.hourly.precipitation[i],
  }));

  const dataFormatter = (number: number) =>
    `${number} ${results.hourly_units.rain}`;

  return (
    <Card>
      <Title>Rain & Precipitation</Title>
      <AreaChart
        className="mt-6"
        data={data}
        showLegend
        index="time"
        categories={["Rain (mm)", "Precipitation (mm)"]}
        colors={["blue", "cyan"]}
        minValue={0}
        valueFormatter={dataFormatter}
        yAxisWidth={80}
      />
    </Card>
  );
}

export default RainChart;
