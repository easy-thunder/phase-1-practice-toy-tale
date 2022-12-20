let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
    addToy = !addToy;
      if (addToy) {
    toyFormContainer.style.display = "block";
    toyFormContainer.addEventListener("submit", function(e){
      e.preventDefault();
      postToy(e.target.name.value, e.target.imageURl.value)
    })
    } else {
    toyFormContainer.style.display = "none";
}})

function postToy(name, imageUrl){
  fetch('http://localhost:3000/toys', {
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      accept: "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": imageUrl
    })
  })
}

function renderToy(toy){
const name = document.createElement('h2');
name.textContent = toy.name;

const picture = document.createElement('img');
picture.setAttribute('src', toy.image)
picture.setAttribute('class', "toy-avatar")

const likes = document.createElement('p');
likes.textContent = `${toy.likes} likes`

const likeButton = document.createElement('button');
likeButton.textContent = "like";
likeButton.setAttribute('id', toy.id)
const more = parseInt( toy.likes + 1);

likeButton.addEventListener('click', function(e){
  likeUpdate(e)
})
const toyCollection = document.querySelector('#toy-collection')
const card = document.createElement('div')
card.setAttribute('class', "card")
card.append(name, picture, likes, likeButton)
toyCollection.appendChild(card)
}
function likeUpdate(e){
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText)+ 1;
  console.log(e.target.id);
fetch(`http://localhost:3000/toys/${e.target.id}`,{
  method: "PATCH",
  headers: {"Content-Type": "application/json",
          accept: "application/json"
},
body: JSON.stringify({"likes": more})
})
.then(r=>r.json())
.then (like_obj =>{
  e.target.previousElementSibling = `${more} likes`;
})

}

function getToys(){
fetch('http://localhost:3000/toys')
.then(r=>r.json())
.then(arrayData => arrayData.forEach(item => renderToy(item)))

}
getToys()























































































})
