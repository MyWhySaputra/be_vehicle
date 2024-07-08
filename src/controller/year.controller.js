const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function GetAll(req, res) {
  const {
    year,
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

  if (year) payload.year = Number(year);

  try {
    const resultCount = await prisma.vehicle_year.count({
      where: payload,
    });

    const totalPage = Math.ceil(resultCount / limitNumber);

    const years = await prisma.vehicle_year.findMany({
      take: limitNumber,
      skip: offsetNumber,
      where: payload,
      orderBy: {
        [sort]: sortOrder,
      },
      select: {
        id: true,
        year: true,
        created_at: true,
        updated_at: true,
      },
    });

    const pagination = {
      current_page: pageNumber,
      total_page: totalPage,
      total_data: resultCount,
      data: years,
    };

    const cekYears = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekYears(years)) {
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
    const year = await prisma.vehicle_year.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        year: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (year === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    let resp = ResponseTemplate(year, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, error, null, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Create(req, res) {
  const { year } = req.body;

  const payload = {
    year: Number(year),
  };

  const checkyear = await prisma.vehicle_year.findUnique({
    where: {
      year: Number(year),
    },
  });

  if (checkyear !== null) {
    let resp = ResponseTemplate(null, "data already exist", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const year = await prisma.vehicle_year.create({
      data: payload,
      select: {
        id: true,
        year: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(year, "success", null, 201);
    res.status(201).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Update(req, res) {
  const { year } = req.body;
  const { id } = req.params;

  const checkyear = await prisma.vehicle_year.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (checkyear === null) {
    let resp = ResponseTemplate(null, "data not found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const payload = {};

  if (year) {
    const checkyear = await prisma.vehicle_year.findUnique({
      where: {
        year: Number(year),
      },
    });

    if (checkyear !== null) {
      let resp = ResponseTemplate(null, "data already exist", null, 400);
      res.status(400).json(resp);
      return;
    }

    payload.year = Number(year);
  }

  try {
    const year = await prisma.vehicle_year.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        year: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(year, "success", null, 200);
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
    const checkyear = await prisma.vehicle_year.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (checkyear === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    await prisma.vehicle_year.delete({
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
