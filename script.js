let key = 'b6hep';
const baseUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?key=' + key;

const bookNameField = document.getElementById('book-name');
const bookAuthorField = document.getElementById('book-author-name');
const addBookButton = document.getElementById('add-book-button');
addBookButton.addEventListener('click', addBook);

function addBook() {
	const insertBook = '&op=insert';
	const bookTitle = '&title=' + bookNameField.value;
	const bookAuthor = '&author=' + bookAuthorField.value;
	const endpoint = baseUrl + insertBook + bookTitle + bookAuthor;
	fetch(endpoint).then(response => response.json).then(json => {console.log(json.status)});
}

