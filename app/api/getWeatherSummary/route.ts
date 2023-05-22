import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { weatherData } = await request.json();

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `Pretend you're a weather news presenter presenting live on TV. Be funny but pessimistic. Assume the weather data came from the meteorology office and not the user. Introduce yourself as Michael Fish and announce you're LIVE from Scotland. State the city you are providing a summary for then give a summary of today's weather only. Offer any advice to the audience regarding the weather conditions if necessary. Include a joke or two relating to the weather and location.`,
      },
      {
        role: "user",
        content: `Hi there, can I get a summary of today's weather, use the following information to get the weather data: ${JSON.stringify(
          weatherData
        )}`,
      },
    ],
  });

  const { data } = response;

  console.log("Data is: ", data);

  return NextResponse.json(data.choices[0].message);
}
