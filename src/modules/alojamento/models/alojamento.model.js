import conexao from "../../../config/database.js";

class AlojamentoModel {
    static async cadastrar(
        codigo,
        numero,
        bloco,
        capacidade,
        ocupacao
    ){
        const dados = [codigo, numero, bloco, capacidade, ocupacao];
        const query = `insert into alojamento(codigo, numero, bloco, capacidade, ocupacao) values($1, $2, $3, $4,$5) RETURNING *`;
        const resultado = await conexao.query(query, dados);
        return resultado.rows
    }
    static async listarTodos() {
        const query = `select * from alojamento`;
        const resultado = await conexao.query(query);
        return resultado.rows;
    }
    static async listarPorCodigo(codigo) {
        const dados = [codigo];
        const query = `select * from alojamento where codigo = $1`;
        const resultado = await conexao.query(query, dados);
        return resultado.rows;
    }
    static async editarTotal (codigo, novaCapacidade, novaOcupacao){
        const alojamento = await AlojamentoModel.listarPorCodigo(codigo);

        if (alojamento.length === 0) {
            return null;
        }
        const dados = [codigo, novaCapacidade, novaOcupacao];
        const query = `update alojamento set capacidade = $2, ocupacao = $3 where codigo = $1 returning *;`;
        const resultado = await conexao.query(query, dados);
        return resultado.rows;
    }
    static async editarParcial(codigo, novaCapacidade, novaOcupacao){
        const alojamento = await AlojamentoModel.listarPorCodigo(codigo);

        if (alojamento.length === 0){
            return null;
        }

        const dados = [codigo, novaCapacidade, novaOcupacao];
        const query = `update alojamento set capacidade = coalesce($2, capacidade), ocupacao = coalesce($3, ocupacao) where codigo = $1 returning *;`;
        const resultado = await conexao.query(query, dados);
        return resultado.rows;
    }
    static async excluirPorCodigo(codigo){
        const alojamento = await AlojamentoModel.listarPorCodigo(codigo);
        
        if (alojamento.length === 0){
            return null;
        } 
        const dados = [codigo]
        const query = `delete from alojamento where codigo = $1 returning *`
        const resultado = await conexao.query(query, dados)
        return resultado.rows;
    }
    static async excluirTodos(){
        const query = `delete from alojamento returning *`
        const resultado = await conexao.query(query)
        return resultado.rows;
    }
}

export default AlojamentoModel;