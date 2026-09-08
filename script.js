document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       MOBILE MENU
    ========================= */

    const menu = document.querySelector(".menu");
    const nav = document.querySelector(".header nav");

    if (menu && nav) {
        menu.addEventListener("click", () => {
            nav.classList.toggle("open");
            menu.classList.toggle("active");
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                nav.classList.remove("open");
                menu.classList.remove("active");
            });
        });
    }


    /* =========================
       REVEAL ON SCROLL
    ========================= */

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {

                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }

            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =========================
       EXPLODED HEADPHONES
    ========================= */

    const stage = document.getElementById("explodedStage");

    if (stage) {

        const parts = stage.querySelectorAll(".part");

        const positions = [
            [-10, -210],
            [-135, -55],
            [-135, 70],
            [0, 180],
            [135, 70],
            [135, -55]
        ];

        const updateExplosion = () => {

            const rect = stage.getBoundingClientRect();

            const viewportHeight = window.innerHeight;

            const visibleStart = viewportHeight * 0.15;
            const visibleEnd = viewportHeight * 0.9;

            const progress = Math.min(
                1,
                Math.max(
                    0,
                    (visibleEnd - rect.top) /
                    (visibleEnd - visibleStart)
                )
            );

            parts.forEach((part, index) => {

                const [targetX, targetY] = positions[index];

                const x = targetX * progress;
                const y = targetY * progress;

                const rotation =
                    (index % 2 === 0 ? 1 : -1) *
                    progress *
                    8;

                part.style.transform =
                    `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${rotation}deg)`;

            });

        };

        window.addEventListener(
            "scroll",
            updateExplosion,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateExplosion
        );

        updateExplosion();
    }


    /* =========================
       ANIMATED COUNTERS
    ========================= */

    const counters = document.querySelectorAll("[data-count]");

    const counterObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) return;

                const element = entry.target;

                const target =
                    Number(element.dataset.count);

                const duration = 1300;

                const startTime = performance.now();

                const animate = currentTime => {

                    const elapsed =
                        currentTime - startTime;

                    const progress =
                        Math.min(elapsed / duration, 1);

                    const eased =
                        1 - Math.pow(1 - progress, 3);

                    const value =
                        Math.floor(target * eased);

                    element.textContent = value;

                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        element.textContent = target;
                    }
                };

                requestAnimationFrame(animate);

                counterObserver.unobserve(element);
            });

        },
        {
            threshold: 0.7
        }
    );

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });


    /* =========================
       PARALLAX HERO
    ========================= */

    const heroHeadphones =
        document.querySelector(".hero-headphones");

    if (heroHeadphones) {

        let ticking = false;

        const parallax = () => {

            const scroll =
                window.scrollY;

            if (scroll < window.innerHeight * 1.2) {

                const movement =
                    scroll * 0.12;

                const rotation =
                    -7 + scroll * 0.012;

                heroHeadphones.style.transform =
                    `translateY(calc(-50% + ${movement}px))`;

                const headphone =
                    heroHeadphones.querySelector(".headphone");

                if (headphone) {

                    headphone.style.transform =
                        `translate(-50%, -50%) rotate(${rotation}deg)`;
                }
            }

            ticking = false;
        };

        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {
                    requestAnimationFrame(parallax);
                    ticking = true;
                }

            },
            { passive: true }
        );
    }


    /* =========================
       MOUSE PARALLAX
       DESKTOP ONLY
    ========================= */

    if (window.matchMedia("(pointer:fine)").matches) {

        const hero =
            document.querySelector(".hero");

        const headphone =
            document.querySelector(".hero-headphones");

        if (hero && headphone) {

            hero.addEventListener("mousemove", event => {

                const x =
                    event.clientX / window.innerWidth - 0.5;

                const y =
                    event.clientY / window.innerHeight - 0.5;

                const moveX = x * 18;
                const moveY = y * 18;

                headphone.style.marginLeft =
                    `${moveX}px`;

                headphone.style.marginTop =
                    `${moveY}px`;

            });

            hero.addEventListener("mouseleave", () => {

                headphone.style.marginLeft = "0";
                headphone.style.marginTop = "0";

            });
        }
    }


    /* =========================
       SMOOTH PAGE TRANSITIONS
    ========================= */

    const internalLinks =
        document.querySelectorAll("a");

    internalLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:") ||
            href.startsWith("tel:")
        ) {
            return;
        }

        link.addEventListener("click", event => {

            event.preventDefault();

            document.body.classList.add(
                "page-loading"
            );

            setTimeout(() => {
                window.location.href = href;
            }, 180);

        });
    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document
        .querySelectorAll(".header nav a")
        .forEach(link => {

            const href =
                link.getAttribute("href");

            if (href === currentPage) {
                link.classList.add("active");
            }

        });


    /* =========================
       MAGNETIC BUTTONS
    ========================= */

    if (window.matchMedia("(pointer:fine)").matches) {

        document
            .querySelectorAll(".btn")
            .forEach(button => {

                button.addEventListener(
                    "mousemove",
                    event => {

                        const rect =
                            button.getBoundingClientRect();

                        const x =
                            event.clientX -
                            rect.left -
                            rect.width / 2;

                        const y =
                            event.clientY -
                            rect.top -
                            rect.height / 2;

                        button.style.transform =
                            `translate(${x * 0.12}px, ${y * 0.12}px)`;
                    }
                );

                button.addEventListener(
                    "mouseleave",
                    () => {

                        button.style.transform =
                            "translate(0,0)";
                    }
                );

            });
    }


    /* =========================
       IMAGE / VISUAL TILT
    ========================= */

    const visual =
        document.querySelector(".hero-headphones");

    if (
        visual &&
        window.matchMedia("(pointer:fine)").matches
    ) {

        document.addEventListener(
            "mousemove",
            event => {

                const x =
                    (event.clientX / window.innerWidth - 0.5) * 2;

                const y =
                    (event.clientY / window.innerHeight - 0.5) * 2;

                const rings =
                    visual.querySelectorAll(".orbit");

                rings.forEach((ring, index) => {

                    const amount =
                        index === 0 ? 8 : -6;

                    ring.style.marginLeft =
                        `${x * amount}px`;

                    ring.style.marginTop =
                        `${y * amount}px`;

                });

            }
        );
    }


    /* =========================
       CONTACT FORM
    ========================= */

    const contactForm =
        document.querySelector("#orderForm");

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const message =
                    document.querySelector("#formMessage");

                if (message) {

                    message.textContent =
                        "✓ Заявка отправлена. Скоро свяжемся с вами.";

                    message.style.opacity = "1";
                }

                contactForm.reset();

            }
        );
    }

});


/* =========================
   GLOBAL ORDER FUNCTION
========================= */

function submitOrder(event) {

    event.preventDefault();

    const form = event.target;

    const message =
        document.getElementById("formMessage");

    if (message) {

        message.textContent =
            "✓ Заявка отправлена. Скоро свяжемся с вами.";

        message.style.opacity = "1";
    }

    form.reset();

    return false;
}