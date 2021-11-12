import { Router } from 'express';
import multer from 'multer';
import * as ApiController from '../controllers/apiController';

const upload = multer({
    dest: './tmp',
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg', 'image/png'];

        console.log('Informações', file);

        cb(null, allowed.includes(file.mimetype));
    },
    limits: { fieldSize: 20000000}
});

const router = Router();

router.get('/ping', ApiController.ping);
router.get('/random', ApiController.random);
router.get('/nome/:nome', ApiController.name);

router.post('/frases', ApiController.createPhrase);
router.get('/frases', ApiController.listPhrases);

router.get('/frase/aleatoria', ApiController.RandomPhrase);

router.get('/frase/:id', ApiController.getPhrase);
router.put('/frase/:id', ApiController.editPhrase);

router.delete('/frase/:id', ApiController.deletePhrase);

router.post('/upload', upload.single('avatar'), ApiController.uploadFile);



export default router;
