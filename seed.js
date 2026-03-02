const mysql = require('mysql2/promise');
const { faker } = require('@faker-js/faker');

const USERS_COUNT = 10000;
const PRODUCTS_COUNT = 5000;
const ORDERS_COUNT = 50000;

async function seedDatabase() {

  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'hatsstah',
    database: 'api_performance',
    multipleStatements: true
  });

  console.log(" Seeding started...");

  await db.beginTransaction();

  try {

    // ===============================
    // 1️ USERS (Bulk Insert)
    // ===============================

    let usersValues = [];
    for (let i = 0; i < USERS_COUNT; i++) {
      usersValues.push([
        faker.person.fullName(),
        faker.internet.email()
      ]);
    }

    await db.query(
      "INSERT INTO users (name, email) VALUES ?",
      [usersValues]
    );

    console.log(" Users inserted");

    // ===============================
    // 2️ PRODUCTS (Bulk Insert)
    // ===============================

    let productsValues = [];
    for (let i = 0; i < PRODUCTS_COUNT; i++) {
      productsValues.push([
        faker.commerce.productName(),
        parseFloat(faker.commerce.price({ min: 10, max: 500 })),
        faker.number.int({ min: 10, max: 200 })
      ]);
    }

    await db.query(
      "INSERT INTO products (name, price, stock) VALUES ?",
      [productsValues]
    );

    console.log(" Products inserted");

    // ===============================
    // 3️ ORDERS + ORDER_ITEMS
    // ===============================

    let ordersValues = [];
    let orderItemsValues = [];

    for (let i = 1; i <= ORDERS_COUNT; i++) {

      const userId = faker.number.int({ min: 1, max: USERS_COUNT });
      const numberOfItems = faker.number.int({ min: 1, max: 5 });

      let total = 0;

      for (let j = 0; j < numberOfItems; j++) {

        const productId = faker.number.int({ min: 1, max: PRODUCTS_COUNT });
        const quantity = faker.number.int({ min: 1, max: 5 });

        // prix simulé (on suppose moyenne 100)
        const price = faker.number.float({ min: 10, max: 500, precision: 0.01 });

        total += price * quantity;

        orderItemsValues.push([
          i,          // order_id
          productId,
          quantity,
          price
        ]);
      }

      ordersValues.push([
        userId,
        total
      ]);
    }

    await db.query(
      "INSERT INTO orders (user_id, total) VALUES ?",
      [ordersValues]
    );

    await db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?",
      [orderItemsValues]
    );

    console.log(" Orders and Order Items inserted");

    await db.commit();
    console.log(" Seeding completed successfully!");

  } catch (err) {

    await db.rollback();
    console.error(" Error:", err);

  } finally {
    await db.end();
    process.exit();
  }
}

seedDatabase();