var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let money = 50000;
const buyACar = (car) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (money >= car.price) {
                money -= car.price;
                resolve(`Bought ${car.name} for $${car.price}. Remaining balance: $${money}`);
            }
            else {
                reject(`Cannot afford ${car.name}. It costs $${car.price}, but you only have $${money}`);
            }
        }, Math.random() * 1000);
    });
};
const checkCarAvailability = (car) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isAvailable = Math.random() > 0.5;
            resolve(isAvailable);
        }, Math.random() * 500);
    });
};
const cars = [
    { name: "Vinfast", price: 10000 },
    { name: "Tesla", price: 15000 },
    { name: "Toyota", price: 8000 },
    { name: "Ferrari", price: 50000 }
];
function buyCars() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Checking car availability...");
            const availabilityChecks = yield Promise.all(cars.map(car => checkCarAvailability(car)));
            const availableCars = cars.filter((_, index) => availabilityChecks[index]);
            console.log("Available cars:", availableCars.map(car => car.name).join(", "));
            for (const car of availableCars) {
                try {
                    const result = yield buyACar(car);
                    console.log(result);
                }
                catch (error) {
                    console.error(error);
                }
            }
            if (money > 0) {
                console.log(`You have $${money} left.`);
            }
            else {
                console.log("You've spent all your money on cars!");
            }
        }
        catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    });
}
buyCars();
//# sourceMappingURL=main.js.map