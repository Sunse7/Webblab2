window.addEventListener('load', ()=> {
	const bookNameField = document.getElementById('book-name');
	const bookAuthorField = document.getElementById('book-author-name');
	const addBookButton = document.getElementById('add-book-button');
	const bookList = document.getElementById('current-book-list');
	addBookButton.addEventListener('click', addBook);
})

let key = 'b6hep';
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;

function addBook() {
	const insertBook = '&op=insert';
	const bookTitle = '&title=' + bookNameField.value;
	const bookAuthor = '&author=' + bookAuthorField.value;
	const endpoint = baseUrl + insertBook + bookTitle + bookAuthor;
	fetch(endpoint).then(response => response.json).then(json => {console.log(json.status)});
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
						
			for (let i = 0; i < bookArray.length; i++) {
				let makeList = document.createElement('li');
				makeList.innerHTML = `Title: ${bookArray[i].title} Author: ${bookArray[i].author}`;	
				bookList.appendChild(makeList);
			}
		}
	});
}
	


