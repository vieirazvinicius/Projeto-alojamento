import express from 'express'
import administradorController from '../controllers/administrador.controller.js'
import autenticacaoMiddleware from '../../../middleware/autenticacao.middleware.js';

const routerAdmin = express.Router();

routerAdmin.post("/cadastrar", administradorController.cadastrar)
routerAdmin.post("/login", administradorController.login)
routerAdmin.get("/perfil/:email", autenticacaoMiddleware.autenticar, administradorController.perfil)

export default routerAdmin