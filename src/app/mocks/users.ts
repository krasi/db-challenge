import { faker } from '@faker-js/faker';
import { type User } from '../types/User';

export const usersMock: User[] = [
  {
    id: 1,
    email: 'admin@example.com',
    name: 'Krasimir Stavrev',
    title: 'Senior Software Engineer',
    department: 'Technology',
    admin: true,
  },
  {
    id: 2,
    email: 'user@example.com',
    name: 'User Stavrev',
    title: 'Software Engineer',
    department: 'Technology',
  },
  ...Array(65)
    .fill(null)
    .map((_, i) => ({
      id: i + 3,
      email: faker.internet.email(),
      name: faker.person.fullName(),
      title: faker.person.jobTitle(),
      department:
        ['Technology', 'Marketing', 'Human Resources', 'Accounting'].find(
          (_, index) => Math.round(Math.random() * 3) === index,
        ) || 'Technology',
    })),
];
