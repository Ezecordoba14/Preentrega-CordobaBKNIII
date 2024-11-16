import { faker } from "@faker-js/faker";
import { createHash } from "../utils/index.js";

export function generateMockPets(number) {
    const pets = [];

    for (let i = 0; i < number; i++) {
        pets.push({
            name: faker.person.firstName(),
            specie: faker.animal.type(),
            birthDate: faker.date.past(5),
            adopted: false,
            owner: null,
            image: faker.image.url()
        });
    }
    return pets;
}

export async function generateMockUsers(number) {
    const users = [];
    for (let i = 0; i < number; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: await createHash('coder123'),
            role: Math.random() < 0.5 ? 'user' : 'admin',
            pets: []
        });
    }
    return users;

}