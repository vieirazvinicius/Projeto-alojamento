import conexao from "./database.js";

async function criarTabela(){
    try {
       const query = `CREATE TABLE IF NOT EXISTS alojamento (
	codigo varchar(6) NOT NULL,
	numero int4 NOT NULL,
	bloco varchar(30) NOT NULL,
	capacidade int4 NOT NULL,
	ocupacao int4 NOT NULL,
	CONSTRAINT alojamento_pkey PRIMARY KEY (codigo)
);

CREATE TABLE IF NOT EXISTS admins (
	id serial4 NOT NULL,
	nome varchar(100) NOT NULL,
	email varchar(150) NOT NULL,
	senha varchar(255) NOT NULL,
	ativo bool DEFAULT true NOT NULL,
	criado_em timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT admins_email_key UNIQUE (email),
	CONSTRAINT admins_pkey PRIMARY KEY (id)
);`;

await conexao.query(query);
console.log("Tabelas criadas com sucesso!");
    } catch (error) {
        console.error("Erro ao criar as tabelas no banco!", error.message);
    }
}

export default criarTabela