// DOM ELEMENTS
const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");

// LOAD SAVED BOOKMARKS
document.addEventListener("DOMContentLoaded", loadBookmarks);

// ADD BOOKMARK BUTTON
addBookmarkBtn.addEventListener("click", function () {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();

    if (!name || !url) {
        alert("Please enter both name and URL.");
        return;
    }

    // CHECK URL
    let parsedUrl;

    try {
        parsedUrl = new URL(url);
    } catch {
        alert("Please enter a valid URL.");
        return;
    }

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        alert("Please enter a URL starting with http:// or https://");
        return;
    }

    addBookmark(name, parsedUrl.href);
    saveBookmark(name, parsedUrl.href);

    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
});

// CREATE AND DISPLAY A BOOKMARK
function addBookmark(name, url) {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.href = url;
    link.textContent = name;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";

    removeButton.addEventListener("click", function () {
        bookmarkList.removeChild(li);
        removeBookmarkFromStorage(name, url);
    });

    li.appendChild(link);
    li.appendChild(removeButton);
    bookmarkList.appendChild(li);
}

// GET BOOKMARKS FROM LOCAL STORAGE
function getBookmarksFromStorage() {
    const bookmarks = localStorage.getItem("bookmarks");

    try {
        return bookmarks ? JSON.parse(bookmarks) : [];
    } catch {
        return [];
    }
}

// SAVE A BOOKMARK
function saveBookmark(name, url) {
    const bookmarks = getBookmarksFromStorage();
    bookmarks.push({ name: name, url: url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

// LOAD SAVED BOOKMARKS
function loadBookmarks() {
    const bookmarks = getBookmarksFromStorage();

    bookmarks.forEach(function (bookmark) {
        addBookmark(bookmark.name, bookmark.url);
    });
}

// REMOVE BOOKMARK FROM LOCAL STORAGE
function removeBookmarkFromStorage(name, url) {
    let bookmarks = getBookmarksFromStorage();

    bookmarks = bookmarks.filter(function (bookmark) {
        return bookmark.name !== name || bookmark.url !== url;
    });

    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
