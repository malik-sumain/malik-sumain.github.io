// SET BIRTHDAY DATE (not used in this version but kept for reference)
const birthday = new Date("February 23, 2026 00:00:00").getTime();

// Elements we no longer actively manipulate
// const countdownEl = document.getElementById("countdown");
// const messageEl = document.getElementById("message");
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

// build an array of date->link entries for the dropdown
const linkEntries = [];
// compute human-readable dates based on the birthday constant
(function buildLinkEntries() {
    const birthdayDate = new Date("February 23, 2026");
    birthdayDate.setHours(0,0,0,0);
    // memes correspond to 3 days before, 2 days before, 1 day before, and birthday
    for (let i = 0; i < memes.length; i++) {
        const entryDate = new Date(birthdayDate);
        entryDate.setDate(entryDate.getDate() - (3 - i));
        linkEntries.push({
            date: entryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            url: memes[i]
        });
    }
    // final surprise entry the day after birthday
    const finalDate = new Date(birthdayDate);
    finalDate.setDate(finalDate.getDate() + 1);
    linkEntries.push({
        date: finalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: 'https://www.youtube.com/shorts/oxWnDH747jg'
    });
})();

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
        b.textContent = 'BAZINGA!'; // all caps, funky
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




// --------- birthday links dropdown logic ----------
function setupLinkDropdown() {
    const dropdown = document.getElementById('linksDropdown');
    const result = document.getElementById('linkResult');
    if (!dropdown || !result) return;

    // default placeholder option
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = '-- select a date --';
    placeholder.disabled = true;
    placeholder.selected = true;
    dropdown.appendChild(placeholder);

    linkEntries.forEach(entry => {
        const opt = document.createElement('option');
        opt.value = entry.url;
        opt.textContent = entry.date;
        dropdown.appendChild(opt);
    });

    dropdown.addEventListener('change', () => {
        const url = dropdown.value;
        const selectedText = dropdown.options[dropdown.selectedIndex].text;
        if (url) {
            // convert to watch url if needed
            const idMatch = url.match(/(?:embed\/|v=|be\/)([A-Za-z0-9_-]{11})/);
            const watchUrl = idMatch ? `https://www.youtube.com/watch?v=${idMatch[1]}` : url;
            result.innerHTML = `<p><a href="${watchUrl}" target="_blank" rel="noopener noreferrer">Open link for ${selectedText}</a></p>`;
        } else {
            result.innerHTML = '';
        }
    });
}

// run once right away (script loaded at bottom)
setupLinkDropdown();

// schedule periodic bubbles every 10 seconds
setInterval(() => {
    showBazingaBubbles();
}, 10000);
