/*
 Rutas de usuarios
 host + /api/auth
*/
const express = require("express");
const { createAccount, loginAccount, revalidateToken } = require("../controllers/auth");
const router = express.Router();
const { check } = require('express-validator');
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        validateFields
    ], 
    createAccount
    );

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({min:6}),
        validateFields
    ], 
    loginAccount
    );

router.get('/renew', validateJWT ,revalidateToken)

module.exports = router;