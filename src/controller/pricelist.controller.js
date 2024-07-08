const { ResponseTemplate } = require("../helper/template.helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function GetAll(req, res) {
  const {
    code,
    user_id,
    price,
    year_id,
    model_id,
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

  if (code) payload.code = {
    contains: code,
    mode: "insensitive",
  };
  if (user_id) payload.user_id = Number(user_id);
  if (price) payload.price = Number(price);
  if (year_id) payload.year_id = Number(year_id);
  if (model_id) payload.model_id = Number(model_id);

  try {
    const resultCount = await prisma.pricelist.count({
      where: payload,
    });

    const totalPage = Math.ceil(resultCount / limitNumber);

    const pricelists = await prisma.pricelist.findMany({
      take: limitNumber,
      skip: offsetNumber,
      where: payload,
      orderBy: {
        [sort]: sortOrder,
      },
      select: {
        id: true,
        code: true,
        user_id: true,
        price: true,
        year_id: true,
        model_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    const pagination = {
      current_page: pageNumber,
      total_page: totalPage,
      total_data: resultCount,
      data: pricelists,
    };

    const cekPricelist = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekPricelist(pricelists)) {
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
    const pricelist = await prisma.pricelist.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        code: true,
        user_id: true,
        price: true,
        year_id: true,
        model_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (pricelist === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    let resp = ResponseTemplate(pricelist, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, error, null, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Create(req, res) {
  const { code, user_id, price, year_id, model_id } = req.body;

  const payload = {
    code: code,
    user_id: Number(user_id),
    price: Number(price),
    year_id: Number(year_id),
    model_id: Number(model_id),
  };

  if (!code || !user_id || !price || !year_id || !model_id) {
    let resp = ResponseTemplate(null, "bad request", null, 400);
    res.status(400).json(resp);
    return;
  }

  try {
    const checkuser = await prisma.users.findUnique({
      where: {
        id: Number(user_id),
      },
    });

    if (checkuser === null) {
      let resp = ResponseTemplate(null, "user not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    const checkyear = await prisma.vehicle_year.findUnique({
      where: {
        id: Number(year_id),
      },
    });

    if (checkyear === null) {
      let resp = ResponseTemplate(null, "year not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    const checkmodel = await prisma.vehicle_model.findUnique({
      where: {
        id: Number(model_id),
      },
    });

    if (checkmodel === null) {
      let resp = ResponseTemplate(null, "model not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    const pricelist = await prisma.pricelist.create({
      data: payload,
      select: {
        id: true,
        code: true,
        user_id: true,
        price: true,
        year_id: true,
        model_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(pricelist, "success", null, 201);
    res.status(201).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, "internal server error", error, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Update(req, res) {
  const { code, user_id, price, year_id, model_id } = req.body;
  const { id } = req.params;

  const checkpricelist = await prisma.pricelist.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (checkpricelist === null) {
    let resp = ResponseTemplate(null, "pricelist not found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const payload = {};

  if (user_id) {
    const checkuser = await prisma.users.findUnique({
      where: {
        id: Number(user_id),
      },
    });

    if (checkuser === null) {
      let resp = ResponseTemplate(null, "user not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    payload.user_id = Number(user_id);
  }

  if (year_id) {
    const checkyear = await prisma.vehicle_year.findUnique({
      where: {
        id: Number(year_id),
      },
    });

    if (checkyear === null) {
      let resp = ResponseTemplate(null, "year not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    payload.year_id = Number(year_id);
  }

  if (model_id) {
    const checkmodel = await prisma.vehicle_model.findUnique({
      where: {
        id: Number(model_id),
      },
    });

    if (checkmodel === null) {
      let resp = ResponseTemplate(null, "model not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    payload.model_id = Number(model_id);
  }

  if (code) payload.code = code;
  if (price) payload.price = Number(price);

  try {
    if (Object.keys(payload).length === 0) {
      let resp = ResponseTemplate(null, "bad request", null, 400);
      res.status(400).json(resp);
      return;
    }

    const pricelist = await prisma.pricelist.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        code: true,
        user_id: true,
        price: true,
        year_id: true,
        model_id: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(pricelist, "success", null, 200);
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
    const checkpricelist = await prisma.pricelist.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (checkpricelist === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    await prisma.pricelist.delete({
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
