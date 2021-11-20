// SELECTORS

let div = document.querySelector('#overview');

let inputName = document.getElementById('add-item-name');
let inputAmount = document.getElementById('add-item-amount');
let inputPrice = document.getElementById('add-item-price');

let inputEmpty = document.getElementById('empty-mylist');
let confirmEmpty = document.querySelector('.btn-empty');

let inputDelete = document.getElementById('delete-mylist');
let confirmDelete = document.querySelector('.btn-delete');

let newItem = document.querySelector('.item-list');
let confirmItem = document.querySelector('.btn-add');
let inputSearch = document.getElementById('mySearch');

let addModal = document.querySelector('.modal-medium');
let emptyModal = document.querySelector('.modal-small');
let deleteModal = document.querySelector('.modal-delete');

let emptyMessage = document.querySelector('.js-clear-feedback');
let deleteMessage = document.querySelector('.js-delete-feedback');

let total = document.querySelector('.total-price');

let validateName = document.querySelector('.js-name-feedback');
let validateOnlyName = document.querySelector('.js-name-error');
let validateAmount = document.querySelector('.js-amount-feedback');
let validatePrice = document.querySelector('.js-price-feedback');

let filterItem = document.getElementsByTagName('li');
let tempId;

// DELETE ITEM LISTENER

div.addEventListener('click', e => {
	if (e.target.classList.contains('trash-outline')) {
		tempId = e.target.getAttribute('id');
		deleteOverview(e);
	}
});

// FUNCTIONS LISTENERS

confirmItem.addEventListener('click', e => addItem(e));
confirmEmpty.addEventListener('click', e => emptyAll(e));
confirmDelete.addEventListener('click', e => confirmDeleteItem(e));
inputSearch.addEventListener('click', e => liveSearch(e));
