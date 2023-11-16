document.addEventListener('DOMContentLoaded', () => {
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItems = document.getElementById('cart-items');
  const checkoutButton = document.getElementById('checkout-button');
  const popup = document.getElementById('popup');
  const popupMessage = document.getElementById('popup-message');
  const closePopupButton = document.getElementById('close-popup');
  const confirmPaymentButton = document.getElementById('confirm-payment');

  const selectedItems = [];

  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.parentElement.querySelector('span').textContent;
      selectedItems.push(itemName);

      const cartItem = document.createElement('li');
      cartItem.textContent = itemName;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        const index = selectedItems.indexOf(itemName);
        if (index > -1) {
          selectedItems.splice(index, 1);
        }
        cartItem.remove();
      });

      cartItem.appendChild(deleteButton);
      cartItems.appendChild(cartItem);
    });
  });

  checkoutButton.addEventListener('click', () => {
    const popupContent = selectedItems.length > 0 ? `선택한 메뉴: ${selectedItems.join(', ')}` : '장바구니가 비어 있습니다.';
    popupMessage.textContent = popupContent;
    popup.style.display = 'block';
    confirmPaymentButton.style.display = selectedItems.length > 0 ? 'block' : 'none';
  });

  confirmPaymentButton.addEventListener('click', () => {
    if (selectedItems.length > 0) {
      popupMessage.textContent = '결제가 완료되었습니다';
      selectedItems.length = 0; // Clear the selected items
      cartItems.innerHTML = ''; // Clear the cart
      confirmPaymentButton.style.display = 'none'; // Hide the button after payment
    }
  });

  closePopupButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });
});