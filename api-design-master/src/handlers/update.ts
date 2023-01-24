import { User } from '@prisma/client';
import prisma from '../db';



export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            update: true,
        },
    });
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.update];
    }, []);

    res.json({data: updates});
}

//Get one Update 
export const getOneUpdate= async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id,
        },  
    })
    
    res.json({data: update});
}

export const createUpdate = async (req, res) => {

    const product = await prisma.product.findUnique({
        where: {
            id: req.body.id,
        },
    });

    if (!product) {
        return res.status(404).json({error: 'Product not found'});
    }

    const update = await prisma.update.create({
        data: req.body,
    });

    res.json({data: update});
}

export const updateUpdate = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            update: true,
        },
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.update];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);
    
    if (!match) {
        return res.status(404).json({error: 'Update not found'});
    }

    const updated = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });

    res.json({data: updated});
}

export const deleteProduct = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            update: true,
        },
    });

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.update];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);
    
    if (!match) {
        return res.status(404).json({error: 'Update not found'});
    }

    const deleted = await prisma.product.delete({
        where: {
             id: req.params.id,
        },
    })

    res.json({data: deleted});
}
