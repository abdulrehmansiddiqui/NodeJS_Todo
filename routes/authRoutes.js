const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Camera = mongoose.model('Camera')

router.post('/addcamera', async (req, res) => {
    const { name, detail, model, image, type } = req.body;

    try {
        // ////// OLD way to do the thing with error handling
        // const camera = { name, detail, model, image, type };
        // Camera.create(camera, (err, save) => {
        //     if (err.code == 11000) {
        //         return res.send({ message: "Data Is Dublicated MODEL", })
        //     }
        //     if (err) {
        //         return res.send({ message: "all Field are mandatory", err })
        //     }
        //     else {
        //         return res.send({ message: "successfully Save" })
        //     }
        // })
        //// NEW way to do the thing
        const camera = new Camera({ name, detail, model, image, type });
        await camera.save().then(data => {
            return res.send({ message: "successfully Save", data })
        }).catch(err => {
            return res.send({ err: "error found", err })
        })
        /////////////////////
    } catch (err) {
        res.status(422).send(err.message)
    }
})

router.get('/getallcamera', async (req, res) => {
    Camera.find({}).then(data => {
        return res.send({ data })
    })
})

router.post('/deletecamera/:id', async (req, res) => {
    const id = req.params.id;
    await Camera.findOneAndRemove({ _id: id }).then(data => {
        return res.send({ message: "successfully Delete" })//ager kuch na ho toh kiya kare?
    }).catch(err => {
        return res.send({ err: "error found", err })
    })
})

router.post('/updatecamera', async (req, res) => {//problem on this
    const { id, name, detail, model, image, type } = req.body;
    Camera.findOne({ _id: id }).then(data => {
        return res.send({ data })
    })
})


module.exports = router




