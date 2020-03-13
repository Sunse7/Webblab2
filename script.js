let key = 'b6hep';
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;
let bookNameField;
let bookAuthorField;
let bookList; 
const tryTimes = 10;

window.addEventListener('load', ()=> {
	bookNameField = document.getElementById('book-name');
	bookAuthorField = document.getElementById('book-author-name');
	bookList = document.getElementById('current-book-list');
});

//const addBookButton = document.getElementById('add-book-button');
//addBookButton.addEventListener('click', addBook(tryTimes)); //Gets undefined

function addBook(tryTimes = 10) {
	if (tryTimes <= 0) {
		console.log(`Number of tries: ${tryTimes}`); //Number of tires off by 1
		return;
	}
	const insertBook = '&op=insert';
	const bookTitle = '&title=' + bookNameField.value;
	const bookAuthor = '&author=' + bookAuthorField.value;
	const endpoint = baseUrl + insertBook + bookTitle + bookAuthor;
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
		else {
			return viewBookList(tryTimes -1);
		}
	});
}
	


