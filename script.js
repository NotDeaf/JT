let startY;

// Existing wheel event listener for desktop
window.addEventListener('wheel', handleScroll);

// New touchmove event listener for mobile
window.addEventListener('touchstart', (event) => {
    startY = event.touches[0].clientY;
});

window.addEventListener('touchmove', (event) => {
    const endY = event.changedTouches[0].clientY;
    const distance = startY - endY;
    handleScroll({ deltaY: distance });
});

function handleScroll(event) {
    if (!hasZoomed) {
        const image = document.getElementById("coverImage");

        // Detect the direction of the scroll/swipe
        const scrollDirection = event.deltaY;

        if (scrollDirection > 0) {  // If scrolling/swiping down
            // Zoom into a specific point
            image.style.transition = "transform 1s, filter 1s";
            image.style.transform = "translate(-50%, -50%) scale(15)";
            image.style.filter = "blur(10px)"; /* Adjust this value to control the amount of blur */

            // After zoom effect completes, hide the cover and show content
            setTimeout(() => {
                document.querySelector('.cover-container').style.display = 'none';
                document.querySelector('.content').style.display = 'block';
                document.body.style.overflow = 'auto';  // Enable scrolling again
            }, 700);

            hasZoomed = true;  // Prevent the event from triggering again
        }
    }
}
