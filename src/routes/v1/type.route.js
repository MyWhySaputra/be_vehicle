const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetById,
  Create,
  Update,
  Delete,
} = require("../../controller/type.controller");
const {
  Auth,
  AuthAdmin,
  midd_id,
  midd_typeGetAll,
  midd_typeCreate,
  midd_typeUpdate,
} = require("../../middleware/middleware");

/**
 * @swagger
 * /api/v1/type/all:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Type"
 *     summary: Get All Vehicle Type
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Filter types by name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: brand_id
 *         required: false
 *         description: Filter types by brand_id.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to retrieve. Default is 1. Must be a positive integer.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of items per page. Default is 10. Must be a positive integer.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         required: false
 *         description: The number of items to skip before starting to collect the result set. Must be a non-negative integer.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort
 *         required: false
 *         description: The field to sort by. Can be 'id', 'name', 'brand_id', 'created_at', or 'updated_at'. Default is 'created_at'.
 *         schema:
 *           type: string
 *       - in: query
 *         name: order
 *         required: false
 *         description: The order of sorting. Can be 'asc' for ascending or 'desc' for descending. Default is 'asc'.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/type/all/", Auth, midd_typeGetAll, GetAll);

/**
 * @swagger
 * /api/v1/type/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Type"
 *     summary: Get By Id Vehicle Type
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of type
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/type/:id", Auth, midd_id, GetById);

/**
 * @swagger
 * /api/v1/type:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Type"
 *     summary: example to create Vehicle Type
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                brand_id:
 *                  type: integer
 *     responses:
 *       201:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/type/", AuthAdmin, midd_typeCreate, Create);

/**
 * @swagger
 * /api/v1/type/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Type"
 *     summary: Update Vehicle Type
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle type
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                brand_id:
 *                  type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.patch("/type/:id", AuthAdmin, midd_id, midd_typeUpdate, Update);

/**
 * @swagger
 * /api/v1/type/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Type"
 *     summary: Delete Vehicle Type
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle type
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.delete("/type/:id", AuthAdmin, midd_id, Delete);

module.exports = router;
