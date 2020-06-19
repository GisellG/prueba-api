const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/authen');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});

router.post('/add', isLoggedIn, async (req, res) =>{
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO link set ?', [newLink]);
    req.flash('success', 'Link guardado');
    res.redirect('/links');
});

router.get('/', isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM link WHERE user_id = ?', [req.user.id]);
    console.log(links);
    res.render('links/list',  { links });
});

router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM link WHERE id = ?', [ id ]);
    req.flash('success', 'Enlace removido');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM link WHERE id = ?', [ id ]);
    res.render('links/edit', { link: links [0] })
});

router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const { id } = req. params;
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE link SET ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link modificado correctamente');
    res.redirect('/links');
})

module.exports = router;