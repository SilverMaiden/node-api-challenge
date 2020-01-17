const express = require('express');

const router = express.Router();

router.use(express.json());

const data = require('../data/helpers/projectModel.js');


const validateProject = (req, res, next) => {
    if (req.body === undefined) {
        res.status(400).json({message: "Missing project data."})
    } else if (req.body.name === undefined || req.body.name.length === 0) {
        res.status(400).json({message: "Missing required name field."})
    } else if (req.body.description === undefined || req.body.description.length === 0) {
        res.status(400).json({message: "Missing required description field."})
    } else {
        next();
    }
}

const validateProjectId = (req, res, next) => {
    data.get(req.params.id)
    .then(response => {
        if (response !== undefined && response !== null) {
            console.log(req.params.id)
            req.project = response;
            next();
        } else {
            res.status(400).json({message: "Invalid project id."})
        }

    })
}

//GET all projects

router.get('/', (req, res) => {
    data.get()
    .then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(500).json({messsage: "Failed to get data."})
    })
})


//POST a new project

router.post('/', validateProject, (req, res) => {
    data.insert(req.body)
    .then(response => {
        res.status(201).json(response);
    }).catch(error => {
        res.status(500).json({message: "failed to add new project."})
    })
})

//GET project by project id
router.get('/:id', validateProjectId, (req, res) => {
    data.get(req.params.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to get project by id."})
    })
})

//PUT aka update project using project id

router.put('/:id',validateProjectId, validateProject, (req, res) => {
    data.update(req.params.id, req.body)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to update project."})
    })

})

//DELETE project using project id

router.delete('/:id', validateProjectId, (req, res) => {
    data.remove(req.project.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to remove project."})
    })
})

//GET all actions for project via project id


router.get('/:id/actions', validateProjectId, (req, res) => {
    data.getProjectActions(req.project.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: `Failed to get actions for project with id ${req.project.id}`})
    })
})


module.exports = router;
