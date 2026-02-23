// SET BIRTHDAY DATE
const birthday = new Date("February 23, 2026 00:00:00").getTime();

const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");
const memeEl = document.getElementById("dailyMeme");

const memes = [
    "https://www.youtube.com/shorts/a70duJHmn2Q",
    "https://www.youtube.com/shorts/TTXgKkVsSzU",
    "https://www.youtube.com/shorts/zzlm9_6G0Kg",
    "https://www.youtube.com/shorts/2-ZxoQczqM0"
];

// Messages corresponding to each meme (same order)
const memeMessages = [
    "Thoda sa gyaan!- Never Chase, be you! 😄",
    "We can't forget Nadia! 😄",
    "Birthday Coming Soon! 😜",
    "Final day special — Happy Birthday Yamini!! 🎂🎉"
];

// Final-surprise date (day after birthday)
const finalSurpriseDate = new Date("February 24, 2026");
finalSurpriseDate.setHours(0,0,0,0);

function buildEmbedUrl(url) {
    const match = url.match(/(?:embed\/|v=|be\/)([A-Za-z0-9_-]{11})/);
    const id = match ? match[1] : url;
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&rel=0&playsinline=1`;
}

// Show Bazinga bubble overlay for a given duration (ms)
function showBazingaBubbles(duration = 15000) {
    // prevent multiple overlays
    if (document.getElementById('bazinga-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'bazinga-overlay';
    overlay.className = 'bazinga-overlay';
    document.body.appendChild(overlay);

    const count = 24;
    for (let i = 0; i < count; i++) {
        const b = document.createElement('div');
        b.className = 'bazinga-bubble';
        b.textContent = 'bazinga';
        const size = 40 + Math.random() * 60; // 40-100px
        b.style.width = `${size}px`;
        b.style.height = `${size}px`;
        b.style.left = `${Math.random() * 100}%`;
        b.style.top = `${Math.random() * 100}%`;
        b.style.opacity = `${0.7 + Math.random() * 0.3}`;
        b.style.transform = `translate(-50%,-50%) rotate(${Math.random()*40-20}deg)`;
        b.style.animationDelay = `${Math.random()*0.8}s`;
        b.style.animationDuration = `${6 + Math.random()*6}s`;
        overlay.appendChild(b);
    }

    // remove after duration
    setTimeout(() => {
        overlay.classList.add('bazinga-fade');
        setTimeout(() => { overlay.remove(); }, 800);
    }, duration);
}

const interval = setInterval(() => {

    // Real time for countdown display
    const now = new Date().getTime();
    const distance = birthday - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    countdownEl.innerHTML = `${days}d ${hours}h ${minutes}m`;

    // 🎉 When birthday arrives
    if (distance < 0) {
        clearInterval(interval);
        countdownEl.style.display = "none";
        messageEl.classList.remove("hidden");
    }

    // 🎭 Show memes when 3 days left (including final day = 0) — use calendar days
    const nowCalendar = new Date();
    nowCalendar.setHours(0, 0, 0, 0);
    const birthdayCalendar = new Date("February 23, 2026");
    birthdayCalendar.setHours(0, 0, 0, 0);
    const daysRemaining = Math.floor((birthdayCalendar.getTime() - nowCalendar.getTime()) / (1000 * 60 * 60 * 24));

    if (daysRemaining <= 3 && daysRemaining >= 0) {
        const idx = 3 - daysRemaining;
        const originalEntry = memes[idx];
        const messageText = memeMessages[idx] || "Enjoy this meme!";
        const videoSrc = buildEmbedUrl(originalEntry);
        const idMatch = originalEntry.match(/(?:embed\/|v=|be\/)([A-Za-z0-9_-]{11})/);
        const watchUrl = idMatch ? `https://www.youtube.com/watch?v=${idMatch[1]}` : originalEntry;
        console.log("[meme] index:", idx, "videoSrc:", videoSrc, "watchUrl:", watchUrl, "message:", messageText);
        memeEl.innerHTML = `
            <h2>Daily Meme/Gyaan Surprise 😂</h2>
            <p class="meme-message">${messageText}</p>
            <p><a href="${watchUrl}" target="_blank" rel="noopener noreferrer">Click for gyaan/giggles 🤣</a></p>
        `;
    }

    // Special: on Feb 24, 2026 show one more final surprise link
    const today = new Date();
    today.setHours(0,0,0,0);
    if (today.getTime() === finalSurpriseDate.getTime()) {
        const finalUrl = 'https://www.youtube.com/shorts/oxWnDH747jg';
        const idMatch = finalUrl.match(/(?:embed\/|v=|be\/)([A-Za-z0-9_-]{11})/);
        const watchUrl = idMatch ? `https://www.youtube.com/watch?v=${idMatch[1]}` : finalUrl;
        memeEl.innerHTML = `
            <h2>One more final surprise 🎁</h2>
            <p class="meme-message">Click below for one last thing!</p>
            <p><a id="finalSurpriseLink" href="${watchUrl}" target="_blank" rel="noopener noreferrer">Open the final surprise ✨</a></p>
        `;

        // attach click handler to show bubbles while opening link
        const link = document.getElementById('finalSurpriseLink');
        if (link) {
            link.addEventListener('click', (ev) => {
                // show bubbles on current page
                showBazingaBubbles(15000);
                // let the anchor open in new tab naturally
            });
        }
    }

    // If we've reached the birthday moment (distance < 0) still show the final-day meme
    else if (distance < 0) {
        const idx = 3; // final-day meme index
        const originalEntry = memes[idx];
        const messageText = memeMessages[idx] || "Enjoy this meme!";
        const idMatch = originalEntry.match(/(?:embed\/|v=|be\/)([A-Za-z0-9_-]{11})/);
        const watchUrl = idMatch ? `https://www.youtube.com/watch?v=${idMatch[1]}` : originalEntry;
        console.log("[meme final-day] watchUrl:", watchUrl, "message:", messageText);
        memeEl.innerHTML = `
            <h2>Daily Meme/Gyaan Surprise 😂</h2>
            <p class="meme-message">${messageText}</p>
            <p><a href="${watchUrl}" target="_blank" rel="noopener noreferrer">Click for gyaan/giggles 🤣</a></p>
        `;
    }

}, 1000);
