let currentSlide = 0;
const slidesWrapper = document.getElementById('slidesWrapper');
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Auto-play settings
const SLIDE_DURATION = 3000; // 3 seconds per slide
let autoPlayInterval;
let isAutoPlaying = true;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => {
        goToSlide(i);
        pauseAutoPlay();
    };
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.dot');

// Auto-play function
function startAutoPlay() {
    isAutoPlaying = true;
    autoPlayInterval = setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            changeSlide(1);
        } else {
            // Last slide reached, stop auto-play and show continue button
            clearInterval(autoPlayInterval);
            showContinueButton();
        }
    }, SLIDE_DURATION);
}

function showContinueButton() {
    const continueBtn = document.querySelector('.continue-button');
    continueBtn.classList.add('visible');
}

function pauseAutoPlay() {
    isAutoPlaying = false;
    clearInterval(autoPlayInterval);
}

function resumeAutoPlay() {
    if (!isAutoPlaying) {
        startAutoPlay();
    }
}

// Touch/Swipe functionality
let touchStartX = 0;
let touchEndX = 0;

slidesWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    pauseAutoPlay();
});

slidesWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Mouse drag functionality for desktop
let mouseStartX = 0;
let mouseEndX = 0;
let isDragging = false;

slidesWrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    mouseStartX = e.screenX;
    pauseAutoPlay();
});

slidesWrapper.addEventListener('mousemove', (e) => {
    if (isDragging) {
        mouseEndX = e.screenX;
    }
});

slidesWrapper.addEventListener('mouseup', (e) => {
    if (isDragging) {
        mouseEndX = e.screenX;
        handleMouseSwipe();
        isDragging = false;
    }
});

slidesWrapper.addEventListener('mouseleave', () => {
    isDragging = false;
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        changeSlide(1); // Swipe left
    }
    if (touchEndX > touchStartX + 50) {
        changeSlide(-1); // Swipe right
    }
}

function handleMouseSwipe() {
    if (mouseEndX < mouseStartX - 50) {
        changeSlide(1); // Drag left
    }
    if (mouseEndX > mouseStartX + 50) {
        changeSlide(-1); // Drag right
    }
}

function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = 0;
    }
    if (currentSlide >= totalSlides) {
        currentSlide = totalSlides - 1;
    }

    updateSlideshow();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlideshow();
}

function updateSlideshow() {
    // Move slides
    slidesWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Update navigation buttons
    prevBtn.disabled = currentSlide === 0;
    nextBtn.disabled = currentSlide === totalSlides - 1;
}

function goToSuccess() {
    window.location.href = 'success.html';
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
        pauseAutoPlay();
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
        pauseAutoPlay();
    } else if (e.key === 'Enter') {
        goToSuccess();
    }
});

// Navigation button clicks pause auto-play
prevBtn.addEventListener('click', () => {
    pauseAutoPlay();
});

nextBtn.addEventListener('click', () => {
    pauseAutoPlay();
});

// Initialize
updateSlideshow();
startAutoPlay();
