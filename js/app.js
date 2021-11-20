// INITIAL ARRAY STATUS

let arrayItems = [];
let emptyArray = [];

// ITEM OBJECT CONSTRUCTOR

class Item {
	// ITEM ATTRIBUTES
	constructor(id, name, amount, price) {
		this.id = id;
		this.name = name;
		this.amount = amount;
		this.price = price;
	}

	// SHOW ALL ITEMS
	static showAllItems() {
		if (localStorage.getItem('items')) {
			JSON.parse(localStorage.getItem('items')).forEach(item => {
				Item.showHTML(item.id, item.name, item.amount, item.price);
			});
		}
		showPrice();
	}

	// SHOW ITEMS
	showItem() {
		Item.showHTML(this.id, this.name, this.amount, this.price);
		return this;
	}

	// CREATE ITEM INTO HTML DOCUMENT
	static showHTML(id, name, amount, price) {
		const item = document.createElement('li');
		item.classList.add('elem-list');
		item.innerHTML = `
                  <span class="item-name">${name}</span>
                  <span class="item-amount">${amount}</span>
                  <span class="item-price">${price} €</span>
                  <a class="item-delete" href="#">
                     <ion-icon id="${id}" class="trash-outline" name="trash-outline"></ion-icon>
                  </a>`;
		newItem.appendChild(item);
	}

	// SAVE ITEMS
	saveItem() {
		const allData = JSON.parse(localStorage.getItem('items')) ?? [];
		allData.push({
			id: this.id,
			name: inputName.value,
			amount: inputAmount.value,
			price: inputPrice.value,
		});
		localStorage.setItem('items', JSON.stringify(allData));
		arrayItems = allData.slice();
	}
}

Item.showAllItems();
