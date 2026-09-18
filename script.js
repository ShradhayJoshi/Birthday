document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTS
    ========================================================= */

    const intro = document.getElementById("intro");
    const birthday = document.getElementById("birthday");

    const giftButton = document.getElementById("giftButton");
    const buttonText = document.getElementById("buttonText");
    const attemptText = document.getElementById("attemptText");

    const surpriseButton = document.getElementById("surpriseButton");
    const surpriseButtonText = document.getElementById("surpriseButtonText");

    const finalReveal = document.getElementById("finalReveal");
    const surpriseImage = document.getElementById("surpriseImage");

    const toast = document.getElementById("toast");
    const musicButton = document.getElementById("musicButton");

    let giftClicks = 0;
    let surpriseClicks = 0;


    /* =========================================================
       TOAST
    ========================================================= */

    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {
            toast.classList.remove("show");
        }, 2200);
    }


    /* =========================================================
       FIRST GIFT — EXACTLY 3 CLICKS
    ========================================================= */

    if (giftButton) {

        giftButton.addEventListener("click", () => {

            giftClicks++;

            /* CLICK 1 */
            if (giftClicks === 1) {

                if (buttonText)
                    buttonText.textContent = "Hmm... not yet ♡";

                if (attemptText)
                    attemptText.textContent = "You have to try once more...";

                showToast("Not so fast, Princess ♡");

                createHeartBurst(giftButton);

            }

            /* CLICK 2 */
            else if (giftClicks === 2) {

                if (buttonText)
                    buttonText.textContent = "Alright, Princess... ♡";

                if (attemptText)
                    attemptText.textContent = "One last click...";

                showToast("Okay... one last time 💗");

                createHeartBurst(giftButton);

            }

            /* CLICK 3 */
            else if (giftClicks === 3) {

                giftButton.disabled = true;

                if (buttonText)
                    buttonText.textContent = "Opening your gift... ♡";

                if (attemptText)
                    attemptText.textContent = "For my beautiful queen ✨";

                showToast("Your surprise is ready 💖");

                createHeartBurst(giftButton);

                setTimeout(() => {

                    if (intro) {
                        intro.classList.add("fade-out");
                    }

                }, 100);

                setTimeout(() => {

                    if (intro) {
                        intro.classList.add("hidden");
                    }

                    if (birthday) {
                        birthday.classList.remove("hidden");
                        birthday.classList.add("page-enter");
                    }

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                    createMassiveHeartBurst();

                }, 900);

            }

        });

    }


    /* =========================================================
       SECOND SURPRISE — EXACTLY 2 CLICKS
    ========================================================= */

    if (surpriseButton) {

        surpriseButton.addEventListener("click", () => {

            surpriseClicks++;

            /* CLICK 1 — ONLY TEASING */
            if (surpriseClicks === 1) {

                if (surpriseButtonText)
                    surpriseButtonText.textContent = "Hmm... one more time ♡";

                showToast("There is still one more little surprise 💕");

                createHeartBurst(surpriseButton);

                /*
                   IMPORTANT:
                   NO BLUR
                   NO IMAGE
                   NO FINAL REVEAL
                   NO BACKGROUND CHANGE
                */

            }

            /* CLICK 2 — FINAL REVEAL */
            else if (surpriseClicks === 2) {

                surpriseButton.disabled = true;

                if (surpriseButtonText)
                    surpriseButtonText.textContent = "Opening your surprise... ♡";

                showToast("For you, my queen 💖");

                createMassiveHeartBurst();

                /*
                   Load the second image BEFORE revealing it
                */

                if (surpriseImage) {

                    surpriseImage.onload = () => {
                        revealFinalSurprise();
                    };

                    surpriseImage.onerror = () => {
                        console.warn("Surprise image could not be loaded.");
                        revealFinalSurprise();
                    };

                    surpriseImage.src = "./IMG20250221150739.jpg";

                    /*
                       If browser already cached it
                    */
                    if (surpriseImage.complete) {
                        setTimeout(() => {
                            revealFinalSurprise();
                        }, 100);
                    }

                } else {
                    revealFinalSurprise();
                }

            }

        });

    }


    /* =========================================================
       FINAL SURPRISE REVEAL
    ========================================================= */

    function revealFinalSurprise() {

        if (birthday) {
            birthday.classList.add("second-surprise-active");
        }

        document.body.classList.add("surprise-open");

        setTimeout(() => {

            if (finalReveal) {

                finalReveal.classList.remove("hidden");

                finalReveal.style.display = "flex";
                finalReveal.style.visibility = "visible";
                finalReveal.style.opacity = "1";

            }

            if (surpriseImage) {

                surpriseImage.style.display = "block";
                surpriseImage.style.visibility = "visible";
                surpriseImage.style.opacity = "1";

            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            createMassiveHeartBurst();

        }, 450);

    }


    /* =========================================================
       GLOBAL LOVE EFFECT
       WORKS ON EVERY SCREEN
    ========================================================= */

    function createFloatingHeart() {

        const heart = document.createElement("div");

        heart.className = "floating-heart";

        const symbols = [
            "♡",
            "♥",
            "💕",
            "💗",
            "💖",
            "💘",
            "💝",
            "✨"
        ];

        heart.innerHTML =
            symbols[Math.floor(Math.random() * symbols.length)];

        const size = 12 + Math.random() * 25;
        const duration = 4 + Math.random() * 4;
        const startX = Math.random() * 100;
        const drift = Math.random() * 240 - 120;

        heart.style.left = `${startX}vw`;
        heart.style.top = "105vh";
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;

        /*
           Keep hearts above the final surprise overlay
        */

        heart.style.zIndex = "100010";

        heart.style.setProperty(
            "--heart-x",
            `${drift}px`
        );

        heart.style.pointerEvents = "none";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, (duration + 1) * 1000);

    }


    /*
       ONE SINGLE GLOBAL HEART LOOP

       It runs regardless of whether the user is on:
       INTRO
       BIRTHDAY
       FINAL SURPRISE
    */

    setInterval(createFloatingHeart, 700);


    /* =========================================================
       HEART BURST
    ========================================================= */

    function createHeartBurst(element) {

        if (!element) return;

        const rect = element.getBoundingClientRect();

        for (let i = 0; i < 12; i++) {

            const heart = document.createElement("div");

            heart.className = "floating-heart";

            heart.innerHTML = [
                "♡",
                "♥",
                "💕",
                "💗",
                "💖",
                "✨"
            ][Math.floor(Math.random() * 6)];

            heart.style.position = "fixed";

            heart.style.left =
                `${rect.left + rect.width / 2}px`;

            heart.style.top =
                `${rect.top + rect.height / 2}px`;

            heart.style.zIndex = "100020";

            heart.style.fontSize =
                `${14 + Math.random() * 20}px`;

            heart.style.pointerEvents = "none";

            heart.style.setProperty(
                "--heart-x",
                `${Math.random() * 260 - 130}px`
            );

            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);

        }

    }


    /* =========================================================
       MASSIVE HEART BURST
    ========================================================= */

    function createMassiveHeartBurst() {

        for (let i = 0; i < 35; i++) {

            setTimeout(() => {

                const heart = document.createElement("div");

                heart.className = "floating-heart";

                heart.innerHTML = [
                    "♡",
                    "♥",
                    "💕",
                    "💗",
                    "💖",
                    "💘",
                    "💝",
                    "✨"
                ][Math.floor(Math.random() * 8)];

                heart.style.position = "fixed";

                heart.style.left =
                    `${Math.random() * 100}vw`;

                heart.style.top =
                    `${80 + Math.random() * 20}vh`;

                heart.style.zIndex = "100020";

                heart.style.fontSize =
                    `${15 + Math.random() * 30}px`;

                heart.style.pointerEvents = "none";

                heart.style.setProperty(
                    "--heart-x",
                    `${Math.random() * 300 - 150}px`
                );

                document.body.appendChild(heart);

                setTimeout(() => {
                    heart.remove();
                }, 6000);

            }, i * 60);

        }

    }


    /* =========================================================
       MOUSE LOVE / SPARKLE EFFECT
    ========================================================= */

    let lastSparkleTime = 0;

    document.addEventListener("mousemove", (event) => {

        const now = Date.now();

        if (now - lastSparkleTime < 80) return;

        lastSparkleTime = now;

        if (Math.random() > 0.45) return;

        const sparkle = document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.innerHTML = "♡";

        sparkle.style.position = "fixed";

        sparkle.style.left =
            `${event.clientX}px`;

        sparkle.style.top =
            `${event.clientY}px`;

        sparkle.style.zIndex = "100015";

        sparkle.style.pointerEvents = "none";

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1200);

    });


    /* =========================================================
       MUSIC BUTTON
    ========================================================= */

    if (musicButton) {

        const music =
            document.getElementById("birthdayMusic") ||
            document.getElementById("music");

        if (music) {

            musicButton.addEventListener("click", () => {

                if (music.paused) {

                    music.play()
                        .then(() => {
                            musicButton.classList.add("playing");
                        })
                        .catch(() => {
                            showToast("Tap again to play the music ♡");
                        });

                } else {

                    music.pause();

                    musicButton.classList.remove("playing");

                }

            });

        }

    }


    /* =========================================================
       IMAGE SAFETY
    ========================================================= */

    if (surpriseImage) {

        surpriseImage.addEventListener("load", () => {

            surpriseImage.style.opacity = "1";
            surpriseImage.style.visibility = "visible";

        });

    }


    /* =========================================================
       REDUCED MOTION
    ========================================================= */

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {

        document.documentElement.classList.add(
            "reduce-motion"
        );

    }


    /* =========================================================
       INITIAL LOVE BURST
    ========================================================= */

    setTimeout(() => {
        createHeartBurst(giftButton);
    }, 1200);

});