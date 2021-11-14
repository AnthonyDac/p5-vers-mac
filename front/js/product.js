const link = window.location;
const url = new URL(link);
const id = url.searchParams.get("id");
var quantity;
var color;
var productSelected;
var cart = [];
async function connect() {
    await fetch("http://127.0.0.1:3000/api/products/" + id)
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      .then(function (value) {
        productSelected = value;
        displayer(value);
      })
      .catch(function (err) {
        alert("Y a un problème de connexion!");
      });
  }
  connect();
  function displayer(product) {
    var image = document.getElementsByClassName("item__img");
    image[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`
    var title = document.getElementById("title");
    title.innerHTML = `${product.name}`
    var prix = document.getElementById("price");
    prix.innerHTML = `${product.price}`
    var description = document.getElementById("description");
    description.innerHTML = `${product.description}`
    var colors = document.getElementById("colors");
    colors.innerHTML += product.colors.map((color) => `<option value="${color}">${color}</option>`)
  }
  document.getElementById('addToCart').addEventListener('click', function(e) {
        quantity = document.getElementById('quantity').value;
        color = document.getElementById('colors').value;
        if(quantity > 0 && color != "") {
            addToCart();
        }
  })
  var quantityInput = document.getElementById('quantity');
  quantityInput.addEventListener('input', function(e) {
    if (quantityInput.value > 100) {
        quantityInput.value = 100;
    }
    if (quantityInput.value < 0) {
        quantityInput.value = 0;
    }
  })
  function addToCart() {
    cart = JSON.parse(localStorage.getItem("cart"));
    const product = {
        id: productSelected._id,
        image: productSelected.imageUrl,
        name: productSelected.name,
        price: productSelected.price,
        quantity: quantity,
        color: color
    }
    if(cart) {
        const find = cart.find((prod) => prod.id === product.id && prod.color === product.color);
        if(find) {
            find.quantity = parseInt(find.quantity) + parseInt(product.quantity);
            if(find.quantity > 100) {
                find.quantity = 100;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        else {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    else {
        cart = [];
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
    }
  }
