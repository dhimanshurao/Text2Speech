// script.js
const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const resumeButton = document.getElementById('resume-button');
const stopButton = document.getElementById('stop-button');

let synth = window.speechSynthesis;
let voices = [];
let utterThis = null;

function populateVoiceList() {
    voices = synth.getVoices();
    voiceSelect.innerHTML = '';
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    });
}

if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = populateVoiceList;
}

playButton.addEventListener('click', () => {
    const text = textInput.value;
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    utterThis = new SpeechSynthesisUtterance(text);
    utterThis.voice = voices.find(voice => voice.name === selectedVoice);

    synth.speak(utterThis);

    playButton.disabled = true;
    pauseButton.disabled = false;
    stopButton.disabled = false;
});

pauseButton.addEventListener('click', () => {
    synth.pause();
    pauseButton.disabled = true;
    resumeButton.disabled = false;
});

resumeButton.addEventListener('click', () => {
    synth.resume();
    pauseButton.disabled = false;
    resumeButton.disabled = true;
});

stopButton.addEventListener('click', () => {
    synth.cancel();
    playButton.disabled = false;
    pauseButton.disabled = true;
    resumeButton.disabled = true;
    stopButton.disabled = true;
});

populateVoiceList(); 
