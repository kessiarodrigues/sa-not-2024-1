import prisma from '../database/client.js';
import bcrypt from 'bcrypt';

const controller = {}; // Objeto vazio

controller.create = async function (req, res) {
  try {
    // Criptografando a senha
    req.body?.password = await bcrypt.hash(req.body?.password, 12);

    await prisma.user.create({ data: req.body });

    // HTTP 201: Created
    res.status(201).end();
  } catch (error) {
    console.log(error);
    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

controller.retrieveAll = async function (req, res) {
  try {
    const result = await prisma.user.findMany();
    // Retorna o resultado com HTTP 200: OK (implícito)

    // Exclui o campo "password" do resultado
    for (let user of result) {
      if (user.password) delete user.password;
    }

    res.send(result);
  } catch (error) {
    console.log(error);
    // HTTP 500: Internal Server Error
    res.status(500).end();
  }
};

controller.retrieveOne = async function (req, res) {
  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });

    // Exclui o campo "password" do resultado
    if (result && result.password) delete result.password;

    // Resultado encontrado ~> HTTP 200: OK (implícito)
    if (result) return res.send(result);
    // Resultado não encontrado ~> HTTP 404: Not Found
    else return res.status(404).end();
  } catch (error) {
    console.log(error);
    // HTTP 500: Internal Server Error
    return res.status(500).end();
  }
};

controller.update = async function (req, res) {
  try {
    const result = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        ...req.body,
        password: await bcrypt.hash(req.body?.password, 12),
      },
    });

    if (result) res.status(204).end();
    else res.status(404).end;
  } catch (error) {
    console.error(error);
    res.status(500).end();
  }
};

controller.delete = async function (req, res) {
  try {
    const result = await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    if (result) res.status(204).end();
  } catch (error) {
    console.error(error);

    res.status(500).send(error);
  }
};

controller.login = async function (req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { username: req.body.username.toLowerCase() },
    });

    if (!user) res.send(401).end();
    const passwordMatches = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatches) res.send(401).end();
    if (user.password) delete user.password;
    const token = jwt.sign(user, process.env.TOKEN_SECRET, {
      expiresIn: '24h',
    });
    res.send(token);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export default controller;
