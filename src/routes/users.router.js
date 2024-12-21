import {
    Router
} from "express";
import usersController from "../controllers/users.controller.js";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del usuario, string de Mongoose
 *         first_name:
 *           type: string
 *           description: Nombre del usuario
 *         last_name:
 *           type: string
 *           description: Apellido del usuario
 *         email:
 *           type: string
 *           description: Correo del usuario
 *         password:
 *           type: string
 *           description: Hash de la contraseña del usuario.
 *         role:
 *           type: string
 *           description: Rol del usuario
 *         pets:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *                 description: ID de las mascotas
*/
/**
 * @swagger
 * /api/users:
 *      get:
 *          summary: Obtiene las listas de usuarios
 *          tags: [Users]
 *          responses:
 *              200:
 *                  description: Lista de usuarios
 *                  content:
 *                      application/json:
 *                              schema:
 *                                  type: array
 *                                  items:
 *                                  $ref: '#/components/schemas/User'
*/
router.get("/", usersController.getAllUsers);


router.get("/:uid", usersController.getUser);

/**
 * @swagger
 * /api/users/{uid}:
 *   get:
 *     summary: Obtiene un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: Nombre del usuario
 *               last_name:
 *                 type: string
 *                 description: Apellido del usuario
 *               email:
 *                 type: string
 *                 description: Email del usuario
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Error en los datos ingresados o usuario ya existente
 *       500:
 *         description: Error interno del servidor
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
*/
router.put("/:uid", usersController.updateUser);
router.delete("/:uid", usersController.deleteUser);

export default router;