function loadEvent() {

    const htmlForm = `
        <section>
            <form action="" id='form' method='POST'>
                <h1>Upload/Delete image</h1>
                <input type="text" name="title"     placeholder="Title..."  required><br>
                <input type="text" name="photographername"  placeholder="Photographer's name..." required><br>
                <input type="url" name="url" placeholder="https://example.com"
                pattern="https://.*" size="30"
                required><br>
                <div class="datepick">
                <label>Upload date:</label>
                <input type="date" name="date">
                <br>
                <div class="imginput">
                <img id="profile"></img>
                <input type="file"  name="picture">
                </div>
                <div class="button-class">
                <button type="submit" id="button">Upload</button>
                <button type="reset" value="reset">Delete</button>	
                </div>
            </form>
        </section>
    `;
    
    
    const rootElement = document.getElementById('root2');
    
    rootElement.insertAdjacentHTML('beforeend', htmlForm);
    
    const formElement = document.getElementById('form');

        formElement.addEventListener('submit', e => {

            e.preventDefault();
        
            const formData = new FormData();

            formData.append("title", e.target.querySelector(`input[name="title"]`).value);

            formData.append("photographername", e.target.querySelector(`input[name="photographername"]`).value);

            formData.append("url", e.target.querySelector(`input[name="url"]`).value);

            formData.append("picture", e.target.querySelector(`input[name="picture"]`).files[0])

            formData.append("date", e.target.querySelector(`input[name="date"]`).value);

            const fetchSettings = {
        
                method: 'POST',
                body: formData
            }
        
        
            fetch('/', fetchSettings)
        
                .then(async data => {
        
                    if ( data.status === 200 ) {
                        const res = await data.json()
                        console.dir(res)
                        alert('Your input has been submitted!')
                    
                    //console.dir(data)
                    }
                })
                .catch( error => {
        
                    e.target.outerHTML = 'error'
        
                    console.dir(error)
                })

        });
        

        



    
}
window.addEventListener('load', loadEvent)