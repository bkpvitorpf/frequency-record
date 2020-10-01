const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const response = await prisma.info4.findMany({
    where:{
      id_sensor:1
    }
  })

  console.log(response)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log("foi")
  });