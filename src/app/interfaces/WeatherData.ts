export interface WeatherData {
    main: {
        temp: number;
        humidity: number;
    };
    weather: {
        description: string;
        main: string;
        icon: string;
    }[];
    wind: {
        speed: number;
    };
    name: string;
} 