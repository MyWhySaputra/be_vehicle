const { ResponseTemplate } = require("../helper/template.helper");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

async function Auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    let resp = ResponseTemplate(
      null,
      "Missing or invalid authorization header",
      null,
      400
    );
    res.status(400).json(resp);
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);

    req.user = user;

    next();
  } catch (error) {
    let resp = ResponseTemplate(null, "Unauthorized: Invalid token", null, 401);
    res.status(401).json(resp);
    return;
  }
}

async function AuthAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    let resp = ResponseTemplate(
      null,
      "Missing or invalid authorization header",
      null,
      400
    );
    res.status(400).json(resp);
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);

    if (!user.is_admin) {
      let resp = ResponseTemplate(
        null,
        "Unauthorized: Admin access required",
        null,
        401
      );
      res.status(401).json(resp);
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    let resp = ResponseTemplate(null, "Unauthorized: Invalid token", null, 401);
    res.status(401).json(resp);
    return;
  }
}

function midd_id(req, res, next) {
  const schema = Joi.object({
    id: Joi.number().required(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_register(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    is_admin: Joi.boolean().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_login(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }

  next();
}

function midd_forget(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }

  next();
}

function midd_userGetAll(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255),
    email: Joi.string().max(255),
    is_admin: Joi.boolean(),
    page: Joi.number().min(0),
    limit: Joi.number().min(0),
    offset: Joi.number().min(0),
    sort: Joi.string().valid("id", "name", "email", "is_admin", "created_at", "updated_at"),
    order: Joi.string().valid("asc", "desc"),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }

  next();
}

function midd_userUpdate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).allow(""),
    email: Joi.string().email().allow(""),
    password: Joi.string().min(6).allow(""),
    is_admin: Joi.boolean().allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_brandGetAll(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255),
    page: Joi.number().min(0),
    limit: Joi.number().min(0),
    offset: Joi.number().min(0),
    sort: Joi.string().valid("id", "name", "created_at", "updated_at"),
    order: Joi.string().valid("asc", "desc"),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }

  next();
}

function midd_brandCreate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_brandUpdate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_typeGetAll(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255),
    brand_id: Joi.number().min(0),
    page: Joi.number().min(0),
    limit: Joi.number().min(0),
    offset: Joi.number().min(0),
    sort: Joi.string().valid("id", "name", "brand_id", "created_at", "updated_at"),
    order: Joi.string().valid("asc", "desc"),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }

  next();
}

function midd_typeCreate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    brand_id: Joi.number().min(0).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_typeUpdate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).allow(""),
    brand_id: Joi.number().min(0).allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_modelGetAll(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255),
    type_id: Joi.number().min(0),
    page: Joi.number().min(0),
    limit: Joi.number().min(0),
    offset: Joi.number().min(0),
    sort: Joi.string().valid("id", "name", "type_id", "created_at", "updated_at"),
    order: Joi.string().valid("asc", "desc"),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }

  next();
}

function midd_modelCreate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    type_id: Joi.number().min(0).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_modelUpdate(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().max(255).allow(""),
    type_id: Joi.number().min(0).allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_yearGetAll(req, res, next) {
  const schema = Joi.object({
    year: Joi.number().min(0),
    page: Joi.number().min(0),
    limit: Joi.number().min(0),
    offset: Joi.number().min(0),
    sort: Joi.string().valid("id", "year", "created_at", "updated_at"),
    order: Joi.string().valid("asc", "desc"),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }

  next();
}

function midd_yearCreate(req, res, next) {
  const schema = Joi.object({
    year: Joi.number().min(0).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_yearUpdate(req, res, next) {
  const schema = Joi.object({
    year: Joi.number().min(0).allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_pricelistGetAll(req, res, next) {
  const schema = Joi.object({
    code: Joi.string().max(255),
    user_id: Joi.number().min(0),
    price: Joi.number().min(0),
    year_id: Joi.number().min(0),
    model_id: Joi.number().min(0),
    page: Joi.number().min(0),
    limit: Joi.number().min(0),
    offset: Joi.number().min(0),
    sort: Joi.string().valid("id", "code", "user_id", "price", "year_id", "model_id", "created_at", "updated_at"),
    order: Joi.string().valid("asc", "desc"),
  });

  const { error } = schema.validate(req.query);

  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }

  next();
}

function midd_pricelistCreate(req, res, next) {
  const schema = Joi.object({
    code: Joi.string().max(255).required(),
    user_id: Joi.number().min(0).required(),
    price: Joi.number().min(0).required(),
    year_id: Joi.number().min(0).required(),
    model_id: Joi.number().min(0).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

function midd_pricelistUpdate(req, res, next) {
  const schema = Joi.object({
    code: Joi.string().max(255).allow(""),
    user_id: Joi.number().min(0).allow(""),
    price: Joi.number().min(0).allow(""),
    year_id: Joi.number().min(0).allow(""),
    model_id: Joi.number().min(0).allow(""),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    let resp = ResponseTemplate(
      null,
      "invalid request",
      error.details[0].message,
      400
    );
    res.status(400).json(resp);
    return;
  }
  next();
}

module.exports = {
  Auth,
  AuthAdmin,
  midd_id,
  midd_register,
  midd_login,
  midd_forget,
  midd_userGetAll,
  midd_userUpdate,
  midd_brandGetAll,
  midd_brandCreate,
  midd_brandUpdate,
  midd_typeGetAll,
  midd_typeCreate,
  midd_typeUpdate,
  midd_modelGetAll,
  midd_modelCreate,
  midd_modelUpdate,
  midd_yearGetAll,
  midd_yearCreate,
  midd_yearUpdate,
  midd_pricelistGetAll,
  midd_pricelistCreate,
  midd_pricelistUpdate,
};
