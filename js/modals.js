// BUTTON SELECTORS

let add = document.querySelector('.shoppinglist-add');
let empty = document.querySelector('.shoppinglist-clear');

let closeAdd = document.querySelectorAll('.btn-label')[0];
let cancelAdd = document.querySelectorAll('.btn-cancel')[0];

let closeEmpty = document.querySelectorAll('.btn-label')[1];
let cancelEmpty = document.querySelectorAll('.btn-cancel')[1];

let closeDelete = document.querySelectorAll('.btn-label')[2];
let cancelDelete = document.querySelectorAll('.btn-cancel')[2];

// BUTTON LISTENERS

add.addEventListener('click', e => addOverview(e));

empty.addEventListener('click', e => emptyOverview(e));

closeAdd.addEventListener('click', e => closeOverview(e));

cancelAdd.addEventListener('click', e => closeOverview(e));

closeEmpty.addEventListener('click', e => closeOverview(e));

cancelEmpty.addEventListener('click', e => closeOverview(e));

closeDelete.addEventListener('click', e => closeOverview(e));

cancelDelete.addEventListener('click', e => closeOverview(e));

// MODAL FUNCTIONS

function addOverview() {
	div.classList.add('has-overlay');
	addModal.classList.remove('d-none');
}

function emptyOverview() {
	div.classList.add('has-overlay');
	emptyModal.classList.remove('d-none');
}

function deleteOverview() {
	div.classList.add('has-overlay');
	deleteModal.classList.remove('d-none');
}
