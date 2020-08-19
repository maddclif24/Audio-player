const oggTracks = ['jazzfrenchy.ogg', 'jazzpiano.ogg'];
const mp3Tracks = ['jazzfrenchy.mp3', 'jazzpiano.mp3'];
const getNextTrack = () => {
    const oggTrack = document.getElementById('ogg');
    const mp3Track = document.getElementById('mp3');
    if (oggTracks.indexOf(oggTrack.getAttribute('src')) === oggTracks.length - 1) {
        oggTrack.setAttribute('src', oggTracks[0]);
        mp3Track.setAttribute('src', mp3Tracks[0]);
    } else {
        oggTrack.setAttribute('src', oggTracks[oggTracks.indexOf(oggTrack.getAttribute('src')) + 1]);
        mp3Track.setAttribute('src', mp3Tracks[mp3Tracks.indexOf(mp3Track.getAttribute('src')) + 1]);
    }
    document.getElementById('player').load();
}