import { faker } from '@faker-js/faker';
export function makeCheckoutUser(){ return { firstName: faker.person.firstName(), lastName: faker.person.lastName(), postalCode: faker.location.zipCode() }; }

