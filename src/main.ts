// Định nghĩa interface cho đối tượng Car
interface Car {
    name: string;
    price: number;
}

// Biến toàn cục đại diện cho số tiền hiện có
let money = 50000;

// Hàm mua xe, trả về một Promise
const buyACar = (car: Car): Promise<string> => {
    return new Promise((resolve, reject) => {
        // Sử dụng setTimeout để mô phỏng một hoạt động bất đồng bộ
        setTimeout(() => {
            if (money >= car.price) {
                money -= car.price;
                // Resolve Promise nếu đủ tiền mua xe
                resolve(`Bought ${car.name} for $${car.price}. Remaining balance: $${money}`);
            } else {
                // Reject Promise nếu không đủ tiền
                reject(`Cannot afford ${car.name}. It costs $${car.price}, but you only have $${money}`);
            }
        }, Math.random() * 1000); // Độ trễ ngẫu nhiên để mô phỏng tình huống thực tế
    });
};

// Hàm kiểm tra tính khả dụng của xe, trả về một Promise
const checkCarAvailability = (car: Car): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mô phỏng kiểm tra ngẫu nhiên xem xe có sẵn hay không
            const isAvailable = Math.random() > 0.5;
            resolve(isAvailable);
        }, Math.random() * 500);
    });
};

// Danh sách các xe cần mua
const cars: Car[] = [
    {name: "Vinfast", price: 10000},
    {name: "Tesla", price: 15000},
    {name: "Toyota", price: 8000},
    {name: "Ferrari", price: 50000}
];

// Hàm chính để mua xe, sử dụng async/await
async function buyCars() {


    try {
        // Xử lý song song: Kiểm tra tính khả dụng của tất cả xe cùng lúc
        console.log("Checking car availability...");
        const availabilityChecks = await Promise.all(cars.map(car => checkCarAvailability(car)));
        const availableCars = cars.filter((_, index) => availabilityChecks[index]);
        console.log("Available cars:", availableCars.map(car => car.name).join(", "));

        // Xử lý tuần tự: Mua từng xe một
        for (const car of availableCars) {
            try {
                // Await từng Promise mua xe
                const result = await buyACar(car);
                console.log(result);
            } catch (error) {
                // Xử lý lỗi cụ thể cho từng giao dịch mua xe
                console.error(error);
                // Tiếp tục với xe tiếp theo nếu không mua được xe hiện tại
            }
        }

        // Kiểm tra cuối cùng
        if (money > 0) {
            console.log(`You have $${money} left.`);
        } else {
            console.log("You've spent all your money on cars!");
        }
    } catch (error) {
        // Xử lý lỗi tổng thể
        console.error("An unexpected error occurred:", error);
    }
}

// Gọi hàm chính
buyCars();

// Output:
// Ví dụ này minh họa các tính chất quan trọng của Promise:
//
// Xử lý bất đồng bộ
// Xử lý song song với Promise.all()
// Xử lý tuần tự với async/await
// Xử lý lỗi chi tiết
// Chaining (chuỗi) các Promise