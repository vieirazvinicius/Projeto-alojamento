import AlojamentoModel from "../models/alojamento.model.js";

class AlojamentoController {
  static async cadastrar(requisicao, resposta) {
    try {
      const { codigo, numero, bloco, capacidade, ocupacao } =
        requisicao.body;
      if (
        !codigo ||
        !numero ||
        !bloco ||
        !capacidade ||
        !ocupacao 
        ) {
        return resposta
          .status(400)
          .json({ mensagem: "Todos os campos são obrigatorios!" });
      }
      await AlojamentoModel.cadastrar(
        codigo,
        numero,
        bloco,
        capacidade,
        ocupacao
      );
      resposta
        .status(201)
        .json({ mensagem: "Cadastro realizado com sucesso!" });
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao cadastrar alojamento!", erro: error.message });
    }
  }
  static async listarTodos(requisicao, resposta) {
    try {
      const alojamento = await AlojamentoModel.listarTodos();
      if (alojamento.length === 0) {
        return resposta
          .status(200)
          .json({ mensagem: "Nenhum alojamento cadastrado!" });
      }
      resposta.status(200).json(alojamento);
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao listar alojamentos!", erro: error.message });
    }
  }
  static async listarPorCodigo(requisicao, resposta) {
    try {
      const codigo = requisicao.params.codigo;
      const alojamento = await AlojamentoModel.listarPorCodigo(codigo);
      if (!alojamento) {
        return resposta
          .status(200)
          .json({ mensagem: "Alojamento não encontrado!" });
      }
      resposta.status(200).json(alojamento);
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao listar o alojamento", erro: error.message });
    }
  }
  static async editarTotal(requisicao, resposta) {
    try {
      const codigo = requisicao.params.codigo;
      const { novaCapacidade, novaOcupacao } = requisicao.body;
      const alojamento = await AlojamentoModel.editarTotal(
        codigo,
        novaCapacidade,
        novaOcupacao,
      );
      resposta.status(200).json(alojamento);
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao editar o alojamento!", erro: error.message });
    }
  }
  static async editarParcial(requisicao, resposta) {
    try {
      const codigo = requisicao.params.codigo;
      const { novaCapacidade, novaOcupacao } = requisicao.body;
      const alojamento = await AlojamentoModel.editarParcial(
        codigo,
        novaCapacidade,
        novaOcupacao,
      );
      if(!alojamento){
        return resposta.status(400).json({mensagem: "alojamento não encontrado"})
      }
      resposta.status(200).json(alojamento);
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao editar o alojamento!", erro: error.message });
    }
  }
  static async excluirTodos(requisicao, resposta) {
    try {
      await AlojamentoModel.excluirTodos();
      resposta
        .status(200)
        .json({ mensagem: "Todos os alojamentos foram excluídos!" });
    } catch (error) {
      resposta
        .status(500)
        .json({
          mensagem: "Erro ao excluir todos os alojamentos!",
          erro: error.message,
        });
    }
  }
  static async excluirPorCodigo(requisicao, resposta) {
    try {
      const codigo = requisicao.params.codigo;
      await AlojamentoModel.excluirPorCodigo(codigo);
      resposta.status(200).json({ mensagem: "alojamento excluido com sucesso!" });
    } catch (error) {
      resposta
        .status(500)
        .json({ mensagem: "Erro ao excluir alojamento!", erro: error.message });
    }
  }
}
export default AlojamentoController;