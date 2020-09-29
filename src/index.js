const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const {mes} = await prisma.info4.findOne({
    where:{
      id_sensor:1
    }
  })

  console.log(mes)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log("foi")
  });