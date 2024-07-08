const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { HashPassword } = require("../src/helper/hash_pass_helper");

async function main() {
  const password = await HashPassword("admin12345");

  await prisma.users.createMany({
    data: [
      {
        name: "Admin",
        email: "admin@gmail.com",
        password: password,
        is_verified: true,
        is_admin: true,
      },
      {
        name: "User",
        email: "user@gmail.com",
        password: password,
        is_verified: true,
        is_admin: false,
      },
    ],
  });

  await prisma.vehicle_brand.createMany({
    data: [
      { name: "Toyota" },
      { name: "Honda" },
      { name: "Ford" },
      { name: "Chevrolet" },
      { name: "Nissan" },
      { name: "BMW" },
      { name: "Mercedes-Benz" },
      { name: "Volkswagen" },
      { name: "Audi" },
      { name: "Hyundai" },
    ],
  });

  await prisma.vehicle_type.createMany({
    data: [
      { name: "Sedan", brand_id: 1 },
      { name: "SUV", brand_id: 2 },
      { name: "Truck", brand_id: 3 },
      { name: "Coupe", brand_id: 4 },
      { name: "Convertible", brand_id: 5 },
      { name: "Hatchback", brand_id: 6 },
      { name: "Wagon", brand_id: 7 },
      { name: "Van", brand_id: 8 },
      { name: "Minivan", brand_id: 9 },
      { name: "Crossover", brand_id: 10 },
    ],
  });

  await prisma.vehicle_model.createMany({
    data: [
      { name: "Corolla", type_id: 1 },
      { name: "Civic", type_id: 2 },
      { name: "F-150", type_id: 3 },
      { name: "Camaro", type_id: 4 },
      { name: "Altima", type_id: 5 },
      { name: "3 Series", type_id: 6 },
      { name: "C-Class", type_id: 7 },
      { name: "Golf", type_id: 8 },
      { name: "A4", type_id: 9 },
      { name: "Elantra", type_id: 10 },
    ],
  });

  await prisma.vehicle_year.createMany({
    data: [
      { year: 2020 },
      { year: 2019 },
      { year: 2018 },
      { year: 2017 },
      { year: 2016 },
      { year: 2015 },
      { year: 2014 },
      { year: 2013 },
      { year: 2012 },
      { year: 2011 },
    ],
  });

  await prisma.pricelist.createMany({
    data: [
      { user_id: 1, code: "CODE1", price: 20000, year_id: 1, model_id: 1 },
      { user_id: 1, code: "CODE2", price: 18000, year_id: 2, model_id: 2 },
      { user_id: 1, code: "CODE3", price: 25000, year_id: 3, model_id: 3 },
      { user_id: 1, code: "CODE4", price: 30000, year_id: 4, model_id: 4 },
      { user_id: 1, code: "CODE5", price: 22000, year_id: 5, model_id: 5 },
      { user_id: 1, code: "CODE6", price: 27000, year_id: 6, model_id: 6 },
      { user_id: 1, code: "CODE7", price: 35000, year_id: 7, model_id: 7 },
      { user_id: 1, code: "CODE8", price: 40000, year_id: 8, model_id: 8 },
      { user_id: 1, code: "CODE9", price: 23000, year_id: 9, model_id: 9 },
      { user_id: 1, code: "CODE10", price: 21000, year_id: 10, model_id: 10 },
      { user_id: 2, code: "CODE11", price: 24000, year_id: 1, model_id: 2 },
      { user_id: 2, code: "CODE12", price: 19000, year_id: 2, model_id: 3 },
      { user_id: 2, code: "CODE13", price: 26000, year_id: 3, model_id: 4 },
      { user_id: 2, code: "CODE14", price: 31000, year_id: 4, model_id: 5 },
      { user_id: 2, code: "CODE15", price: 23000, year_id: 5, model_id: 6 },
      { user_id: 2, code: "CODE16", price: 28000, year_id: 6, model_id: 7 },
      { user_id: 2, code: "CODE17", price: 36000, year_id: 7, model_id: 8 },
      { user_id: 2, code: "CODE18", price: 41000, year_id: 8, model_id: 9 },
      { user_id: 2, code: "CODE19", price: 24000, year_id: 9, model_id: 10 },
      { user_id: 2, code: "CODE20", price: 22000, year_id: 10, model_id: 1 },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
