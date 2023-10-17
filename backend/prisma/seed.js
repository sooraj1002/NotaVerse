const argon = require('argon2');
const { PrismaClient } = require('@prisma/client');
const notesData = require('./seedData.js');

const prisma = new PrismaClient();

async function seedData() {
  // Insert a user with the specified credentials
  const hash = await argon.hash('sooraj');
  const newUser = await prisma.user.create({
    data: {
      firstName: 'Slim',
      lastName: 'Shady',
      email: 'sooraj@gmail.com',
      hash: hash,
    },
  });

  console.log('User created:', newUser);

  for (const note of notesData) {
    const { id, ...noteData } = note;

    await prisma.note.create({
      data: {
        ...noteData,
        userId: newUser.id,
      },
    });
  }
}

async function main() {
  try {
    await seedData();
    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
