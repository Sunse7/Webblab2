let key = 'b6hep';
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
let bookNameField;
let bookAuthorField;
let addBookButton;
let bookList; 
const tryTimes = 9;

window.addEventListener('load', ()=> {
	bookNameField = document.getElementById('book-name');
	bookAuthorField = document.getElementById('book-author-name');
	addBookButton = document.getElementById('add-book-button');
	bookList = document.getElementById('current-book-list');
	addBookButton.addEventListener('click', addBook);
})

function addBook(tryTimes) {
	if (tryTimes <= 0) {
		console.log('')
		return;
	}
	const insertBook = '&op=insert';
	const bookTitle = '&title=' + bookNameField.value;
	const bookAuthor = '&author=' + bookAuthorField.value;
	const endpoint = baseUrl + insertBook + bookTitle + bookAuthor;
	fetch(endpoint).then(response => response.json).then(json => {
		console.log(json.status)
		if (json.status === 'success') {
			console.log('Successfully added book')
			bookNameField.value = '';
			bookAuthorField.value = '';
		}
		else {
			return addBook(tryTimes--);
		}	
	});
}

function viewBookList() {
	const viewBook = '&op=select';
	const endpoint = baseUrl + viewBook;
	fetch(endpoint).then(response => response.json()).then(json => {
		if (json.status === 'success') {
			let bookArray = [];
			json.data.forEach(element => {
				bookArray.push({title: element.title, author: element.author});
			});
			bookList.innerHTML = '';
			for (let i = 0; i < bookArray.length; i++) {
				let makeList = document.createElement('li');
				makeList.innerHTML = `Title: ${bookArray[i].title} Author: ${bookArray[i].author}`;	
				bookList.appendChild(makeList);
			}
		}
	});
}
	


