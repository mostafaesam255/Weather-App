    export interface Weather {
        name: string;
        main: {
        temp: number;
        };
        weather: {
        description: string;
        icon: string;
        }[];
    }
    
    export interface Forecast {
        list: {
        dt_txt: string;
        main: {
            temp: number;
        };
        weather: {
            description: string;
            icon: string;
        }[];
        }[];
    }