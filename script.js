let key = 'key=b6hep';
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?' + key;
let bookNameField;
let bookAuthorField;
let bookList; 
const tryTimes = 10;
let bookArray;
let bookIdField;
let modifyBookIdField;
let modifyBookNameField;
let modifyBookAuthorField;

window.addEventListener('load', ()=> {
	bookNameField = document.getElementById('book-name');
	bookAuthorField = document.getElementById('book-author-name');
	bookList = document.getElementById('current-book-list');
	bookIdField = document.getElementById('delete-book-id');
	modifyBookIdField = document.getElementById('modify-book-id');
	modifyBookNameField = document.getElementById('modify-book-name');
	modifyBookAuthorField = document.getElementById('modify-book-author-name');
});

function addBook(tryTimes = 10) {
	if (tryTimes <= 0) {
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
		}
		else {
			return addBook(tryTimes -1);
		}	
	});
}

function viewBookList(tryTimes = 10) {
	if (tryTimes <= 0) {
		return;
	}
	const viewBookQuery = '&op=select';
	const endpoint = baseUrl + viewBookQuery;
	fetch(endpoint).then(response => response.json()).then(json => {
		if (json.status === 'success') {
			bookArray = [];
			json.data.forEach(element => {
				bookArray.push({id: element.id, title: element.title, author: element.author});
			});
			bookList.innerHTML = '';
			for (let i = 0; i < bookArray.length; i++) {
				let makeList = document.createElement('li');
				makeList.innerHTML = `ID: ${bookArray[i].id} Title: ${bookArray[i].title} Author: ${bookArray[i].author}`;	
				bookList.appendChild(makeList);
			}
		}
		else {
			return viewBookList(tryTimes -1);
		}
	});
}

function modifyBook() {
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
		}
		else {
			console.log('Did not work...')
		}
	})
}

function deleteBook(tryTimes = 10) {
	if (tryTimes <= 0) {
		return;
	}
	const deleteBookQuery = '&op=delete';
	const bookIdParam = '&id=' + bookIdField.value;
	const endpoint = baseUrl + deleteBookQuery + bookIdParam;
	fetch(endpoint).then(response => response.json()).then(json => {
		if (json.status === 'success') {
			console.log('Successfully deleted book');
			bookIdField.value = '';
		}
		else {
			return deleteBook(tryTimes--)
		}
	})
}

function requestNewAPIKey() {
	let newKey;
	const requestKeyQuery = 'requestKey';
	const url = 'https://www.forverkliga.se/JavaScript/api/crud.php?';
	const endpoint = url + requestKeyQuery;
	fetch(endpoint).then(response => response.json()).then(json => {
		newKey = json.key;
		console.log(newKey);
	})
}
	


