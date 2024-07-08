const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetById,
  Create,
  Update,
  Delete,
} = require("../../controller/brand.controller");
const {
  Auth,
  AuthAdmin,
  midd_id,
  midd_brandGetAll,
  midd_brandCreate,
  midd_brandUpdate,
} = require("../../middleware/middleware");

/**
 * @swagger
 * /api/v1/brand/all:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Brand"
 *     summary: Get All Vehicle Brand
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Filter brands by name.
 *         schema:
 *           type: string
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
 *         description: The field to sort by. Can be 'id', 'name', 'created_at', or 'updated_at'. Default is 'created_at'.
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
router.get("/brand/all/", Auth, midd_brandGetAll, GetAll);

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Brand"
 *     summary: Get By Id Vehicle Brand
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of brand
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
router.get("/brand/:id", Auth, midd_id, GetById);

/**
 * @swagger
 * /api/v1/brand:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Brand"
 *     summary: example to create Vehicle Brand
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
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
router.post("/brand/", AuthAdmin, midd_brandCreate, Create);

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Brand"
 *     summary: Update Vehicle Brand"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle Brand
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
router.patch("/brand/:id", AuthAdmin, midd_id, midd_brandUpdate, Update);

/**
 * @swagger
 * /api/v1/brand/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Brand"
 *     summary: Delete Vehicle Brand
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle Brand
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
router.delete("/brand/:id", AuthAdmin, midd_id, Delete);

module.exports = router;
