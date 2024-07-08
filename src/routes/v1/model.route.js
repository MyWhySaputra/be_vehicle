const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetById,
  Create,
  Update,
  Delete,
} = require("../../controller/model.controller");
const {
  Auth,
  AuthAdmin,
  midd_id,
  midd_modelGetAll,
  midd_modelCreate,
  midd_modelUpdate,
} = require("../../middleware/middleware");

/**
 * @swagger
 * /api/v1/model/all:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Model"
 *     summary: Get All Vehicle Model
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Filter models by name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: type_id
 *         required: false
 *         description: Filter models by type_id.
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
 *         description: The field to sort by. Can be 'id', 'name', 'type_id', 'created_at', or 'updated_at'. Default is 'created_at'.
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
router.get("/model/all/", Auth, midd_modelGetAll, GetAll);

/**
 * @swagger
 * /api/v1/model/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Model"
 *     summary: Get By Id Vehicle Model
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of model
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
router.get("/model/:id", Auth, midd_id, GetById);

/**
 * @swagger
 * /api/v1/model:
 *   post:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Model"
 *     summary: example to create Vehicle Model
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                type_id:
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
router.post("/model/", AuthAdmin, midd_modelCreate, Create);

/**
 * @swagger
 * /api/v1/model/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Model"
 *     summary: Update Vehicle Model
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle Model"
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
 *                type_id:
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
router.patch("/model/:id", AuthAdmin, midd_id, midd_modelUpdate, Update);

/**
 * @swagger
 * /api/v1/model/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "Vehicle Model"
 *     summary: Delete Vehicle Model
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of Vehicle Model
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
router.delete("/model/:id", AuthAdmin, midd_id, Delete);

module.exports = router;
