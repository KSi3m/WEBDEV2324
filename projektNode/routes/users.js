const express = require('express')
const short = require('short-uuid');

const uuid = short();

function generateShortUniqueId() {
  return uuid.new();
}

const router = express.Router();

var uzytnicy = [
    {
        "id":"test",
        "imie": "jan",
        "nazwisko": "Glin",
        "email": "glin@gmail.com",
        "wiek": 24
    },
    {
        "id":"test2",
        "imie": "Filip",
        "nazwisko": "Glin",
        "email": "ff_glin@gmail.com",
        "wiek": 28
    }
]



router.get('/',(req,res) => { 
    res.send(uzytnicy)
});

router.post('/',(req,res) => { 
    let u_id = generateShortUniqueId()
    const uzytkownik = req.body;
    uzytkownik.id = u_id
    uzytnicy.push(uzytkownik);
    res.send(uzytkownik);
});

router.get('/:id',(req,res) => { 
    const {id} = req.params;
    const uzytnikPoImieniu = uzytnicy.find((user) => user.id === id)
    res.send(uzytnikPoImieniu)
});

router.put('/:id',(req,res) => { 
    const {id} = req.params;
    const uzytnikPoImieniu = uzytnicy.find((user) => user.id === id)
    if (uzytnikPoImieniu == null) res.send("Nie ma takiego usera")
    uzytnikPoImieniu.imie = req.body.imie
    uzytnikPoImieniu.nazwisko = req.body.nazwisko
    uzytnikPoImieniu.email = req.body.email
    uzytnikPoImieniu.wiek = req.body.wiek
    res.send(uzytnikPoImieniu)
});

router.delete('/:id',(req,res) => { 
    const {id} = req.params;
    const uzytnikPoImieniu = uzytnicy.find((user) => user.id === id)
    if (uzytnikPoImieniu == null) res.send("Nie ma takiego usera")
    uzytnicy = uzytnicy.filter(user => user.id != id);
    res.send("Uzytkownik o id "+id+" usuniety")
});

module.exports = router;