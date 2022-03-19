const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

const records = [
  {
    id: 1,
    name: "Shirt",
    quantity: 10,
    price: 100,
  },
  {
    id: 2,
    name: "Jacket",
    quantity: 20,
    price: 300,
    additionalInfo: "nice jacket"
  }
];

async function seed() {
  console.log(`Start seeding ...`);
  for (const record of records) {
    let out = await prisma.items.findUnique({
      where: {
        id: record.id
      }
    });
    if (!out) {
      await prisma.items.create({
        data: record
      })
    }
  }
  console.log("Seeding Finished.");
}

seed().catch((e) => {
  console.log(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})