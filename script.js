let searchName = document.getElementById('searchName');
document.getElementById('searchBtn').addEventListener('click', () => {
    document.getElementById('matchedResult').innerHTML = '';
    fetchData(searchName.value);
})

function fetchData(inputName){
    fetch(`https://api.lyrics.ovh/suggest/${inputName}`)
    .then(res => { return res.json();})
    .then(showMatches)
}
function showMatches(res){
    for(let i = 0; i <10; i++){
        document.getElementById('matchedResult').innerHTML += `<div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name">${res.data[i].title} <span id="separator">||</span> <span id="album">${res.data[i].album.title}</span></h3>
                <p class="author lead">Album by <span id="getSinger">${res.data[i].artist.name}</span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success" id="btn${i}" onclick="lyricsAppear(${i})">Get Lyrics</button>
            </div>
        </div>`;
    }
}

function lyricsAppear(nameNumber){
    const singerName = document.getElementById('getSinger')
    fetch(`https://api.lyrics.ovh/suggest/${searchName.value}`)
    .then(res => {
        return res.json();
    })
    .then(findName);
    function findName(res){
        const titleName = res.data[nameNumber].title;
        const singerName = res.data[nameNumber].artist.name;
        document.getElementById("titleAndSinger").innerHTML = `<span id="albumTitle">${titleName}</span> - <span id="singerName">${singerName}</span>`;
        document.getElementById("albumTitle").innerText = titleName;
        document.getElementById("singerName").innerText = singerName;
        fetch(`https://api.lyrics.ovh/v1/${singerName}/${titleName}`)
        .then(result => {
            return result.json();
        })
        .then(finalCode)
        function finalCode(result){
            document.getElementById('lyricsResult').innerHTML = `<p>${result.lyrics}</p>`;
            
        }
    }
}

