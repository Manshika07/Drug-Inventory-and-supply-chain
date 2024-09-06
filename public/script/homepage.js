const profile = document.getElementById('profile');

profile.addEventListener('click', () => {
    window.location = 'localhost:3000/api/auth/profile'
})

let currentSlide = 0;
const slideInterval = 3000; // 3 seconds

function moveSlide(direction) {
    const sliderContainer = document.querySelector('.slider-container');
    const totalSlides = document.querySelectorAll('.slide').length;
    const sliderWidth = document.querySelector('.slider').offsetWidth;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    sliderContainer.style.transform = `translateX(${-currentSlide * sliderWidth}px)`;

    updateIndicators();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function initializeSlider() {
    const slider = document.querySelector('.slider');
    const indicatorContainer = document.querySelector('.indicators');

    document.querySelectorAll('.slide').forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.addEventListener('click', () => {
            currentSlide = index;
            moveSlide(0);
        });
        indicatorContainer.appendChild(indicator);
    });

    updateIndicators();

    // Auto-slide functionality
    setInterval(() => moveSlide(1), slideInterval);
}

initializeSlider();

window.addEventListener('resize', () => {
    const sliderContainer = document.querySelector('.slider-container');
    const sliderWidth = document.querySelector('.slider').offsetWidth;
    sliderContainer.style.transform = `translateX(${-currentSlide * sliderWidth}px)`;
    updateIndicators();
});
