const showSongs = async () => {
    try {
        const inputText = document.getElementById("input-text").value;
        const url = `https://api.lyrics.ovh/suggest/${inputText}`;
        const response = await fetch(url);
        const getData = await (response).json();
        getSongs(getData.data);//calling the getSongs() function to show the songs in the dom
    } catch (error) {
        alert("something is wrong, please try again");//if the api don't response then show an error message
    }
}

const getSongs = (songs) => {
    document.getElementById("display-all-songs").innerHTML = '';
    document.getElementById("display-lyrics").innerHTML = '';
    //checking the array, if its empty then show an error message else update the dom with results
    if (songs.length === 0) { 
        //if there is no result according to the search then update the dom h3,
        document.getElementById("display-all-songs").innerHTML = `<h3 class="text-center">no songs found</h3>`;
    } else {
        songs.forEach(song => {
            const displayAllSongs = document.getElementById("display-all-songs");
            const div = document.createElement("div");
            div.className = "single-result row align-items-center my-3 p-3";
            const divElements = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" onclick="showLyrics('${song.artist.name}', '${song.title}')">Get Lyrics</button>
            </div>
            <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
            </audio
            `
            div.innerHTML = divElements;
            displayAllSongs.appendChild(div);
        });
    }
}

//show lyrics
const showLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    const response = await fetch(url);
    const data = await response.json();
    getLyrics(data.lyrics);
}

const getLyrics = (lyrics) => {
    if (lyrics === '') { //if there is no lyrics then update the dom with no lyrics found message
        document.getElementById("display-lyrics").innerHTML = `<h3>sorry, no lyrics found</h3>`;
    } else {
        const displayLyrics = document.getElementById("display-lyrics");
        displayLyrics.innerHTML = lyrics;
    }
}