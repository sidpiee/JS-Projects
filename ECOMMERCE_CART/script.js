addEventListener("DOMContentLoaded", function () {
  let productlist = document.getElementById("Products-list");
  let emptycart = document.getElementById("empty-cart");
  let carttotal = document.getElementById("cart-total");
  let cartitems = document.getElementById("cart-items");
  let totalpricebox = document.getElementById("total-price");
  let checkoutbtn = document.getElementById("checkout-btn");

  const products = [
    {
      id: 1,
      name: "Stranger Things t-shirt",
      price: 1200,
      img: "https://images.bewakoof.com/t320/men-s-jet-black-stranger-things-logo-typography-t-shirt-691922-1761890620-1.jpg",
      quantity: 0,
    },
    {
      id: 2,
      name: "Freedom t-shirt",
      price: 1000,
      img: "https://images.bewakoof.com/t320/men-s-bold-red-freedom-graphic-printed-oversized-t-shirt-689692-1758516317-1.jpg",
      quantity: 0,
    },
    {
      id: 3,
      name: "Goofy aah t-shirt",
      price: 6969,
      img: "https://images.bewakoof.com/t320/men-s-jet-black-unknown-graphic-printed-oversized-t-shirt-689698-1758516277-1.jpg",
      quantity: 0,
    },
    {
      id: 4,
      name: "Men's polo t-shirt",
      price: 1,
      img: "https://images.bewakoof.com/t320/men-s-blue-polo-t-shirt-685319-1762175356-1.jpg",
      quantity: 0,
    },
    {
      id: 5,
      name: "new dih-shirt",
      price: 69,
      img: "https://images.bewakoof.com/t320/men-s-bird-egg-green-asap-graphic-printed-t-shirt-685515-1759125620-1.jpg",
      quantity: 0,
    },
  ];

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  rendercart();

  products.forEach((product) => {
    let div1 = document.createElement("div");
    div1.className = "mb-10";
    div1.innerHTML = `
    <img
      src="${product.img}"
      alt="${product.name}"
      class="h-110 w-90 rounded-2xl hover:scale-108 transition-all ease-in-out duration-180 hover:shadow-sm hover:shadow-black mb-5"
    />
    <div class="flex justify-between w-90 mt-4">
      <div class="flex flex-col">
        <h1 class="text-md">${product.name}</h1>
        <h1 class="font-['Smooch_Sans'] text-2xl">$ ${product.price.toFixed(
          2
        )}</h1>
      </div>
      <button class="border-black bg-none border p-1 rounded-lg hover:bg-neutral-800 hover:text-white transition ease-in-out duration-150 cursor-pointer hover:scale-110" data-id="${
        product.id
      }">
        Add to cart
      </button>
    </div>
  `;

    productlist.appendChild(div1);
  });

  productlist.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const productid = parseInt(e.target.getAttribute("data-id"));
      const product = products.find((p) => p.id === productid);
      addtocart(product);
    }
  });

  function addtocart(product) {
    let existing_prod = cart.find((p) => p.id === product.id);
    if (existing_prod) {
      existing_prod.quantity++;
    } else {
      const newProd = { ...product, quantity: 1 };
      cart.push(newProd);
    }
    savecart(cart);
    rendercart();
  }

  function rendercart() {
    cartitems.innerHTML = "";
    let totalprice = 0;

    if (cart.length) {
      carttotal.classList.remove("hidden");
      emptycart.classList.add("hidden");
      cart.forEach((item) => {
        totalprice += item.price * item.quantity;
        let div1 = document.createElement("div");
        div1.className = "flex w-145 justify-between text-3xl m-8";
        div1.innerHTML = `<div class="font-['figtree'] font-bold">${item.name}</div>
        <div><span class="text-lg">x</span>${item.quantity}</div>
      <button data-id ="${item.id}" class="border-black bg-black text-white border p-1 rounded-lg hover:bg-transparent hover:text-black transition ease-in-out duration-150 cursor-pointer hover:scale-110 text-sm ">Remove</button>`;
        cartitems.appendChild(div1);
      });
      totalpricebox.innerHTML = `$ ${totalprice.toFixed(2)}`;
    } else {
      carttotal.classList.add("hidden");
      emptycart.classList.remove("hidden");
    }
  }

  checkoutbtn.addEventListener("click", function () {
    cart.length = 0;
    alert("Checkout successful");
    savecart(cart);
    rendercart();
  });
  cartitems.addEventListener("click", function (e) {
    if (e.target.tagName === "BUTTON") {
      const productid = parseInt(e.target.getAttribute("data-id"));
      const product = cart.find((p) => p.id === productid);
      product.quantity--;
      if (product.quantity == 0) {
        const index = cart.findIndex((p) => p.id === productid);
        cart.splice(index, 1);
      }
      savecart(cart);
      rendercart();
    }
  });
  function savecart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
