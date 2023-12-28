let originalProducts = [
    { id: 1, manufacturer: "Manufacturer A", description: "Product A", tag: "Handpiece" },
    { id: 2, manufacturer: "Manufacturer B", description: "Product B", tag: "Electronic" },
    { id: 3, manufacturer: "Manufacturer C", description: "Product C", tag: "Sterilizer" }
    // Initial data, you can add more or load from an external source
];

  let products = [...originalProducts]; // Copy of original products

function displayProducts() {
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = "";

    products.forEach(product => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = product.id;
        idCell.classList.add("product-id-column");
        row.appendChild(idCell);

        const manufacturerCell = document.createElement("td");
        manufacturerCell.textContent = product.manufacturer;
        manufacturerCell.classList.add("manufacturer-column");
        row.appendChild(manufacturerCell);

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = product.description;
        row.appendChild(descriptionCell);

        const tagCell = document.createElement("td");
        tagCell.textContent = product.tag;
        row.appendChild(tagCell);

        const actionCell = document.createElement("td");
        actionCell.classList.add("action-column");
        const modifyButton = document.createElement("button");
        modifyButton.textContent = "Modify";
        modifyButton.onclick = function () {
            modifyProduct(product.id, product.manufacturer, product.description, product.tag);
        };
        actionCell.appendChild(modifyButton);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = function () {
            deleteProduct(product.id);
        };
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        tableBody.appendChild(row);
    });
}

function searchProducts() {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === "") {
        products = [...originalProducts]; // If search is empty, display all products
    } else {
        products = originalProducts.filter(product =>
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    displayProducts();
}

function resetSearch() {
    const searchInput = document.getElementById("searchInput");
    searchInput.value = ""; // Clear the search input field
    products = [...originalProducts]; // Reset products to the original list
    displayProducts(); // Display all products again
}

function addProduct() {
    const newProductId = parseInt(prompt("Enter product ID:"));
    const existingProduct = originalProducts.find(product => product.id === newProductId);

    if (existingProduct) {
        alert("Product ID already exists. Please choose a different ID.");
        return;
    }

    let tagInput;
    do {
        tagInput = prompt("Enter product tag (1 for Handpiece, 2 for Electronic, 3 for Sterilizer):");
    } while (tagInput !== "1" && tagInput !== "2" && tagInput !== "3");

    let tag;
    if (tagInput === "1") {
        tag = "Handpiece";
    } else if (tagInput === "2") {
        tag = "Electronic";
    } else {
        tag = "Sterilizer";
    }

    const newProduct = {
        id: newProductId,
        manufacturer: prompt("Enter manufacturer:"),
        description: prompt("Enter product description:"),
        tag: tag
    };

    originalProducts.push(newProduct);
    products = [...originalProducts]; // Update the products list
    displayProducts();
}

function modifyProduct(id, currentManufacturer, currentDescription, currentTag) {
    const newId = parseInt(prompt("Modify product ID:", id));
    const newManufacturer = prompt("Modify manufacturer:", currentManufacturer);
    const newDescription = prompt("Modify product description:", currentDescription);
    const newTag = prompt("Modify product tag (1 for Handpiece, 2 for Electronic, 3 for Sterilizer):", currentTag);

    let tag;
    if (newTag === "1") {
        tag = "Handpiece";
    } else if (newTag === "2") {
        tag = "Electronic";
    } else {
        tag = "Sterilizer";
    }

    const modifiedProduct = {
        id: newId,
        manufacturer: newManufacturer,
        description: newDescription,
        tag: tag
    };

    const index = originalProducts.findIndex(product => product.id === id);
    originalProducts[index] = modifiedProduct;
    products = [...originalProducts]; // Update the products list
    displayProducts();
}

function deleteProduct(id) {
    originalProducts = originalProducts.filter(product => product.id !== id);
    products = [...originalProducts]; // Update the products list
    displayProducts();
}

displayProducts(); // Show initial products on page load