let cart = [];

function addToCart(name, price, button) {
  const card = button.parentElement;
  const size = card.querySelector('.size-selector').value;

  if (!size) {
    alert("Please select a size before adding to cart.");
    return;
  }

  const item = { name, price, size };
  cart.push(item);
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <span>${item.name} (${item.size}) - R${item.price}</span>
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartItems.appendChild(div);
    total += item.price;
  });

  cartTotal.textContent = `Total: R${total}`;

  // Update WhatsApp checkout link
  updateWhatsAppButton();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartUI();
}

function filterProducts(category) {
  const products = document.querySelectorAll('.product-card');
  products.forEach(card => {
    if (category === 'all' || card.classList.contains(category)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

document.getElementById("open-cart").addEventListener("click", () => {
  document.getElementById("cart-sidebar").style.right = "0";
});

document.getElementById("close-cart").addEventListener("click", () => {
  document.getElementById("cart-sidebar").style.right = "-100%";
});

function updateWhatsAppButton() {
  const waBtn = document.getElementById("whatsapp-checkout");
  if (!waBtn) return;

  if (cart.length === 0) {
    waBtn.style.display = "none";
    return;
  }

  waBtn.style.display = "block";

  let message = "*Hello, I'd like to place an order from Gaffari:*%0A%0A";

  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.name} (${item.size}) - R${item.price}%0A`;
  });

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  message += `%0ATotal: R${total}`;

  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = "27818383959"; // e.g. 27731234567
  waBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
}
