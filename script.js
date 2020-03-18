let key = 'zbYuQ';
let baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
let bookNameField;
let bookAuthorField;
let bookList; 
const tryTimes = 10;
let bookArray;
let bookIdField;
let modifyBookIdField;
let modifyBookNameField;
let modifyBookAuthorField;
let addBookMessage;
let modifyBookMessage;
let deleteBookMessage;
let viewBookMessage;

window.addEventListener('load', ()=> {
	bookNameField = document.getElementById('book-name');
	bookAuthorField = document.getElementById('book-author-name');
	bookList = document.getElementById('current-book-list');
	bookIdField = document.getElementById('delete-book-id');
	modifyBookIdField = document.getElementById('modify-book-id');
	modifyBookNameField = document.getElementById('modify-book-name');
	modifyBookAuthorField = document.getElementById('modify-book-author-name');
	newAPIKeyList = document.getElementById('new-api-key');
	addBookMessage = document.getElementById('add-book-try-times');
	modifyBookMessage = document.getElementById('modify-book-try-times');
	deleteBookMessage = document.getElementById('delete-book-try-times');
	viewBookMessage = document.getElementById('view-book-try-times');
});

function addBook(tryTimes = 10) {
	if (tryTimes <= 0) {
		addBookMessage.innerHTML = 'Failed to add book';
		return;
	}
	const insertBookQuery = '&op=insert';
	const bookTitleParam = '&title=' + bookNameField.value;
	const bookAuthorParam = '&author=' + bookAuthorField.value;
	const endpoint = baseUrl + insertBookQuery + bookTitleParam + bookAuthorParam;
	fetch(endpoint).then(response => response.json()).then(json => {
		if (json.status === 'success') {
			console.log(`Successfully added book in ${10-tryTimes+1} number of tries`);
			bookNameField.value = '';
			bookAuthorField.value = '';
			addBookMessage.innerHTML = `Successfully added book after ${10 - tryTimes + 1} tries`;
		}
		else {			
			return addBook(tryTimes -1);
		}	
	});
}

function viewBookList(tryTimes = 10) {
	if (tryTimes <= 0) {
		viewBookMessage.innerHTML = 'Failed to fetch books';
		return;
	}
	const viewBookQuery = '&op=select';
	const endpoint = baseUrl + viewBookQuery;
	let idColor = 'ID'.fontcolor('#9999ff');
	let titleColor = 'Title'.fontcolor('#9999ff');
	let authorColor = 'Author'.fontcolor('#9999ff');
	fetch(endpoint).then(response => response.json()).then(json => {
		if (json.status === 'success') {
			bookArray = [];
			json.data.forEach(element => {
				bookArray.push({id: element.id, title: element.title, author: element.author});
			});
			bookList.innerHTML = '';
			for (let i = 0; i < bookArray.length; i++) {
				let makeList = document.createElement('li');
				makeList.innerHTML = `${idColor}: ${bookArray[i].id} ${titleColor}: ${bookArray[i].title} ${authorColor}: ${bookArray[i].author}`;	
				bookList.appendChild(makeList);
			}
			viewBookMessage.innerHTML = `Successfully fetched and updated books after ${10 - tryTimes + 1} tries`;
		}
		else {			
			return viewBookList(tryTimes - 1);
		}
	});
}

function modifyBook(tryTimes = 10) {
	if (tryTimes <= 0) {
		modifyBookMessage.innerHTML = 'Failed to modify book';
		return;
	}
	const modifyBookQuery = '&op=update';
	const modifyBookIdParam = '&id=' + modifyBookIdField.value;
	const newBookName = '&title=' + modifyBookNameField.value;
	const newBookAuthor = '&author=' + modifyBookAuthorField.value;
	const endpoint = baseUrl + modifyBookQuery + modifyBookIdParam + newBookName + newBookAuthor;
	fetch(endpoint).then(response => response.json()).then(json => {
		if (json.status === 'success') {
			console.log('Successfully updated book');
			modifyBookIdField.value = '';
			modifyBookNameField.value = '';
			modifyBookAuthorField.value = '';
			modifyBookMessage.innerHTML = `Successfully modified book after ${10 - tryTimes + 1} tries`;
		}
		else {			
			return modifyBook(tryTimes - 1);
		}
	});
}

function deleteBook(tryTimes = 10) {
	if (tryTimes <= 0) {
		deleteBookMessage.innerHTML = 'Failed to delete book';
		return;
	}
	const deleteBookQuery = '&op=delete';
	const bookIdParam = '&id=' + bookIdField.value;
	const endpoint = baseUrl + deleteBookQuery + bookIdParam;
	fetch(endpoint).then(response => response.json()).then(json => {
		if (json.status === 'success') {
			console.log('Successfully deleted book');
			bookIdField.value = '';
			deleteBookMessage.innerHTML = `Successfully deleted book after ${10 - tryTimes + 1} tries`;
		}
		else {			
			return deleteBook(tryTimes - 1);
		}
	});
}

function requestNewAPIKey() {
	const requestKeyQuery = 'requestKey';
	const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?';
	const endpoint = url + requestKeyQuery;
	fetch(endpoint).then(response => response.json()).then(json => {
		key = json.key;
		console.log(key);
		baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
		let makeAPIKeyList = document.createElement('li');
		makeAPIKeyList.innerHTML = key;
		newAPIKeyList.appendChild(makeAPIKeyList);
	});
}

function openForm(bookForm) {
	switch (bookForm) {
		case 'addBookForm':
			document.getElementById('add-book-form').style.display = 'block';
			document.getElementById('modify-book-form').style.display = 'none';
			document.getElementById('delete-book-form').style.display = 'none';
			addBookMessage.innerHTML = '';
			modifyBookMessage.innerHTML = '';
			deleteBookMessage.innerHTML = '';
			break;
		case 'modifyBookForm':
			document.getElementById('add-book-form').style.display = 'none';
			document.getElementById('modify-book-form').style.display = 'block';
			document.getElementById('delete-book-form').style.display = 'none';
			addBookMessage.innerHTML = '';
			modifyBookMessage.innerHTML = '';
			deleteBookMessage.innerHTML = '';
			break;
		case 'deleteBookForm':
			document.getElementById('add-book-form').style.display = 'none';
			document.getElementById('modify-book-form').style.display = 'none';
			document.getElementById('delete-book-form').style.display = 'block';
			addBookMessage.innerHTML = '';
			modifyBookMessage.innerHTML = '';
			deleteBookMessage.innerHTML = '';
			break;
	}
}
	


