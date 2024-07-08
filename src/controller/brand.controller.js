const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function GetAll(req, res) {
  const {
    name,
    page = 1,
    limit = 10,
    offset,
    sort = "created_at",
    order = "asc",
  } = req.query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const offsetNumber = offset
    ? parseInt(offset)
    : (pageNumber - 1) * limitNumber;
  const sortOrder = order === "asc" ? "asc" : "desc";

  if (
    isNaN(pageNumber) ||
    pageNumber <= 0 ||
    isNaN(limitNumber) ||
    limitNumber <= 0 ||
    isNaN(offsetNumber) ||
    offsetNumber < 0
  ) {
    let resp = ResponseTemplate(
      null,
      "Invalid page, limit, or offset parameter",
      null,
      400
    );
    res.status(400).json(resp);
    return;
  }

  const payload = {};

  if (name) payload.name = {
    contains: name, // Menggunakan `contains` untuk casing insensitive
    mode: "insensitive", // Mode casing insensitive
  };

  try {
    const resultCount = await prisma.vehicle_brand.count({
      where: payload,
    });

    const totalPage = Math.ceil(resultCount / limitNumber);

    const brands = await prisma.vehicle_brand.findMany({
      take: limitNumber,
      skip: offsetNumber,
      where: payload,
      orderBy: {
        [sort]: sortOrder,
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    const pagination = {
      current_page: pageNumber,
      total_page: totalPage,
      total_data: resultCount,
      data: brands,
    };

    const cekBrands = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekBrands(brands)) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    let resp = ResponseTemplate(pagination, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, error, null, 500);
    res.status(500).json(resp);
    return;
  }
}

async function GetById(req, res) {
  const { id } = req.params;

  try {
    const brand = await prisma.vehicle_brand.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (brand === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    let resp = ResponseTemplate(brand, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, error, null, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Create(req, res) {
  const { name } = req.body;

  const payload = {
    name: name,
  };

  try {
    const checkbrand = await prisma.vehicle_brand.findUnique({
      where: {
        name: name,
      },
    });

    if (checkbrand !== null) {
      let resp = ResponseTemplate(null, "data already exist", null, 400);
      res.status(400).json(resp);
      return;
    }

    const brand = await prisma.vehicle_brand.create({
      data: payload,
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(brand, "success", null, 201);
    res.status(201).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Update(req, res) {
  const { name } = req.body;
  const { id } = req.params;

  const checkbrand = await prisma.vehicle_brand.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (checkbrand === null) {
    let resp = ResponseTemplate(null, "data not found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const payload = {};

  if (name) {
    const checkbrand = await prisma.vehicle_brand.findUnique({
      where: {
        name: name,
      },
    });

    if (checkbrand !== null) {
      let resp = ResponseTemplate(null, "data already exist", null, 400);
      res.status(400).json(resp);
      return;
    }

    payload.name = name;
  }

  try {
    if (Object.keys(payload).length === 0) {
      let resp = ResponseTemplate(null, "bad request", null, 400);
      res.status(400).json(resp);
      return;
    }

    const brand = await prisma.vehicle_brand.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(brand, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Delete(req, res) {
  const { id } = req.params;

  try {
    const checkbrand = await prisma.vehicle_brand.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (checkbrand === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    await prisma.vehicle_brand.delete({
      where: {
        id: Number(id),
      },
    });

    let resp = ResponseTemplate(null, "delete success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

module.exports = {
  GetAll,
  GetById,
  Create,
  Update,
  Delete,
};
