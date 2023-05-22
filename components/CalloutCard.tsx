"use client";

import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout, Color } from "@tremor/react";

type Props = {
  message: string;
  warning?: boolean;
  color?: Color | string;
};

function CalloutCard({ message, warning, color }: Props) {
  return (
    <Callout
      className="mt-4"
      title={message}
      icon={warning ? ExclamationIcon : CheckCircleIcon}
      color={color as Color}
    />
  );
}

export default CalloutCard;
