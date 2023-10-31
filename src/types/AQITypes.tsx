export interface AQIProps {
  data: {
    list: [
      {
        main: {
          aqi: number;
        };
      }
    ];
  };
}
