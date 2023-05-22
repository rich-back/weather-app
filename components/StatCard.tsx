"use client";

import { Metric } from "@tremor/react";
import { Color } from "@tremor/react";
import { Text } from "@tremor/react";
import { Card } from "@tremor/react";

type Props = {
  title: string;
  metric: string;
  color?: Color | string;
};

function StatCard({ title, metric, color }: Props) {
  return (
    <Card decoration="top" decorationColor={color as Color}>
      <Text>{title}</Text>
      <Metric>{metric}</Metric>
    </Card>
  );
}

export default StatCard;
