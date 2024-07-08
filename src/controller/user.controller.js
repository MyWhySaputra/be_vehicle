const { ResponseTemplate } = require("../helper/template.helper");
const { HashPassword } = require("../helper/hash_pass_helper");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function GetAll(req, res) {
  const {
    name,
    email,
    is_admin,
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
  if (email) payload.email = {
    contains: email,
    mode: "insensitive",
  }
  if (is_admin) payload.is_admin = is_admin;

  try {
    const resultCount = await prisma.users.count({
      where: payload,
    });

    const totalPage = Math.ceil(resultCount / limitNumber);

    const users = await prisma.users.findMany({
      take: limitNumber,
      skip: offsetNumber,
      where: payload,
      orderBy: {
        [sort]: sortOrder,
      },
      select: {
        id: true,
        name: true,
        email: true,
        is_verified: true,
        is_admin: true,
        created_at: true,
        updated_at: true,
      },
    });

    const pagination = {
      current_page: pageNumber,
      total_page: totalPage,
      total_data: resultCount,
      data: users,
    };

    const cekUsers = (objectName) => {
      return Object.keys(objectName).length === 0;
    };

    if (cekUsers(users)) {
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
    const user = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        name: true,
        email: true,
        is_verified: true,
        is_admin: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (user === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    let resp = ResponseTemplate(user, "success", null, 200);
    res.status(200).json(resp);
    return;
  } catch (error) {
    let resp = ResponseTemplate(null, error, null, 500);
    res.status(500).json(resp);
    return;
  }
}

async function Update(req, res) {
  const { name, email, password, is_admin } = req.body;
  const { id } = req.params;

  const hashPass = await HashPassword(password);

  const checkuser = await prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (checkuser === null) {
    let resp = ResponseTemplate(null, "data not found", null, 404);
    res.status(404).json(resp);
    return;
  }

  const payload = {};

  if (name) payload.name = name;

  if (email) {
    const checkEmail = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (checkEmail !== null) {
      let resp = ResponseTemplate(null, "email already exist", null, 400);
      res.status(400).json(resp);
      return;
    }

    payload.email = email;
  }
  
  if (password) payload.password = hashPass;

  if (is_admin) payload.is_admin = is_admin;

  try {
    if (Object.keys(payload).length === 0) {
      let resp = ResponseTemplate(null, "bad request", null, 400);
      res.status(400).json(resp);
      return;
    }

    const user = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: payload,
      select: {
        id: true,
        name: true,
        email: true,
        is_verified: true,
        is_admin: true,
        created_at: true,
        updated_at: true,
      },
    });

    let resp = ResponseTemplate(user, "success", null, 200);
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
    const checkuser = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (checkuser === null) {
      let resp = ResponseTemplate(null, "data not found", null, 404);
      res.status(404).json(resp);
      return;
    }

    await prisma.users.delete({
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
  Update,
  Delete,
};
