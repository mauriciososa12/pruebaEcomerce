import { faker } from '@faker-js/faker'


faker.locale = "es"

export const generateUserFaker = () => {

    const numOfProducts = parseInt(faker.random.numeric(1, { bannedDigits: ["0"] }));
    const productsFaker = []

    for (let i = 0; i < numOfProducts; i++) {
        productsFaker.push(generateProduct())
    }

    return {
        name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        birthDate: faker.date.birthdate(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        sex: faker.name.sex(),
        productsFaker,
    }
}

export const generateProduct = () => {

    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        stock: faker.random.numeric(1),
        id: faker.database.mongodbObjectId(),
        image: faker.image.image()
    }

}