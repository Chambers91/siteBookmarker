//listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e){
//get form values
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;

var bookmark = {
  name: siteName,
  url: siteUrl
}
/*
  //Local storage test
  localStorage.setItem('test', 'Hello World');
  console.log(localStorage.getItem('test'));
  localStorage.removeItem('test');
  console.log(localStorage.getItem('test'));
*/
//Tets if bookmarks are null
if(localStorage.getItem('bookmarks') === null){
  //Init array
  var bookmarks = [];
  //add to array
  bookmarks.push(bookmark);
  //set localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
} else {
  //Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //add bookmark to array
  bookmarks.push(bookmark);
  // Reset back to local storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}
  //prevent form from submitting
  e.preventDefault();
}
