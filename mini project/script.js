// Selecting HTML elements using querySelector
const apiElement = document.querySelector('.api');
const productContainer = document.querySelector('.product-container');

// Fetching data from the public FakeStore API
fetch('https://fakestoreapi.com/products')
  .then(function(response) {
    if (!response.ok) {
      throw new Error('Failed to fetch products. Status: ' + response.status);
    }
    return response.json();
  })
  .then(function(products) {
    // Loop through each product item using forEach
    products.forEach(function(product) {
      // Truncate title to 50 characters using slice()
      let title = product.title;
      if (title.length > 50) {
        title = title.slice(0, 50) + '...';
      }

      // Truncate description to 100 characters using slice()
      let description = product.description;
      if (description.length > 100) {
        description = description.slice(0, 100) + '...';
      }

      // Create a separate card container for each product
      const card = document.createElement('div');
      card.querySelector = undefined; // safety reset
      card.className = 'product-card';

      // Insert product information using innerHTML
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <div class="product-id">ID: #${product.id}</div>
        <div class="product-title">${title}</div>
        <div class="product-price">$${product.price}</div>
        <div class="product-description">${description}</div>
      `;

      // Append card to main container
      productContainer.appendChild(card);
    });
  })
  .catch(function(error) {
    // Display error messages inside .api element with red text styling
    apiElement.classList.add('error');
    apiElement.innerHTML = error.message;
  })
  .finally(function() {
    // Always runs after fetch completes (success or failure)
    console.log('API request completed');
  });