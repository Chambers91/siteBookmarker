//listen for form Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e){
//get form values
var siteName = document.getElementById('siteName').value;
var siteUrl = document.getElementById('siteUrl').value;

/* alert window notification - if the form is not filled out with a valid
url or the textboxes are completely blank*/
if(!validateForm(siteName, siteUrl)){
  return false;
}

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

//clear form
document.getElementById('myForm').reset();

//Refetch bookmarks
fetchBookmarks();

  //prevent form from submitting
  e.preventDefault();
}
//delete BookMarker
function deleteBookmark(url){
  //grab bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //loop through bookmarks
  for(var i =0;i <bookmarks.length;i++){
    if(bookmarks[i].url== url){
  //remove from array
  bookmarks.splice(i, 1);
    }
  }
  //Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

//Refetch bookmarks
fetchBookmarks();
}
  //Fetch bookmarks
  function fetchBookmarks(){
//Get bookmarks from local localStoragevar
var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

//get output id
var bookmarksResults = document.getElementById('bookmarksResults');

//build output
bookmarksResults.innerHTML = '';
for(var i = 0; i < bookmarks.length; i++){
  var name = bookmarks[i].name;
  var url = bookmarks[i].url;

  bookmarksResults.innerHTML += '<div class="well">'+
                                '<h3>'+name+
                                '<a class="btn btn-info" target="_blank" href="'+url+'">Visit</a> ' +
                                '<a onclick ="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                '</h3>'+
                                '</div>';
}
  }

function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert("PLEASE fill out form");
    return false;
  }

  //URL verification to verify that a url is typed in the siteUrl textbox
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('please use a valid URL');
    return false;
  }
  return true;
}
