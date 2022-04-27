const express = require('express')

const fs = require('fs')

const path = require('path')

const app = express();

const port = 9000;

const fileUpload = require("express-fileupload");

const dataLocation = path.join(`${__dirname}/../frontend/`);

app.use(express.json());

app.get('/', (request, response, next) => {

    response.sendFile(path.join(`${__dirname}/../frontend/index.html`));

})


app.get('/images-list', (request, response, next) => {

    response.sendFile(path.join(`${__dirname}/../frontend/data.json`));

})

app.get('/images-input', (request, response, next) => {

    response.sendFile(path.join(`${__dirname}/../frontend/index-input.html`))
})

app.delete('/', (request, response, next) => {
    
    const title = request.body.title;

    const deleteImages = jsonData.filter(d => d.title == title)
    console.log('images',deleteImages.image_name )
    
    jsonData = jsonData.filter(d => d.title != title)
    
    fs.rm(`${dataLocation}jsonData`, /*JSON.stringify(jsonData),*/ (error) => {

        if (error) {

            console.log(error);

        }
    })

})


app.use(fileUpload());

app.use("/upload", express.static(`${__dirname}/../frontend/upload`));

app.use("/src", express.static(`${__dirname}/../frontend/src`));

app.use("/dist", express.static(`${__dirname}/../frontend/dist`));

app.use("/public", express.static(`${__dirname}/../frontend/public`));


let jsonData = [];

try {
    let data = fs.readFileSync(`${dataLocation}data.json`, error => {

        if (error) {

            console.log(error);
        }
    });
    jsonData = JSON.parse(data);

} catch (error) {

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {

        if (error) {

            console.log(error);

        }
    });
}

const uploads = path.join(`${__dirname}/../frontend/upload/`);

app.post("/", (req, res) => {
    // Upload image
    const picture = req.files.picture;

	const answer = {};

    if (picture) {

        console.dir(picture);

        picture.mv(uploads + picture.name, error => {

            return res.status(500).send(error);

        });
    }

	answer.pictureName = picture.name;

    // Upload data from form
    const formData = req.body;

    formData.image_name = picture.name;

    jsonData.push(formData);

    fs.writeFile(`${dataLocation}data.json`, JSON.stringify(jsonData), (error) => {
        if (error) {

            console.log(error);
        }
    });
    res.send(answer);
});


/*app.delete('/images-delete', (req, res) => {
    const title = req.params.title
    //get the existing userdata
    const images = getUserData()
    //filter the userdata to remove it
    const filterImages = images.filter( image => image.title !== title )
    if ( images.length === filterImages.length ) {
        return res.status(409).send({error: true, msg: 'title does not exist'})
    }
    //save the filtered data
    saveUserData(filterImages)
    res.send({success: true, msg: 'User removed successfully'})
    
})*/

app.listen(port, () => {

    console.log(`http://127.0.0.1:${port}`)

})