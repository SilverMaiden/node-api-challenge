const express = require('express');

const router = express.Router();

router.use(express.json());

const data = require('../data/helpers/actionModel.js');


const validateAction = (req, res, next) => {
    if (req.body === undefined) {
        res.status(400).json({message: "Missing action data."})
    } else if (req.body.project_id === undefined || req.body.project_id.length === 0) {
        res.status(400).json({message: "Missing required project_id field."})
    } else if (req.body.description === undefined || req.body.description.length === 0) {
        res.status(400).json({message: "Missing required description field."})
    } else if (req.body.notes === undefined || req.body.notes.length === 0) {
        res.status(400).json({message: "Missing required notes field."})
    } else {
        next();
    }
}

const validateActionId = (req, res, next) => {
    data.get(req.params.id)
    .then(response => {
        if (response !== undefined && response !== null) {
            console.log(req.params.id)
            req.action = response;
            next();
        } else {
            res.status(400).json({message: "Invalid action id."})
        }

    })
}

//GET all actions

router.get('/', (req, res) => {
    data.get()
    .then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(500).json({messsage: "Failed to get data."})
    })
})


//POST a new action

router.post('/', validateAction, (req, res) => {
    data.insert(req.body)
    .then(response => {
        res.status(201).json(response);
    }).catch(error => {
        res.status(500).json({message: "failed to add new action."})
    })
})

//GET action by action id
router.get('/:id', validateActionId, (req, res) => {
    data.get(req.params.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to get action by id."})
    })
})

//PUT aka update action using action id

router.put('/:id',validateActionId, validateAction, (req, res) => {
    data.update(req.params.id, req.body)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to update action."})
    })

})

//DELETE action using action id

router.delete('/:id', validateActionId, (req, res) => {
    data.remove(req.action.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to remove action."})
    })
})


module.exports = router;
