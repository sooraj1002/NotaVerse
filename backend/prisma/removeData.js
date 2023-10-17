const { PrismaClient } = require('@prisma/client');

async function removeAllData() {
  const prisma = new PrismaClient();

  try {
    // Remove all data from the Note table
    await prisma.note.deleteMany();
    console.log('All note data has been removed.');

    // Remove all data from the User table
    await prisma.user.deleteMany();
    console.log('All user data has been removed.');
  } catch (error) {
    console.error('Error removing data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

removeAllData();
