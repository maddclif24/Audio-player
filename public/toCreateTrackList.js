function addTrackList() {
    const oggTracks = [
        'jazzfrenchy.mp3', 'jazzfrenchy.ogg', 'track3.ogg', 'track4.ogg', 'jazzpiano.mp3', 'jazzpiano.ogg'
    ];
    const trackList = oggTracks.map((item) => item.slice(0, -4));
    const list = document.getElementById('trackList');
    for (const item of trackList) {
        const li = document.createElement('li');
        const textNode = document.createTextNode(`${item}`);
        li.append(textNode);
        list.append(li);
    }
}

document.addEventListener('DOMContentLoaded', addTrackList);