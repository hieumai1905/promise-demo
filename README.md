# Ví dụ Promise Nâng cao trong TypeScript

Dự án này minh họa việc sử dụng Promise trong TypeScript thông qua một ví dụ mô phỏng về việc mua xe hơi. Nó bao gồm các khía cạnh khác nhau của lập trình bất đồng bộ như xử lý tuần tự, xử lý song song, và xử lý lỗi.

## Mục lục

- [Tổng quan](#tổng-quan)
- [Cài đặt](#cài-đặt)
- [Cách sử dụng](#cách-sử-dụng)
- [Giải thích code](#giải-thích-code)
- [Giải thích chi tiết](#giải-thích-chi-tiết)
- [Tính năng](#tính-năng)
- [Lưu ý](#lưu-ý)

## Tổng quan

Ví dụ này mô phỏng quá trình mua nhiều xe hơi với một số tiền cho trước. Nó bao gồm việc kiểm tra tính khả dụng của xe và thực hiện giao dịch mua xe, tất cả đều được xử lý bất đồng bộ sử dụng Promise.

## Cài đặt

1. Đảm bảo bạn đã cài đặt Node.js và npm.
2. Clone repository này.
3. Chạy `npm install` để cài đặt các dependencies (nếu có).

## Cách sử dụng

1. Mở terminal trong thư mục dự án.
2. Chạy lệnh sau để biên dịch và thực thi code:

```bash
npx ts-node car-buying-example.ts
```

## Giải thích code

- `buyACar`: Một hàm trả về Promise, mô phỏng quá trình mua xe.
- `checkCarAvailability`: Một hàm trả về Promise, mô phỏng việc kiểm tra tính khả dụng của xe.
- `buyCars`: Hàm chính sử dụng async/await để xử lý quá trình mua nhiều xe.

## Giải thích chi tiết

### 1. Định nghĩa interface và biến

```typescript
interface Car {
    name: string;
    price: number;
}

let money = 50000;
```

- `Car` interface định nghĩa cấu trúc của một đối tượng xe.
- `money` là biến toàn cục đại diện cho số tiền hiện có.

### 2. Hàm buyACar

```typescript
const buyACar = (car: Car): Promise<string> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (money >= car.price) {
                money -= car.price;
                resolve(`Bought ${car.name} for $${car.price}. Remaining balance: $${money}`);
            } else {
                reject(`Cannot afford ${car.name}. It costs $${car.price}, but you only have $${money}`);
            }
        }, Math.random() * 1000);
    });
};
```

- Trả về một Promise đại diện cho quá trình mua xe.
- Sử dụng `setTimeout` để mô phỏng một hoạt động bất đồng bộ.
- Kiểm tra xem có đủ tiền để mua xe không:
  - Nếu đủ, giảm số tiền và resolve Promise với thông báo thành công.
  - Nếu không đủ, reject Promise với thông báo lỗi.

### 3. Hàm checkCarAvailability

```typescript
const checkCarAvailability = (car: Car): Promise<boolean> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const isAvailable = Math.random() > 0.5;
            resolve(isAvailable);
        }, Math.random() * 500);
    });
};
```

- Trả về một Promise đại diện cho quá trình kiểm tra tính khả dụng của xe.
- Sử dụng `Math.random()` để mô phỏng việc xe có sẵn hay không một cách ngẫu nhiên.

### 4. Hàm buyCars

```typescript
async function buyCars() {
    const cars: Car[] = [
        { name: "Vinfast", price: 10000 },
        { name: "Tesla", price: 15000 },
        { name: "Toyota", price: 8000 },
        { name: "Ferrari", price: 50000 }
    ];

    try {
        // Xử lý song song
        console.log("Checking car availability...");
        const availabilityChecks = await Promise.all(cars.map(car => checkCarAvailability(car)));
        const availableCars = cars.filter((_, index) => availabilityChecks[index]);
        console.log("Available cars:", availableCars.map(car => car.name).join(", "));

        // Xử lý tuần tự
        for (const car of availableCars) {
            try {
                const result = await buyACar(car);
                console.log(result);
            } catch (error) {
                console.error(error);
            }
        }

        // Kiểm tra cuối cùng
        if (money > 0) {
            console.log(`You have $${money} left.`);
        } else {
            console.log("You've spent all your money on cars!");
        }
    } catch (error) {
        console.error("An unexpected error occurred:", error);
    }
}
```

- Sử dụng `async/await` để xử lý các Promise một cách tuần tự.
- `Promise.all()` được sử dụng để kiểm tra tính khả dụng của tất cả xe cùng một lúc.
- Vòng lặp `for...of` được sử dụng để mua từng xe một cách tuần tự.
- Xử lý lỗi được thực hiện ở nhiều cấp độ:
  - Cho từng giao dịch mua xe.
  - Cho toàn bộ quá trình (trong khối `try` bên ngoài).

## Tính năng

1. **Xử lý bất đồng bộ**: Sử dụng Promise để xử lý các hoạt động mất thời gian.
2. **Xử lý song song**: Sử dụng `Promise.all()` để kiểm tra tính khả dụng của nhiều xe cùng lúc.
3. **Xử lý tuần tự**: Mua từng xe một cách tuần tự sử dụng vòng lặp với async/await.
4. **Xử lý lỗi**: Sử dụng try/catch để xử lý lỗi ở nhiều cấp độ khác nhau.
5. **Mô phỏng thực tế**: Sử dụng độ trễ ngẫu nhiên để mô phỏng các tình huống thực tế.

## Lưu ý

- Đây là một ví dụ mô phỏng và không thực hiện bất kỳ giao dịch thực nào.
- Code sử dụng TypeScript, vì vậy cần được biên dịch trước khi chạy.
- Ví dụ này tập trung vào việc minh họa cách sử dụng Promise và không đi sâu vào các khía cạnh khác của lập trình.

---
