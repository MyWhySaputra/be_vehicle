const express = require("express");
const router = express.Router();
const {
  register,
  login,
  verifyEmail,
  forgetPassword,
  resetPassword,
} = require("../../controller/auth.controller");
const {
  midd_register,
  midd_login,
  midd_forget,
} = require("../../middleware/middleware");

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to register User
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
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.post("/auth/register", midd_register, register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to login with email and password
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/auth/login", midd_login, login);

/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   get:
 *     tags:
 *      - "Auth"
 *     summary: example to verify email
 *     parameters:
 *       - in: query
 *         name: token
 *         required: false
 *         description: The token for verify email
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.get("/auth/verify-email", verifyEmail);

/**
 * @swagger
 * /api/v1/auth/forget-password:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to forget password
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/auth/forget-password", midd_forget, forgetPassword);

/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     tags:
 *      - "Auth"
 *     summary: example to reset password
 *     parameters:
 *       - in: query
 *         name: token
 *         required: false
 *         description: The token for reset password
 *         schema:
 *           type: string
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                newPassword:
 *                  type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       400:
 *         description: Bad request
 */
router.post("/auth/reset-password", resetPassword);

module.exports = router;
