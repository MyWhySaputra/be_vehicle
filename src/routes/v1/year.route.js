const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetById,
  Create,
  Update,
  Delete,
} = require("../../controller/year.controller");
const {
  Auth,
  AuthAdmin,
  midd_id,
  midd_yearGetAll,
  midd_yearCreate,
  midd_yearUpdate,
} = require("../../middleware/middleware");

/**
 * @swagger
 * /api/v1/year/all:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Year"
 *     summary: Get All Vehicle Year
 *     parameters:
 *       - in: query
 *         name: year
 *         required: false
 *         description: Filter years by year.
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
 *         description: The field to sort by. Can be 'id', 'year', 'created_at', or 'updated_at'. Default is 'created_at'.
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
router.get("/year/all/", Auth, midd_yearGetAll, GetAll);

/**
 * @swagger
 * /api/v1/year/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Year"
 *     summary: Get By Id Vehicle Year
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of year
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
router.get("/year/:id", Auth, midd_id, GetById);

/**
 * @swagger
 * /api/v1/year:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Year"
 *     summary: example to create Vehicle Year
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                year:
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
router.post("/year/", AuthAdmin, midd_yearCreate, Create);

/**
 * @swagger
 * /api/v1/year/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Year"
 *     summary: Update Vehicle Year
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle Year
 *         schema:
 *           type: integer
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                year:
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
router.patch("/year/:id", AuthAdmin, midd_id, midd_yearUpdate, Update);

/**
 * @swagger
 * /api/v1/year/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Year"
 *     summary: Delete Vehicle Year
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle Year
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
router.delete("/year/:id", AuthAdmin, midd_id, Delete);

module.exports = router;
