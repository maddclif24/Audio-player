function chooseTrack(event) {
    let a = event.currentTarget;
    let trackName = a.textContent;
    const audioOgg = document.getElementById('ogg');
    const audioMp3 = document.getElementById('mp3');
    audioOgg.setAttribute('src', `tracks/${trackName}.ogg`);
    audioMp3.setAttribute('src', `tracks/${trackName}.ogg`);
    document.getElementById('player').load();
}