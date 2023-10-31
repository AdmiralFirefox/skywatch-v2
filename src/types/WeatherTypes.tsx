export interface WeatherProps {
  data: {
    main: {
      temp: number;
      temp_min: number;
      temp_max: number;
    };
    name: string;
    sys: {
      country: string;
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
