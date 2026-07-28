import express from 'express'
import AlojamentoController from '../controllers/alojamento.controller.js';
import autenticacaoMiddleware from '../../../middleware/autenticacao.middleware.js';

const router = express.Router();

router.get("/listar", autenticacaoMiddleware.autenticar,AlojamentoController.listarTodos)
router.get("/listar/:codigo", autenticacaoMiddleware.autenticar, AlojamentoController.listarPorCodigo)
router.post("/cadastrar", autenticacaoMiddleware.autenticar, AlojamentoController.cadastrar)
router.put("/editar/total/:codigo", autenticacaoMiddleware.autenticar, AlojamentoController.editarTotal)
router.patch("/editar/parcial/:codigo", autenticacaoMiddleware.autenticar, AlojamentoController.editarParcial)
router.delete("/excluir/:codigo", autenticacaoMiddleware.autenticar, AlojamentoController.excluirPorCodigo)
router.delete("/excluir", autenticacaoMiddleware.autenticar, AlojamentoController.excluirTodos)

export default router