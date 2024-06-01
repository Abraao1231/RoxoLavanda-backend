import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { verifyJwt } from '../middleware/authJwt';
import Fastfy from 'fastify';
const app = Fastfy();

const prisma = new PrismaClient();
export let login = async (req, res) => {

    const {email, password} = req.body

    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    });

    if (!user) {
        return res.status(404).send({err: 'Usuário não encontrado'});
    }

    const correctUser = bcrypt.compareSync(password, user.password);

    if (!correctUser) {
        return res.status(400).send({err: 'Senha incorreta'});
    }

    try {        
        const token = await res.jwtSign(user)
            .then(function (token) {
                return { token }
            })
        
        res.status(200).send({user:user, ...token})
        
   } catch(err) {
        
        return res.status(400).send({msg: 'Falha interna', err});
    }
}