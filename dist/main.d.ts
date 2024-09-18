interface Car {
    name: string;
    price: number;
}
declare let money: number;
declare const buyACar: (car: Car) => Promise<string>;
declare const checkCarAvailability: (car: Car) => Promise<boolean>;
declare const cars: Car[];
declare function buyCars(): Promise<void>;
