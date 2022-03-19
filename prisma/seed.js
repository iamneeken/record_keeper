const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const records = [
  {
    name: "Shirt",
    quantity: 10,
    price: 100,
  },
  {
    name: "Jacket",
    quantity: 20,
    price: 300,
  }
];

async function seed() {
  console.log(`Start seeding ...`);
  for (const record of records) {
    await prisma.items.create({
      data: record
    })
  }
  console.log("Seeding Finished.");
}

seed().catch((e) => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})