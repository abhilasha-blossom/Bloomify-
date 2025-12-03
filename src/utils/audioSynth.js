class AudioSynth {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.masterGain = this.ctx.createGain();
        this.masterGain.connect(this.ctx.destination);
        this.masterGain.gain.value = 0.4;
        this.activeOscillators = [];
        this.currentSeason = null;
        this.musicInterval = null;
    }

    async resumeContext() {
        if (this.ctx.state === 'suspended') {
            await this.ctx.resume();
        }
    }

    // --- SFX ---

    async playWater() {
        await this.resumeContext();
        const bufferSize = this.ctx.sampleRate * 0.5;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
        filter.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.5);
        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.8, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.5);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
    }

    async playSuccess() {
        await this.resumeContext();
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C Major
        notes.forEach((freq, i) => this.playTone(freq, now + i * 0.05, 0.3, 'sine'));
    }

    async playPop() {
        await this.resumeContext();
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.frequency.setValueAtTime(800, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playTone(freq, startTime, duration, type = 'sine', vol = 0.2) {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0, startTime);
        gain.gain.linearRampToValueAtTime(vol, startTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(startTime);
        osc.stop(startTime + duration);
    }

    // --- Generative Music ---

    stopMusic() {
        if (this.musicInterval) clearInterval(this.musicInterval);
        this.activeOscillators.forEach(osc => {
            try { osc.stop(); } catch (e) { }
        });
        this.activeOscillators = [];
    }

    playMusic(season) {
        this.stopMusic();
        this.currentSeason = season;
        this.resumeContext();

        switch (season) {
            case 'spring': this.startSpringMusic(); break;
            case 'summer': this.startSummerMusic(); break;
            case 'autumn': this.startAutumnMusic(); break;
            case 'winter': this.startWinterMusic(); break;
        }
    }

    startSpringMusic() {
        // Gentle Pentatonic Plucks (C Major Pentatonic)
        const notes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
        this.musicInterval = setInterval(() => {
            if (Math.random() > 0.6) {
                const note = notes[Math.floor(Math.random() * notes.length)];
                this.playTone(note, this.ctx.currentTime, 2, 'triangle', 0.05);
            }
        }, 1000);
    }

    startSummerMusic() {
        // Warm Drone (F Major) + Occasional high "cricket"
        const droneFreqs = [174.61, 220.00, 261.63]; // F3, A3, C4
        droneFreqs.forEach(freq => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq;
            gain.gain.value = 0.03;
            osc.connect(gain);
            gain.connect(this.masterGain);
            osc.start();
            this.activeOscillators.push(osc);
        });

        this.musicInterval = setInterval(() => {
            if (Math.random() > 0.8) {
                // Cricket chirp
                this.playTone(4000 + Math.random() * 500, this.ctx.currentTime, 0.1, 'square', 0.02);
            }
        }, 500);
    }

    startAutumnMusic() {
        // Melancholic Wind (Filtered Noise) + Sparse Piano (A Minor)
        const bufferSize = this.ctx.sampleRate * 2;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;
        const filter = this.ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 400;
        filter.Q.value = 1;

        // Animate wind filter
        setInterval(() => {
            filter.frequency.rampTo(200 + Math.random() * 400, 2);
        }, 2000);

        const gain = this.ctx.createGain();
        gain.gain.value = 0.05;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain);
        noise.start();
        this.activeOscillators.push(noise);

        const notes = [220.00, 261.63, 329.63, 392.00, 440.00]; // A Minor
        this.musicInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                const note = notes[Math.floor(Math.random() * notes.length)];
                this.playTone(note, this.ctx.currentTime, 3, 'sine', 0.08);
            }
        }, 2000);
    }

    startWinterMusic() {
        // Icy Chimes (High E Minor)
        const notes = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
        this.musicInterval = setInterval(() => {
            if (Math.random() > 0.5) {
                const note = notes[Math.floor(Math.random() * notes.length)];
                this.playTone(note, this.ctx.currentTime, 4, 'sine', 0.05);
            }
        }, 1500);
    }
}

export const audioSynth = new AudioSynth();
