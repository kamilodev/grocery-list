// const inputName = document.getElementById('add-item-name')
// const inputAmount = document.getElementById('add-item-amount')
// const inputPrice = document.getElementById('add-item-price')
// const inputEmpty = document.getElementById('empty-mylist')
// const confirmEmpty = document.querySelector('.btn-empty')
// const inputDelete = document.getElementById('delete-mylist')
// const confirmDelete = document.querySelector('.btn-delete')
// const newItem = document.querySelector('.item-list')
// const confirmItem = document.querySelector('.btn-add')
// const inputSearch = document.getElementById('mySearch')

// let div = document.querySelector('#overview')
// let addModal = document.querySelector('.modal-medium')
// let emptyModal = document.querySelector('.modal-small')
// let deleteModal = document.querySelector('.modal-delete')
// let emptyMessage = document.querySelector('.js-clear-feedback')
// let deleteMessage = document.querySelector('.js-delete-feedback')
// let total = document.querySelector('.total-price')
// let validateName = document.querySelector('.js-name-feedback')
// let validateOnlyName = document.querySelector('.js-name-error')
// let validateAmount = document.querySelector('.js-amount-feedback')
// let validatePrice = document.querySelector('.js-price-feedback')
// let filterItem = document.getElementsByTagName('li')
// let tempId

div.addEventListener('click', e => {
	if (e.target.classList.contains('trash-outline')) {
		tempId = e.target.getAttribute('id')
		deleteOverview(e)
	}
})

confirmItem.addEventListener('click', e => addItem(e))
confirmEmpty.addEventListener('click', e => emptyAll(e))
confirmDelete.addEventListener('click', e => confirmDeleteItem(e))
inputSearch.addEventListener('click', e => liveSearch(e))

let arrayItems = []
let emptyArray = []

class Item {
	constructor(id, name, amount, price) {
		this.id = id
		this.name = name
		this.amount = amount
		this.price = price
	}

	showItem() {
		Item.showHTML(this.id, this.name, this.amount, this.price)
		return this
	}

	saveItem() {
		const allData = JSON.parse(localStorage.getItem('items')) ?? []
		allData.push({
			id: this.id,
			name: inputName.value,
			amount: inputAmount.value,
			price: inputPrice.value,
		})
		localStorage.setItem('items', JSON.stringify(allData))
		arrayItems = allData.slice()
	}

	static showAllItems() {
		if (localStorage.getItem('items')) {
			JSON.parse(localStorage.getItem('items')).forEach(item => {
				Item.showHTML(item.id, item.name, item.amount, item.price)
			})
		}
		showPrice()
	}

	static showHTML(id, name, amount, price) {
		const item = document.createElement('li')
		item.classList.add('elem-list')
		item.innerHTML = `
                  <span class="item-name">${name}</span>
                  <span class="item-amount">${amount}</span>
                  <span class="item-price">${price} €</span>
                  <a class="item-delete" href="#">
                     <ion-icon id="${id}" class="trash-outline" name="trash-outline"></ion-icon>
                  </a>
      `
		newItem.appendChild(item)
	}
}

Item.showAllItems()

function addItem(e) {
	let id = Math.floor(Math.random() * 1000000)
	const itemList = new Item(id, inputName.value, inputAmount.value, inputPrice.value)
	validateItems()

	if (validateItems()) {
		itemList.showItem()
		itemList.saveItem()
		showPrice()
		closeOverview()

		inputName.value = ''
		inputAmount.value = ''
		inputPrice.value = ''
	}
}

function emptyAll(e) {
	e.preventDefault()

	const secureEmpty = 'EMPTY'
	if (inputEmpty.value === secureEmpty) {
		localStorage.setItem('items', JSON.stringify(emptyArray))
		closeOverview()
		arrayItems = emptyArray.slice()
		showPrice()
		location.reload()
	} else {
		emptyMessage.classList.remove('d-none')
	}
}

function confirmDeleteItem(e) {
	e.preventDefault()
	const secureDelete = 'DELETE'
	if (inputDelete.value === secureDelete) {
		const getItems = JSON.parse(localStorage.getItem('items'))
		const newList = getItems.filter(item => item.id != tempId)
		localStorage.setItem('items', JSON.stringify(newList))

		closeOverview()
		arrayItems = newList.slice()
		showPrice()
		location.reload()

		e.target.parentElement.parentElement.remove()
	} else {
		deleteMessage.classList.remove('d-none')
	}
}

function showPrice() {
	let newPrice = 0
	const getItems = JSON.parse(localStorage.getItem('items'))
	getItems.forEach(item => {
		newPrice += parseFloat(item.amount * item.price)
	})
	total.innerHTML = `${newPrice} €`
}

function closeOverview() {
	div.classList.remove('has-overlay')
	addModal.classList.add('d-none')
	emptyModal.classList.add('d-none')
	deleteModal.classList.add('d-none')
	inputDelete.value = ''
	inputEmpty.value = ''
}

function liveSearch(e) {
	const getItems = JSON.parse(localStorage.getItem('items'))

	getItems.forEach(function (item) {
		const elemId = document.getElementById(item.id)
		if (inputSearch.value.length >= 3) {
			if (item.name.toLowerCase().includes(inputSearch.value.toLowerCase())) {
				elemId.parentElement.parentElement.classList.add('elem-list')
				elemId.parentElement.parentElement.classList.remove('d-none-elem')
			} else {
				elemId.parentElement.parentElement.classList.remove('elem-list')
				elemId.parentElement.parentElement.classList.add('d-none-elem')
			}
		} else {
			elemId.parentElement.parentElement.classList.add('elem-list')
			elemId.parentElement.parentElement.classList.remove('d-none-elem')
		}
	})
}

function validateItems() {
	let nameOk = false
	let amountOk = false
	let priceOk = false
	let nameUnique = true

	const getItems = JSON.parse(localStorage.getItem('items'))
	getItems.forEach(item => {
		if (inputName.value.toLowerCase() === item.name.toLowerCase()) {
			nameUnique = false
			validateOnlyName.classList.remove('d-none')
		} else {
			validateOnlyName.classList.add('d-none')
		}
	})

	if (inputName.value.length === 0) {
		validateName.classList.remove('d-none')
	} else {
		validateName.classList.add('d-none')
		nameOk = true
	}

	if (inputAmount.value.length === 0) {
		validateAmount.classList.remove('d-none')
	} else if (parseFloat(inputAmount.value) <= 0) {
		validateAmount.classList.remove('d-none')
	} else {
		validateAmount.classList.add('d-none')
		amountOk = true
	}

	if (inputPrice.value.length === 0) {
		validatePrice.classList.remove('d-none')
	} else if (parseFloat(inputPrice.value) <= 0) {
		validatePrice.classList.remove('d-none')
	} else {
		validatePrice.classList.add('d-none')
		priceOk = true
	}

	if (nameOk && amountOk && priceOk && nameUnique) {
		return true
	} else {
		return false
	}
}
