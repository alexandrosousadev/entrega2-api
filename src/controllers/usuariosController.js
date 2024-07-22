import UsuariosServices from "../services/usuariosServices.js";

const usuariosServices = new UsuariosServices();

class UsuariosController {
    static async criarNovo(req, res) {
        const { nome, email, senha } = req.body;

        if (!nome || !email || !senha) {
            throw new Error('Nome, email e senha são obrigatórios');
        }

        try {
            const novoUsuario = await usuariosServices.criarNovo({nome, email, senha});

            res.status(201).send({message:'Registro criado com sucesso', novoUsuario})
        } catch (erro) {
            res.status(500).send({ erro: erro.message });
        }
    }

    static async buscarTodosOsUsuarios(req, res) {
        try {
            const listaUsuarios = await usuariosServices.buscarTodosOsUsuarios();

            res.status(200).send(listaUsuarios);
        } catch (erro) {
            res.status(500).send({ erro: erro.message });
        }
    }

    static async buscarUsuarioPorId(req, res) {
        const { id } = req.params;

        if (!id) {
            throw new Error('Id é obrigatório');
        }

        try {
            const usuario = await usuariosServices.buscarUsuarioPorId({ id });

            res.status(200).send(usuario);
        } catch (erro) {
            res.status(500).send({ erro: erro.message });
        }
    }

    static async atualizarUsuario(req, res) {
        const { id } = req.params;
        const { nome, email, reputacao } = req.body;

        if (!id) {
            throw new Error('Id é obrigatório');
        }

        try {
            const usuarioAtualizado = await usuariosServices.atualizarUsuario({ id, nome, email, reputacao });

            res.status(200).send(usuarioAtualizado);
        } catch (erro) {
            res.status(500).send({ erro: erro.message });
        }
    }
}

export default UsuariosController;