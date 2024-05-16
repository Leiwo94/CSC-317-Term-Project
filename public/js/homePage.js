let listLength = 0;
// var getRecentPosts = require('../middleware/postmiddleware').getRecentPosts;

const handleImageClick = (event) => {
    event.preventDefault();
    // const eventList = document.getElementById("eventList");
    // eventList.removeChild(event.currentTarget);
    // debugger;

    const removeTarget = event.currentTarget;

    event.currentTarget.style.opacity = 0;
    setTimeout(() => removeTarget.remove(), 1000);

    if (listLength >= 0) {
        listLength = --listLength;
        updateListLength(listLength);
    }
}

function createPhotoCard(data, parent) {
    const imageContainer = document.createElement("div");
    const titleContainer = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("src", data.thumbnailUrl);
    // debugger;
    img.classList.add("imageDisplay");
    const imageTitle = document.createElement("p")
    imageTitle.innerHTML = data.title;
    imageContainer.classList.add("imageContainer");
    titleContainer.classList.add("titleContainer")
    titleContainer.appendChild(imageTitle);
    imageContainer.appendChild(img);
    imageContainer.appendChild(titleContainer);
    imageContainer.setAttribute("id", `imageContainer_${data.id}`);
    imageContainer.addEventListener("click", handleImageClick);
    parent.appendChild(imageContainer);
}

// const loadImages = async () => {
//     // let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos"
//     // let posts = posts.getRecentPosts
//     const response = await fetch(fetchURL);
//     const imageJson = await response.json();
//     const imagesContainer = document.getElementById("imagesContainer");
//     const imagesLoading = document.getElementById("imagesLoading");
//     const imageList = document.getElementById("imageList");

//     imagesLoading && imagesLoading.classList.add("hidden");
//     imageList && imageJson.forEach(image => {
//         let innerHTML = "";
//         createPhotoCard(image, imageList);
//     });

//     listLength = imageJson.length;

//     updateListLength(listLength);
// };

// const updateListLength = (num) => {
//     document.getElementById("imageCount").innerHTML = `There are ${num} images being shown`;
// }


// function imageCounter(imageCount){
//     let counter = 0;
// for (let i = 0; i < storage.length; i++) {
//   if (storage[i].status === '0') counter++;
// }

// function createTitleBoxes(data, parent)
// {
//     const 
// }
// loadImages();
