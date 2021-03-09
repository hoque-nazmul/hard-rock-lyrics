const searchArea = document.getElementById('search-field');
const searchBtn = document.getElementById('search-btn');
const lyricsArea = document.getElementById('lyrics-area');
const lyricsBtn = document.getElementById('lyrics-btn');
const song = document.getElementById('song');
const singer = document.getElementById('singer');
let searchInput = '';
let lyricsAPI = '';

const getData = async (api) => { 
    const response = await fetch(api);
    const data = await response.json();
    console.log(data);
}

searchArea.addEventListener('keyup', function (e) { 
    searchInput = e.target.value;
    if (searchInput.length) { 
        lyricsAPI = `https://api.lyrics.ovh/suggest/${searchInput}`;
        getData(lyricsAPI);
    }
})

searchBtn.addEventListener('click', function () {
    searchInput.length && getData(lyricsAPI);
})
