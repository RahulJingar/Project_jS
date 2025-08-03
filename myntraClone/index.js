let bagItems = [];

window.onload = () => {
  const bagItemStr = localStorage.getItem('bagItems');
  bagItems = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayItemsOnHomePage();
  displayBagIcon();
};

function addToBag(itemId) {
  if (!bagItems.includes(itemId)) {
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayBagIcon();
  }
}

function displayBagIcon() {
  const bagItemCountElement = document.querySelector('#bag-item-count');
  if (bagItems.length > 0) {
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItems.length;
  } else {
    bagItemCountElement.style.visibility = 'hidden';
  }
}

function displayItemsOnHomePage() {
  const itemContainerElement = document.querySelector('#product-container');
  if (!itemContainerElement) return;

  let innerHTML = '';
  items.forEach((item) => {
    innerHTML += `
      <div class="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <img src="${item.image}" alt="Product Image" class="w-full h-64 object-cover">
        <div class="p-4">
          <div class="text-sm text-yellow-600 font-semibold mb-1">
            ${item.rating.stars} ⭐ | ${item.rating.count}
          </div>
          <div class="text-gray-800 font-bold text-lg">
            ${item.company}
          </div>
          <div class="text-gray-600 text-sm mb-2">
            ${item.item_name}
          </div>
          <div class="flex items-center gap-2 text-sm mb-4">
            <span class="text-gray-800 font-semibold">Rs ${item.current_price}</span>
            <span class="line-through text-gray-500">Rs ${item.original_price}</span>
            <span class="text-green-600 font-semibold">${item.discount_percentage}% OFF</span>
          </div>
          <button 
            onclick="addToBag(${item.id})"
            class="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition duration-300"
          >
            Add to Bag
          </button>
        </div>
      </div>
    `;
  });

  itemContainerElement.innerHTML = innerHTML;
}
