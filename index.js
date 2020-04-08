document.addEventListener("DOMContentLoaded", () => {
  
  let burgerMenu = document.querySelector('#burger-menu')
  let orderList = document.querySelector('#order-list')
  let form = document.querySelector('#custom-burger')

  fetchMenu()

  function fetchMenu() {
    fetch(`http://localhost:3000/burgers`) 
    .then(function(response){
      return response.json();
    })
    .then(function(menu) {
      renderMenu(menu)
    })
  }

  function renderMenu(menu){
    burgerMenu.innerHTML = ''
    for (let menuItem of menu) {
      let newDiv = document.createElement('div')
      newDiv.className = 'burger'
      newDiv.innerHTML = `
      <h3 class="burger_title">${menuItem.name}</h3>
      <img src=${menuItem.image}>
      <p class="burger_description">
      ${menuItem.description}
      </p>`
      let button = document.createElement('button')
      button.innerText = "Add to Order"
      button.className = 'button'
      button.dataset.id = menuItem.id
      burgerMenu.appendChild(newDiv)
      newDiv.append(button)

      button.addEventListener("click", handleClick)
    }
  }

  function handleClick(e) {
    fetchSingle(e.target.dataset.id)
    .then(addOrder) 
  }

  function addOrder(order) {
    let newOrder = document.createElement('li')
    newOrder.innerHTML = `<h3>${order.name}</h3>`
    orderList.appendChild(newOrder)
  }

// Form listener

  form.addEventListener("submit", function(e){
    postNewItem(e)
  })

  //function saveFormItems(e) {
  //  e.preventDefault()
  //  name = form.name.value
  //  name = form.name.value
  //  name = form.name.value
//
  //}


//fetches

  function fetchSingle(id) {  
    return fetch(`http://localhost:3000/burgers/${id}`)
    .then(function(response) {
    return response.json()})
  }

  function postNewItem(e) {
    return fetch (`http://localhost:3000/burgers`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.url.value,
        description: e.target.description.value
      })
    })
    fetchMenu()
  }


})