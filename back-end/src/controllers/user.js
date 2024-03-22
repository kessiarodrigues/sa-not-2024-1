import prisma from '../database/client.js';

const controller = {}

controller.create = async (req, res) => {
    try{
        await prisma.user.create({
            data: req.body
        })  
        res.status(201).end()
    }
    catch (error){
        console.log(error)
        res.status(500).end()
    }
};

export default controller;
