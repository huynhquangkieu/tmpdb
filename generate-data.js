const { faker } = require('@faker-js/faker');
const fs = require('fs');

// Set locale
faker.setLocale('vi');

const randomCategoryList = (n) => {
    if (n <= 0) return;

    const categoryList = [];

    Array.from(new Array(n)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.productName(),
            createdAt: Date.now(),
            updateAt: Date.now()
        };

        categoryList.push(category);
    });

    return categoryList

}

const randomProductList = (categoryList, numberOfProducts) => {
    if (numberOfProducts <= 0) return [];

    const productList = [];

    // random data
    for (const category of categoryList) {
        Array.from(new Array(numberOfProducts)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: [
                    faker.color.rgb({ prefix: '#' }),
                    faker.color.rgb({ prefix: '#' }),
                    faker.color.rgb({ prefix: '#' })
                ],
                code: faker.finance.account(6), // 32564
                size: 'XL',
                rating: 5,
                sale: faker.datatype.boolean(),
                ratingCount: faker.datatype.number({ min: 10, max: 50, precision: 1.0 }),
                oldPrice: Number.parseFloat(faker.commerce.price()),
                newPrice: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updateAt: Date.now(),
                imgUrl: faker.image.image(),
                // imgUrl: faker.image.cats(),
                // thumbnaiUrl: faker.image.abstract(400, 400)
                thumbnaiUrl: faker.image.image(400, 400, true)
            }

            productList.push(product)
        })
    }

    return productList
}

// IIFE
(() => {
    // random data
    const categoryList = randomCategoryList(5)
    const productList = randomProductList(categoryList, 5)

    // prepare db object in db.js
    const db = {
        categories: categoryList,
        products: productList,
        profile: {
            name: "Along"
        }
    };


    // write db object to db.json
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log("OKi DATA!!!");
    });
})();