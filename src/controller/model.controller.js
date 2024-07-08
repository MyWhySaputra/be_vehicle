const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function GetAll(req, res) {
  const {
    name,
    type_id,
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
    contains: name,
    mode: "insensitive",
  }
  if (type_id) payload.type_id = Number(type_id);

  try {
    const resultCount = await prisma.vehicle_model.count({
      where: payload,
    });

    const totalPage = Math.ceil(resultCount / limitNumber);

    const models = await prisma.vehicle_model.findMany({
      take: limitNumber,
      skip: offsetNumber,
      where: payload,
      orderBy: {
        [sort]: sortOrder,
      },
      select: {
        id: true,
        name: true,
        type_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    const pagination = {
      current_page: pageNumber,
      total_page: totalPage,
      total_data: resultCount,
      data: models,
    };

    const cekModels = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekModels(models)) {
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
    const model = await prisma.vehicle_model.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        type_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (model === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    let resp = ResponseTemplate(model, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, error, null, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Create(req, res) {
  const { name, type_id } = req.body;

  const payload = {
    name: name,
    type_id: Number(type_id),
  };

  if (!name || !type_id) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const checktype = await prisma.vehicle_type.findUnique({
      where: {
        id: Number(brand_id),
      },
    });

    if (checktype === null) {
      let resp = ResponseTemplate(null, "type not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    const model = await prisma.vehicle_model.create({
      data: payload,
      select: {
        id: true,
        name: true,
        type_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(model, "success", null, 201);
    res.status(201).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Update(req, res) {
  const { name, type_id } = req.body;
  const { id } = req.params;

  const checkmodel = await prisma.vehicle_model.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (checkmodel === null) {
    let resp = ResponseTemplate(null, "model not found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const payload = {};

  if (type_id) {
    const checktype = await prisma.vehicle_type.findUnique({
      where: {
        id: Number(type_id),
      },
    });

    if (checktype === null) {
      let resp = ResponseTemplate(null, "type not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    payload.type_id = Number(type_id);
  }

  if (name) payload.name = name;

  try {
    if (Object.keys(payload).length === 0) {
      let resp = ResponseTemplate(null, "bad request", null, 400);
      res.status(400).json(resp);
      return;
    }

    const model = await prisma.vehicle_model.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        name: true,
        type_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(model, "success", null, 200);
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
    const checkmodel = await prisma.vehicle_model.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (checkmodel === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    await prisma.vehicle_model.delete({
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
