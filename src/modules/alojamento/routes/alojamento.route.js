import express from 'express'
import AlojamentoController from '../controllers/alojamento.controller.js';

const router = express.Router();

router.get("/listar", AlojamentoController.listarTodos)
router.get("/listar/:codigo", AlojamentoController.listarPorCodigo)
router.post("/cadastrar", AlojamentoController.cadastrar)
router.put("/editar/total/:codigo", AlojamentoController.editarTotal)
router.patch("/editar/parcial/:codigo", AlojamentoController.editarParcial)
router.delete("/excluir/:codigo", AlojamentoController.excluirPorCodigo)
router.delete("/excluir", AlojamentoController.excluirTodos)

export default router