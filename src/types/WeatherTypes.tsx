export interface WeatherProps {
  data: {
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
      humidity: number;
      pressure: number;
    };
    visibility: number;
    wind: {
      speed: number;
    };
    clouds: {
      all: number;
    };
    name: string;
    sys: {
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    weather: [
      {
        icon: string;
        description: string;
      }
    ];
  };
}
