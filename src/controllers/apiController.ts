import {Request, Response} from 'express';
import {Phrase} from '../models/Phrase';
import { Sequelize } from 'sequelize';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const random = (req: Request, res : Response) => {
    let nRand: number = Math.floor( Math.random() * 10);

    res.json({number: nRand});
}

export const name =(req: Request, res: Response) => {
    let nome: string = req.params.nome;
    res.json({nome});
}

export const createPhrase = async (req: Request, res: Response) => {
    let author: string = req.body.author;
    let txt: string = req.body.txt;
    try {
        let newPhrase = await Phrase.create({author, txt}); 

        res.status(201);
        res.json({id: newPhrase.id, author, txt});
    }catch(error) {
        console.log(error);
        res.json({error: 'Alguma coisa deu errado!'});
    }
}

export const listPhrases = async (req: Request, res: Response) => {
    try {
        let list = await Phrase.findAll();
        res.json({list});
    }catch(error) {
        console.log(error);
        res.json({error: 'Alguma coisa deu errado!'});
    }   
}

export const getPhrase = async (req: Request, res: Response) => {
    let {id} = req.params;
    try {
        let phrase = await Phrase.findByPk(id);
        if (phrase)
            res.json({phrase});
        else
            res.json({error: 'Frase não encontrada'})
    }catch(error) {
        console.log(error);
        res.json({error: 'Alguma coisa deu errado!'});
    }
    
}

export const editPhrase = async (req: Request, res: Response) => {
    let {id} = req.params;
    let { author, txt} = req.body;
    try {
        let phrase = await Phrase.findByPk(id);
        if (phrase) {
            phrase.author = author;
            phrase.txt = txt;
            await phrase.save();

            res.json({phrase})
        } else
            res.json({error: 'Frase não encontrada!'});
    }catch(error) {
        console.log(error);
        res.json({error: 'Alguma coisa deu errado!'});
    }
}

export const deletePhrase = async (req: Request, res: Response) => {
    let {id} = req.params;
    try {
        await Phrase.destroy({
            where : { id }
        })
    }catch(error) {
        console.log(error);
        res.json({error: 'Alguma coisa deu errado!'});
    }

    res.json({});
}

export const RandomPhrase = async (req: Request, res: Response) => {
    try {
        let phrase = await Phrase.findOne({
            order: [
                Sequelize.fn('RAND')
            ]
        });
        if (phrase)
            res.json({phrase});
        else
            res.json({error: 'Frase não encontrada!'});
    }catch(error) {
        console.log("ERRO:", error);
        res.json({error: 'Alguma coisa deu errado!'});
    }
}