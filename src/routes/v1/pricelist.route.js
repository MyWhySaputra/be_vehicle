const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetById,
  Create,
  Update,
  Delete,
} = require("../../controller/pricelist.controller");
const {
  Auth,
  AuthAdmin,
  midd_id,
  midd_pricelistGetAll,
  midd_pricelistCreate,
  midd_pricelistUpdate,
} = require("../../middleware/middleware");

/**
 * @swagger
 * /api/v1/pricelist/all:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Pricelist"
 *     summary: Get All Vehicle Pricelist
 *     parameters:
 *       - in: query
 *         name: code
 *         required: false
 *         description: Filter pricelists by code.
 *         schema:
 *           type: string
 *       - in: query
 *         name: user_id
 *         required: false
 *         description: Filter pricelists by user_id.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: price
 *         required: false
 *         description: Filter pricelists by price.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: year_id
 *         required: false
 *         description: Filter pricelists by year_id.
 *         schema:
 *           type: integer
 *       - in: query
 *         name: model_id
 *         required: false
 *         description: Filter pricelists by model_id.
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
 *         description: The field to sort by. Can be 'id', 'code', 'user_id', 'price', 'year_id', 'model_id', 'created_at', or 'updated_at'. Default is 'created_at'.
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
router.get("/pricelist/all/", Auth, midd_pricelistGetAll, GetAll);

/**
 * @swagger
 * /api/v1/pricelist/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Pricelist"
 *     summary: Get By Id Vehicle Pricelist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of pricelist
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
router.get("/pricelist/:id", Auth, midd_id, GetById);

/**
 * @swagger
 * /api/v1/pricelist:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Pricelist"
 *     summary: example to create Vehicle Pricelist
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: string
 *                user_id:
 *                  type: integer
 *                price:
 *                  type: integer
 *                year_id:
 *                  type: integer
 *                model_id:
 *                  type: integer
 *     responses:
 *       201:
 *         description: Successful response
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/pricelist/", AuthAdmin, midd_pricelistCreate, Create);

/**
 * @swagger
 * /api/v1/pricelist/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Pricelist"
 *     summary: Update Vehicle Pricelist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle Pricelist
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                code:
 *                  type: string
 *                user_id:
 *                  type: integer
 *                price:
 *                  type: integer
 *                year_id:
 *                  type: integer
 *                model_id:
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
router.patch("/pricelist/:id", AuthAdmin, midd_id, midd_pricelistUpdate, Update);

/**
 * @swagger
 * /api/v1/pricelist/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Pricelist"
 *     summary: Delete Vehicle Pricelist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle Pricelist
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
router.delete("/pricelist/:id", AuthAdmin, midd_id, Delete);

module.exports = router;
