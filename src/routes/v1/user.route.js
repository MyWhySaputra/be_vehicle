const express = require("express");
const router = express.Router();
const {
  GetAll,
  GetById,
  Update,
  Delete,
} = require("../../controller/user.controller");
const {
  AuthAdmin,
  midd_id,
  midd_userGetAll,
  midd_userUpdate,
} = require("../../middleware/middleware");

/**
 * @swagger
 * /api/v1/user/all:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Get All User
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Filter users by name.
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: Filter users by email.
 *         schema:
 *           type: string
 *       - in: query
 *         name: is_admin
 *         required: false
 *         description: Filter users by is_admin.
 *         schema:
 *           type: boolean
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
 *         description: The field to sort by. Can be 'id', 'name', 'email', 'is_admin', 'created_at', or 'updated_at'. Default is 'created_at'.
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
router.get("/user/all/", AuthAdmin, midd_userGetAll, GetAll);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   get:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Get By Id User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of user
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
router.get("/user/:id", AuthAdmin, midd_id, GetById);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   patch:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Update user
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of user
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
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                is_admin:
 *                  type: boolean
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
router.patch("/user/:id", AuthAdmin, midd_id, midd_userUpdate, Update);

/**
 * @swagger
 * /api/v1/user/{id}:
 *   delete:
 *     security:
 *      - bearerAuth: []
 *     tags:
 *      - "User"
 *     summary: Delete User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The id of user
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
router.delete("/user/:id", AuthAdmin, midd_id, Delete);

module.exports = router;
