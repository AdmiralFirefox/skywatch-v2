export interface ForecastProps {
  data: {
    list: [
      {
        dt: number;
        main: {
          temp: string;
        };
        weather: [
          {
            main: string;
            icon: string;
          }
        ];
      }
    ];
    city: {
      timezone: number;
    };
  };
}

export interface SectionThreeProps {
  forecastLoading: boolean;
  forecastError: boolean;
  forecastData:
    | {
        list: [
          {
            dt: number;
            main: {
              temp: string;
            };
            weather: [
              {
                main: string;
                icon: string;
              }
            ];
          }
        ];
        city: {
          timezone: number;
        };
      }
    | undefined;
}
