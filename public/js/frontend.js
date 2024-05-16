
function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - .05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}

function createCard(postData) {
    return `<div class="imageContainer" id="post-${postData.id}">
    <p class="card-title">${postData.title}</p>
    <img class="card-image" src=${postData.thumbnail} alt="">
    <p class="card-text">${postData.description}</p>
    <a href="/post/${postData.id}" class="anchor-buttons">Post Details</a>
</div>`;
}

function executeSearch() {
    let searchTerm = document.getElementById('search-text').value;
    if (!searchTerm) {
        location.replace('/');
        addFlashFromFrontEnd('Empty search term, here is the homepage.')
        return;
    }
    let mainContent = document.getElementById('imageList');
    let searchURL = `/search?search=${searchTerm}`;
    fetch(searchURL)
        .then((data) => {
            return data.json();
        })
        .then((data_json) => {
            let newMainContentHTML = '';
            data_json.results.forEach((row) => {
                newMainContentHTML += createCard(row);
            });
            mainContent.innerHTML = newMainContentHTML;
            if(data_json.message){
                addFlashFromFrontEnd(data_json.message);
            }
        })
        .catch((err) => console.log(err));
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message');
    innerFlashDiv.setAttribute('class', 'alert alert-info');

    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}

let flashMessageElement = document.getElementById('flash-message');
if (flashMessageElement) {
    setFlashMessageFadeOut(flashMessageElement);
}



// let searchButton = document.getElementById('search-button');
// if(searchButton){
//     searchButton.onclick=executeSearch;
// }

// function getRandomPost (res, req, next) {
    // let baseSQL = 'SELECT SELECT u.id, u.username, p.title, p.description, p.photopath, p.created \
    // FROM users u \
    // JOIN posts p \
    // ON u.id=fk_userid \
    // WHERE p.id=?\
    // ORDER BY RAND() LIMIT 1;';

//     db.execute(baseSQL,[])
//     .then(([results, fields]) => {
//         let post = results[0];
//         res.render('userPosts', {currentPost: post});
//         if(results && results.length == 0){
//             req.flash('error', 'There are no posts created yet.');
//         }
//         next();
//     })
//     .catch((err) => next(err));
// }