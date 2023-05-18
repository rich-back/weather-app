import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import InfoPanel from "@/components/InfoPanel";
import StatCard from "@/components/StatCard";
import TempChart from "@/components/TempChart";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";
import React from "react";

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
      timezone: "GMT",
    },
  });

  const results: Root = data.myQuery;

  console.log(results);

  function degToCompass(angle: number) {
    var val = Math.floor(angle / 45 + 0.5);
    var arr = ["↓ N", "↙ NE", "← E", "↖ SE", "↑ S", "↗ SW", "→ W", "↘ NW"];
    return arr[val % 8];
  }

  return (
    <div className="flex flex-col min-h-screen md:flex-row">
      <InfoPanel city={city} lat={lat} long={long} results={results} />

      <div className="flex-1 p-5 lg:p-10">
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today's Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>

          <div className="m-2 mb-10">
            <CalloutCard message="This is where the GPT-4 summary goes..." />
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
              color={results.daily.temperature_2m_min[0] > 12 ? "red" : "blue"}
            />
            <div className="space-y-2">
              <StatCard
                title="UV Index"
                metric={`${results.daily.uv_index_max[0].toFixed(2)}`}
                color="fuchsia"
              />
              {Number(results.daily.uv_index_max[0].toFixed()) > 1 && (
                <CalloutCard
                  message={"The UV is high today, take care out there!"}
                  warning
                />
              )}
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
        <TempChart results={results}/>
        {/* <RainChart /> */}
        {/* <HumidityChart /> */}
      </div>
      </div>
    </div>
  );
}

export default WeatherPage;
