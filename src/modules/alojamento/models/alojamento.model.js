import conexao from "/src/config/database.js"

class AlojamentoModel {
    static async cadastrar(
        codigo,
        numero,
        bloco,
        capacidade,
        ocupacao
    ){
        const dados = [codigo, numero, bloco, capacidade, ocupacao];
        const query = `insert into alojamento(numero, bloco, capacidade, ocupacao) values($1, $2, $3, $4,$5) RETURNING *`;
        const resultado = await conexao.query(query, dados);
        return resultado.rows
    }
    static async listarTodos() {
        const query = `select * from alojamento`;
        const resultado = await conexao.query(query);
        return resultado.rows;
    }
    static async listarPorAlojamento(codigo) {
        const dados = [codigo];
        const query = `select * from alojamento where codigo = $1`;
        const resultado = await conexao.query(query, dados);
        return resultado.rows;
    }
    // static async editarTotal(codigo,)

}