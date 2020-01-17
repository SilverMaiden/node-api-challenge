const express = require('express');

const router = express.Router();

router.use(express.json());

const data = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
    data.get()
    .then(response => {
        res.status(200).json(response)
    }).catch(error => {
        res.status(500).json({messsage: "Failed to get data."})
    })
})

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
        if (response !== undefined) {
            console.log(req.params.id)
            req.post = response;
            next();
        } else {
            res.status(400).json({message: "Invalid post id."})
        }

    })
}

//POST a new project

router.post('/', validateProject, (req, res) => {
    data.insert(req.body)
    .then(response => {
        res.status(201).json(response);
    }).catch(error => {
        res.status(500).json({message: "failed to add new post."})
    })
})

//GET post by post id
router.get('/:id', validateProjectId, (req, res) => {
    data.get(req.params.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to get post by id."})
    })
})

//PUT aka update post using post id

router.put('/:id',validateProjectId, validateProject, (req, res) => {
    data.update(req.params.id, req.body)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to update post."})
    })

})

//DELETE post using post id

router.delete('/:id', validateProjectId, (req, res) => {
    data.remove(req.post.id)
    .then(response => {
        res.status(200).json(response);
    }).catch(error => {
        res.status(500).json({message: "Failed to remove post."})
    })
})


module.exports = router;
