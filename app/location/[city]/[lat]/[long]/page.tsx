import { getClient } from "@/apollo-client";
import CalloutCard from "@/components/CalloutCard";
import StatCard from "@/components/StatCard";
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

  return (
    <div>
      {/* <InfoPanel /> */}

      <div>
        <div className="p-5">
          <div className="pb-5">
            <h2 className="text-xl font-bold">Today's Overview</h2>
            <p className="text-sm text-gray-400">
              Last Updated at:{" "}
              {new Date(results.current_weather.time).toLocaleString()} (
              {results.timezone})
            </p>
          </div>

          <div>
            <CalloutCard message="This is where the GPT-4 summary goes..." />
          </div>

          <div>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
