import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import HumidityChart from "@/components/HumidityChart";
import InfoPanel from "@/components/InfoPanel";
import RainChart from "@/components/RainChart";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import cleanData from "@/lib/cleanData";
import getBasePath from "@/lib/getBasePath";
import React from "react";

export const revalidate = 60;

type Props = {
  params: {
    city: string;
    lat: string;
    long: string;
  };
};

async function WeatherPage({ params: { city, lat, long } }: Props) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      latitude: lat,
      longitude: long,
      timezone: "auto",
    },
  });

  const results: Root = data.myQuery;

// ChatGPT API fetch 

  // const dataToSend = cleanData(results, city);

  // const res = await fetch(`${getBasePath()}/api/getWeatherSummary`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     weatherData: dataToSend,
  //   }),
  // });

  // const GPTdata = await res.json();
  // const { content } = GPTdata;

  function degToCompass(angle: number) {
    var val = Math.floor(angle / 45 + 0.5);
    var arr = ["↓ N", "↙ NE", "← E", "↖ SE", "↑ S", "↗ SW", "→ W", "↘ NW"];
    return arr[val % 8];
  }

  function handleUVAlert(UVindex: number) {
    let message = "";
    switch (UVindex) {
      case 0:
        message = "No risk of UV - It's safe to stay outside.";
        break;
      case 1:
      case 2:
        message =
          "Low - You can safely stay outside. Consider sunscreen in direct sunlight.";
        break;
      case 3:
      case 4:
      case 5:
        message =
          "Moderate - Take care during midday hours and do not spend too much time in the sun unprotected. Sunscreen advised.";
        break;
      case 6:
      case 7:
        message =
          "High - Seek shade during midday hours, cover up and wear sunscreen.";
        break;
      case 8:
      case 9:
      case 10:
        message =
          "Very high - Spend time in the shade between 11am and 3pm. Shirt, sunscreen and hat are essential.";
        break;
      case 11:
        message =
          "Extreme - Avoid being outside during midday hours. Shirt, sunscreen and hat essential.";
        break;
    }
    return message;
  }

  function handleUVAlertColor(UVindex: number) {
    let color = "";
    switch (UVindex) {
      case 0:
        color = "gray";
        break;
      case 1:
      case 2:
        color = "teal";
        break;
      case 3:
      case 4:
      case 5:
        color = "yellow";
        break;
      case 6:
      case 7:
        color = "orange";
        break;
      case 8:
      case 9:
      case 10:
        color = "red";
        break;
      case 11:
        color = "purple";
        break;
    }
    return color;
  }

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InfoPanel city={city} lat={lat} long={long} results={results} />

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today&apos;s Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message="This is where the weather summary goes..." color="teal" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 m-2">
            <StatCard
              title="Maximum Temperature"
              metric={`${results.daily.temperature_2m_max[0].toFixed(1)}°C`}
              color="red"
            />

            <StatCard
              title="Minimum Temperature"
              metric={`${results.daily.temperature_2m_min[0].toFixed(1)}°C`}
              color="blue"
            />
            <div className="space-y-2">
              <StatCard
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(2)}`}
                color={handleUVAlertColor(
                  Math.floor(results.daily.uv_index_max[0])
                )}
              />
              <CalloutCard
                message={handleUVAlert(
                  Math.floor(results.daily.uv_index_max[0])
                )}
                warning
                color={handleUVAlertColor(
                  Math.floor(results.daily.uv_index_max[0])
                )}
              />
            </div>
            <div className="flex space-x-3">
              <StatCard
                title="Wind Speed"
                metric={`${results.current_weather.windspeed.toFixed(1)}km/h`}
                color="cyan"
              />

              <StatCard
                title="Wind Direction"
                metric={degToCompass(
                  Number(results.current_weather.winddirection.toFixed())
                )}
                color="violet"
              />
            </div>
          </div>
        </div>

        <hr className="mb-5" />
        <div className="space-y-3">
          <TempChart results={results} />
          <RainChart results={results} />
          <HumidityChart results={results} />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
