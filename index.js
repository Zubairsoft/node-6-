const express = require("express");
const multer = require("multer");
const mogoose = require("mongoose");
const profile = require("./models/profiles");
const { default: mongoose } = require("mongoose");
const app = express();
const port= 3000;

// create database by using mongoose
mogoose
    .connect("mongodb://localhost:27017/coding_academy")
    .then((result) => {
    })
    .catch((error) => {
        console.log(error);
    });


//Set for using ejs
app.set("view engine", "ejs");
app.use(express.urlencoded());
//milleware for using image in page
app.use(express.static("public/"))

//storge image  and  file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    
        if(file.fieldname == 'cv')
            cb(null, "public/pdfs/");
        else  if(file.fieldname == 'image')
            cb(null, "public/images/");

    },
    filename: (req, file, cb) => {
        const extension = file.originalname.split(".");
        const ext = extension[extension.length - 1];

        const uploaded_file_name =
            file.fieldname +
            "-" +
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            "." +
            ext;

        cb(null, uploaded_file_name);
    },
});

const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 1024 * 1024 * 5,
});




app.post("/home", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'cv', maxCount: 8 }]), async (req, res) => {


    const p = new profile({
        name: req.body.name,
        email: req.body.email,
        addres: req.body.addres,
        description: req.body.description,
        image: req.files['image'][0].filename,
        cv: req.files['cv'][0].filename
    });
    await p.save((error, result) => {
        if (error)
            console.log(error.message);
        else
            console.log(result);


    });

    console.log("data inserted successful");
    res.redirect('/home');
    res.end();

});

app.get('/home', (req, res) => {
    profile.find().then((reslut) => {
        res.render('create_profile', { profiles: reslut });
    });

});


app.listen(port);