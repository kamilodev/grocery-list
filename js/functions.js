// ADD NEW ITEM

function addItem(e) {
	console.log('Click')
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

// VALIDATE INPUT AND NAME ITEM

function validateItems() {
	let nameOk = false
	let amountOk = false
	let priceOk = false
	let nameUnique = true

	const getItems = JSON.parse(localStorage.getItem('items'))

	if (localStorage.getItem('items')) {
		getItems.forEach(item => {
			if (inputName.value.toLowerCase() === item.name.toLowerCase()) {
				nameUnique = false
				validateOnlyName.classList.remove('d-none')
			} else {
				validateOnlyName.classList.add('d-none')
			}
		})
	}

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

// DELETE SINGLE ITEM

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

// DELETE ALL ITEMS

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

// PRICE ADDER

function showPrice() {
	let newPrice = 0
	const getItems = JSON.parse(localStorage.getItem('items'))

	if (localStorage.getItem('items')) {
		getItems.forEach(item => {
			newPrice += parseFloat(item.amount * item.price)
		})
		total.innerHTML = `${newPrice} €`
	} else {
		total.innerHTML = `0 €`
	}
}

// LIVE SEARCH FILTER

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

// MODAL CONTROLLER

function closeOverview() {
	div.classList.remove('has-overlay')
	addModal.classList.add('d-none')
	emptyModal.classList.add('d-none')
	deleteModal.classList.add('d-none')
	inputDelete.value = ''
	inputEmpty.value = ''
}
