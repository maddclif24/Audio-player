function ready() {
    let pathOgg = document.getElementById('ogg');
    let trackOgg = pathOgg.getAttribute('src').slice(7, -4);
    let currentTrack = document.getElementById('current-track');
    currentTrack.textContent = trackOgg;
}
document.getElementById('player').addEventListener('playing', ready);
