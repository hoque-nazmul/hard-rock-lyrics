const searchArea = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
const lyricsArea = document.getElementById('lyrics-area');
const searchResult = document.getElementById('search-result');
let searchInput = '';
let lyricsAPI = '';

const getSearchResults = async (api) => { 
    const response = await fetch(api);
    const data = await response.json();
    displayLyricsList(data);
}

const getLyric = async (artist, title) => { 
    lyricsArea.innerText = '';
    try {
        const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
        const data = await response.json();
        displayLyric(data)
    }
    catch (err) { 
        console.log("Data Not Found!");
    }
}

const displayLyricsList = (obj) => { 
    let songDiv = '';
    obj.data.forEach(data => { 
        songDiv += `<div class="single-result row align-items-center my-3 p-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name">${data.title}</h3>
                                <p class="author lead">Album by <span>${data.artist.name}</span></p>
                            </div>
                            <div class="col-md-3 text-md-right text-center">
                                <button onClick="getLyric('${data.artist.name}','${data.title}')" class="btn btn-success btn-lyrics">Get Lyrics</button>
                            </div>
                        </div>`;
    }) 
    searchResult.innerHTML = songDiv;
}

const displayLyric = (data) => { 
    if (data) {
        lyricsArea.innerText = data.lyrics;
    }
}

searchArea.addEventListener('keyup', function (e) {
    searchInput = e.target.value;
    lyricsArea.innerText = '';
    if (searchInput.length) {
        lyricsAPI = `https://api.lyrics.ovh/suggest/${searchInput}`;
        getSearchResults(lyricsAPI);
    }
});

searchBtn.addEventListener('click', function () {
    searchInput.length && getSearchResults(lyricsAPI);
});
