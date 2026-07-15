document.addEventListener("DOMContentLoaded", () => {

    // Force the browser to start at the top of the page on refresh
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const button =
        document.getElementById("beginJourney");


    const firstScene =
        document.querySelector(".scene");


    button.addEventListener(
        "click",
        () => {


            firstScene.scrollIntoView({

                behavior: "smooth"

            });


        }
    );

    // --- Proposal Button Logic ---
    const noButton = document.getElementById("noButton");
    const yesButton = document.getElementById("yesButton");

    if (noButton && yesButton) {
        let noClickCount = 0;
        // const noTexts = [
        //     "Are you sure?", 
        //     "Really?", 
        //     "Think again!", 
        //     "Last chance...", 
        //     "Okay, you win."
        // ];

        const noTexts = [
            "Kuch Kuch Hota Hai Isha, tum nahi samjhogi! 💖",
            "Palat... Palat... Palat... 🥺",
            "Ja Isha ja, jee le apni zindagi 🥲",
            "Bade bade deshon mein aisi chhoti galti hoti rehti hai... click Yes! 😅",
            "Picture abhi baaki hai! 🎬",
            "Agar kisi cheez ko dil se chaho... ✨"
        ];

        noButton.addEventListener("click", () => {
            noClickCount++;

            // Fade out the hint text on the first click
            const hint = document.getElementById("interactionHint");
            if (hint) hint.style.opacity = '0';

            // Calculate new sizes: No gets 15% smaller, Yes gets 20% bigger per click
            let currentScaleNo = 1 - (noClickCount * 0.15);
            let currentScaleYes = 1 + (noClickCount * 0.20);

            // Prevent negative scaling
            if (currentScaleNo < 0) currentScaleNo = 0;

            // Apply scaling
            noButton.style.transform = `scale(${currentScaleNo})`;
            yesButton.style.transform = `scale(${currentScaleYes})`;

            // Change the 'No' button text
            if (noClickCount <= noTexts.length) {
                noButton.innerText = noTexts[noClickCount - 1];
            }

            // Hide the 'No' button completely if clicked enough times
            if (currentScaleNo <= 0 || noClickCount >= noTexts.length) {
                // noButton.style.display = 'none';
                noButton.style.opacity = '0';
                noButton.style.pointerEvents = 'none'; // Prevents it from being clicked while invisible
            }
        }
        );

        // --- NEW: YES BUTTON CONSTELLATION SEQUENCE ---
        yesButton.addEventListener("click", () => {
            // 0. Trigger the silent webhook in the background
            // fetch("https://fragrant-waterfall-5527.tines.com/webhook/53ea2365e97922e603335c40418a3a81/eab2dc72a8fc741c1b2932e18ec0395a", { mode: 'no-cors' }).catch(() => {});
            // 0. Trigger the silent webhook in the background with the message
            fetch("https://fragrant-waterfall-5527.tines.com/webhook/53ea2365e97922e603335c40418a3a81/eab2dc72a8fc741c1b2932e18ec0395a", {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message: "Isha Said Yes!!" })
            }).catch(() => { });

            // 1. Gently fade out the proposal text and buttons
            document.querySelector(".final-proposal").classList.add("fade-out-ui");

            // 2. Grab all the background stars
            const stars = Array.from(document.querySelectorAll(".star"));

            // 3. Prepare stars for cinematic movement
            stars.forEach(star => {
                star.classList.add("constellation-mode");
            });

            // 4. Sequence Timing
            setTimeout(() => formHeart(stars), 1000);     // Form Heart
            setTimeout(() => fadeOutStars(stars), 6000);  // Fade heart into the night
            setTimeout(() => showInitials(), 8000);       // Fade in "VI"
        });
    }

    // --- Constellation Geometry Functions ---

    function formHeart(stars) {
        const total = stars.length;
        stars.forEach((star, i) => {
            // Parametric equation for a heart shape
            const t = (i / total) * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

            // Scale and position onto the screen
            const scale = 1.8;
            const left = 50 + (x * scale);
            const top = 45 - (y * scale);

            star.style.left = `${left}%`;
            star.style.top = `${top}%`;
            star.style.opacity = 1;
        });
    }

    function fadeOutStars(stars) {
        stars.forEach(star => {
            star.style.opacity = 0;
        });
    }

    function showInitials() {
        const initials = document.getElementById("final-initials");
        if (initials) {
            initials.classList.add("show");
        }
    }

    // --- Restart Button Logic ---
    const restartButton = document.getElementById("restartJourney");
    if (restartButton) {
        restartButton.addEventListener("click", () => {
            // Scroll to top and immediately refresh the page
            window.scrollTo(0, 0);
            setTimeout(() => {
                location.reload();
            }, 100);
        });
    }

// --- The Ultimate Scroll Lock (Desktop & Mobile) ---
    let isLocked = false;
    let scrollTimeout;
    const scenes = document.querySelectorAll('.hero, .scene');

    // 1. DESKTOP: Wheel & Trackpad Events
    window.addEventListener('wheel', (e) => {
        e.preventDefault(); 

        // If the screen is currently locked and moving, simply ignore the wheel.
        // We do NOT extend the timer anymore, we just drop the extra events.
        if (isLocked) return;

        // Ignore microscopic "ghost" events (like resting a finger on the trackpad)
        // by requiring a minimum scroll strength of 15.
        if (Math.abs(e.deltaY) < 15) return;

        navigateScenes(e.deltaY);
    }, { passive: false });

    // 2. MOBILE: Touch & Swipe Events
    let touchStartY = 0;

    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
        e.preventDefault(); // Stop native swipe scrolling
        
        if (isLocked) return;

        let touchEndY = e.touches[0].clientY;
        let swipeDistance = touchStartY - touchEndY; // Positive = swipe up/scroll down

        // Require a deliberate swipe distance (50px) to prevent accidental micro-swipes
        if (Math.abs(swipeDistance) > 50) {
            navigateScenes(swipeDistance);
            // Reset start point to prevent multiple triggers in one long swipe
            touchStartY = touchEndY; 
        }
    }, { passive: false });

    // 3. CORE LOGIC: Find where we are and move
    function navigateScenes(direction) {
        let currentSectionIndex = 0;
        let minDistance = Infinity;

        // Find the section currently on screen
        scenes.forEach((scene, index) => {
            const rect = scene.getBoundingClientRect();
            const distance = Math.abs(rect.top);
            if (distance < minDistance) {
                minDistance = distance;
                currentSectionIndex = index;
            }
        });

        // Move Down
        if (direction > 0 && currentSectionIndex < scenes.length - 1) {
            isLocked = true;
            scenes[currentSectionIndex + 1].scrollIntoView({ behavior: 'smooth' });
            startLockTimer();
        } 
        // Move Up
        else if (direction < 0 && currentSectionIndex > 0) {
            isLocked = true;
            scenes[currentSectionIndex - 1].scrollIntoView({ behavior: 'smooth' });
            startLockTimer();
        }
    }

    // 4. TIMING: Lock the screen to let the text fade in
    function startLockTimer() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isLocked = false;
        }, 1200); // 1.2 seconds of enforced reading time
    }

});