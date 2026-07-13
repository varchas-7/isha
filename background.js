document.addEventListener("DOMContentLoaded", () => {

// ⭐ STAR GENERATOR (ROBUST)
    const starsContainer = document.querySelector(".stars");

    if (!starsContainer) {
        console.error("Stars container not found!");
        return;
    }

function createStars(count) {

    console.log("Creating stars...");

    for (let i = 0; i < count; i++) {

        const star = document.createElement("div");

        star.classList.add("star");


        // Random depth layer
        const depth = Math.random();


        let size;
        let opacity;
        let duration;
        let glow;


        if (depth < 0.6) {

            // Far stars
            size = Math.random() * 1.5 + 0.5;
            opacity = Math.random() * 0.3 + 0.1;
            duration = Math.random() * 5 + 5;
            glow = 3;

        } 
        
        else if (depth < 0.9) {

            // Medium stars
            size = Math.random() * 2 + 1.5;
            opacity = Math.random() * 0.4 + 0.3;
            duration = Math.random() * 4 + 3;
            glow = 6;

        } 
        
        else {

            // Hero stars
            size = Math.random() * 3 + 2;
            opacity = Math.random() * 0.5 + 0.5;
            duration = Math.random() * 3 + 2;
            glow = 10;

        }


        star.style.width = size + "px";
        star.style.height = size + "px";


        star.style.top =
            Math.random() * 100 + "%";

        star.style.left =
            Math.random() * 100 + "%";


        star.style.opacity = opacity;


        star.style.boxShadow =
            `0 0 ${glow}px rgba(255,255,255,0.9)`;


        star.style.animation =
            `twinkle ${duration}s infinite alternate`;


        starsContainer.appendChild(star);

    }


    console.log("Stars created:", count);

}

    createStars(150);

    // ⭐ SHOOTING STAR GENERATOR
    function spawnShootingStar() {
        const shootingStar = document.createElement("div");
        shootingStar.classList.add("shooting-star");

        // Randomly choose starting side: 50% chance for left or right
        const isLeft = Math.random() > 0.5;

        // Keep the vertical start near the top (0% to 30% down the screen)
        const startTop = Math.random() * 30;
        shootingStar.style.top = startTop + "%";

        if (isLeft) {
            // Start in the Top-Left quadrant (0% to 30% across)
            const startLeft = Math.random() * 30; 
            shootingStar.style.left = startLeft + "%";
            shootingStar.classList.add("left-to-right");
        } else {
            // Start in the Top-Right quadrant (70% to 100% across)
            const startLeft = Math.random() * 30 + 70; 
            shootingStar.style.left = startLeft + "%";
            shootingStar.classList.add("right-to-left");
        }

        starsContainer.appendChild(shootingStar);

        // Remove the star after 4 seconds to match the new slowed-down CSS animation
        setTimeout(() => {
            shootingStar.remove();
        }, 4000);
    }

    // Schedule the next star with increased frequency (every 1 to 3 seconds)
    function scheduleNextShootingStar() {
        const randomDelay = Math.random() * 3500 + 2500; //2000 + 1000;
        setTimeout(() => {
            spawnShootingStar();
            scheduleNextShootingStar(); 
        }, randomDelay);
    }

    // Kick off the shooting star cycle
    setTimeout(scheduleNextShootingStar, 4000);

});