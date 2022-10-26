const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Person = require('../models/author')

// All persons route
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const persons = await Person.find(searchOptions)
        res.render('persons/index', {
            persons: persons,
            searchOptions: req.query
        })
    } catch{
        res.redirect('/')
    }
})

// New person route
router.get('/new', (req, res) => {
    res.render('persons/new', {
        person: new Person()
    })
})

// Create new person
router.post('/', async (req, res) => {
    const person = new Person({
        name: req.body.name
    })
    try{
        const newPerson = await person.save()
        // res.redirect(`persons/{$newPerson.id}`)
        res.redirect(`persons/`)
    } catch{
        res.render('persons/new', {
            person: person,
            errorMessage: "Error occured while creating person"
        })
    }
})

module.exports = router