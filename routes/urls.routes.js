
import express from "express";
const router = express.Router();


router.get('/', (req, res) => {
    res.send('This will show all short links');
});

router.get('/:id', (req, res) => {
    res.send('This will show one short link');
});

router.post('/', (req, res) => {
    res.send('This will create a short link');
});

router.put('/:id', (req, res) => {
    res.send('This will update a short link');
});

router.delete('/:id', (req, res) => {
    res.send('This will delete a short link');
});

export default router;
