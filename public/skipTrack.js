const allElementsLi = document.getElementsByTagName('li');
const keys = Object.keys(allElementsLi);

const oggTracks = [];
const mp3Tracks = [];

for (const key of keys) {
    oggTracks.push(`${allElementsLi[key].textContent}.ogg`);
    mp3Tracks.push(`${allElementsLi[key].textContent}.mp3`);
}

function getNextTrack() {
    const oggTrack = document.getElementById('ogg');
    const mp3Track = document.getElementById('mp3');
    if (oggTracks.indexOf(oggTrack.getAttribute('src')) === oggTracks.length - 1) {
        oggTrack.setAttribute('src', oggTracks[0]);
        mp3Track.setAttribute('src', mp3Tracks[0]);
    } else {
        document.getElementById('player').setAttribute('autoplay', 'autoplay');
        oggTrack.setAttribute('src', oggTracks[oggTracks.indexOf(oggTrack.getAttribute('src')) + 1]);
        mp3Track.setAttribute('src', mp3Tracks[mp3Tracks.indexOf(mp3Track.getAttribute('src')) + 1]);
    }
    document.getElementById('player').load();
}