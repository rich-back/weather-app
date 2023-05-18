const weatherCodeToString: {
    [key: number]: {
        icon: string;
        label: string;
    };
} = {
    0: {
        icon: "c01d",
        label: "Clear Sky",
    },
    1: {
        icon: "c02d",
        label: "Mainly Clear",
    },
    2: {
        icon: "c03d",
        label: "Partly Cloudy",
    },
    3: {
        icon: "c04d",
        label: "Overcast",
    },
    45: {
        icon: "a05d",
        label: "Fog",
    },
    48: {
        icon: "a06d",
        label: "Freezing Fog",
    },
    51: {
        icon: "d01d",
        label: "Light Drizzle",
    },
    53: {
        icon: "d02d",
        label: "Moderate Drizzle",
    },
    55: {
        icon: "d03d",
        label: "Dense Drizzle",
    },
    56: {
        icon: "d01d",
        label: "Light Freezing Drizzle",
    },
    57: {
        icon: "d03d",
        label: "Dense Freezing Drizzle",
    },
    61: {
        icon: "r01d",
        label: "Light Rain",
    },
    63: {
        icon: "r02d",
        label: "Moderate Rain",
    },
    65: {
        icon: "r03d",
        label: "Heavy Rain",
    },
    66: {
        icon: "f01d",
        label: "Light Freezing Rain",
    },
    67: {
        icon: "f01d",
        label: "Dense Freezing Rain",
    },
    71: {
        icon: "s01d",
        label: "Light Snow",
    },
    73: {
        icon: "s02d",
        label: "Moderate Snow",
    },
    75: {
        icon: "s03d",
        label: "Heavy Snow",
    },
    77: {
        icon: "s04d",
        label: "Hail",
    },
    80: {
        icon: "r04d",
        label: "Light Rain Showers",
    },
    81: {
        icon: "r05d",
        label: "Moderate Rain Showers",
    },
    82: {
        icon: "r06d",
        label: "Heavy Rain Showers",
    },
    85: {
        icon: "s01d",
        label: "Light Snow Showers",
    },
    86: {
        icon: "s02d",
        label: "Heavy Snow Showers",
    },
    95: {
        icon: "t01d",
        label: "Thunderstorm with Light/Moderate Rain",
    },
    96: {
        icon: "t05d",
        label: "Thunderstorm with Light Hail",
    },
    99: {
        icon: "t05d",
        label: "Thunderstorm with Heavy Hail",
    },
}

export default weatherCodeToString;