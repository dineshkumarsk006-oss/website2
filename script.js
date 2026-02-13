document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.querySelector('.yes-button');
    const noBtn = document.querySelector('.no-button');
    const mainImage = document.querySelector('.img-container img');

    const phrases = [
        "Wrong button ❌",
        "Are you sure 🤔?",
        "But what if 🫣?",
        "You're breaking my heart 💔",
        "Pwetty please 🥺👉👈",
        "Can't catch up? 😂"
    ];

    // Yes Button Interactions
    yesBtn.addEventListener('mouseover', () => {
        mainImage.src = 'images/heppi.gif';
        mainImage.width = 270;
        mainImage.height = 200;
        mainImage.classList.add('cat');
    });

    yesBtn.addEventListener('mouseout', () => {
        mainImage.src = 'images/please.gif';
        mainImage.width = 340;
        mainImage.height = 200;
        mainImage.classList.remove('cat');
    });

    yesBtn.addEventListener('click', () => {
        window.location.href = 'slideshow.html';
    });

    // No Button Interactions
    function moveButton() {
        const maxWidth = window.innerWidth - noBtn.offsetWidth;
        const maxHeight = window.innerHeight - noBtn.offsetHeight;

        const randomX = Math.floor(Math.random() * maxWidth);
        const randomY = Math.floor(Math.random() * maxHeight);

        noBtn.style.position = 'fixed';
        noBtn.style.left = `${randomX}px`;
        noBtn.style.top = `${randomY}px`;

        // Clear any previous conflicting styles
        noBtn.style.right = 'auto';
        noBtn.style.bottom = 'auto';

        const randomIndex = Math.floor(Math.random() * phrases.length);
        noBtn.innerText = phrases[randomIndex];
    }

    noBtn.addEventListener('click', moveButton);
    noBtn.addEventListener('mouseover', moveButton);
});
