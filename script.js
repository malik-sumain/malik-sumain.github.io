// SET BIRTHDAY DATE
const birthday = new Date("February 21, 2026 00:00:00").getTime();

const countdownEl = document.getElementById("countdown");
const messageEl = document.getElementById("message");
const memeEl = document.getElementById("dailyMeme");

const memes = [
    "https://www.youtube.com/shorts/a70duJHmn2Q",
    "https://www.youtube.com/shorts/a70duJHmn2Q",
    "https://www.youtube.com/shorts/zzlm9_6G0Kg",
    "https://www.youtube.com/shorts/2-ZxoQczqM0"
];

// Messages corresponding to each meme (same order)
const memeMessages = [
    "Can't stop smiling — enjoy this short! 😄",
    "Thoda sa gyaan!- Never Chase, be you! 😄",
    "Almost there — one more laugh coming up! 😜",
    "Final day special — Happy Birthday to you!! 🎂🎉"
];

function buildEmbedUrl(url) {
    const match = url.match(/(?:embed\/|v=|be\/)([A-Za-z0-9_-]{11})/);
    const id = match ? match[1] : url;
    return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&rel=0&playsinline=1`;
}

const interval = setInterval(() => {

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

    // 🎭 Show memes when 3 days left (including final day = 0)
    if (days <= 3 && days >= 0) {
        const idx = 3 - days;
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
