document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.querySelector("[data-gallery]");
    const lightbox = document.querySelector("[data-gallery-lightbox]");

    if (!gallery || !lightbox) {
        return;
    }

    const images = Array.from(
        gallery.querySelectorAll("[data-gallery-open]")
    ).map(button => {
        const image = button.querySelector("img");

        return {
            src: image.src,
            alt: image.alt
        };
    });

    const mainImage = gallery.querySelector("[data-gallery-image]");
    const thumbnails = Array.from(
        gallery.querySelectorAll(".gallery-thumbnail")
    );

    const lightboxImage =
        lightbox.querySelector("[data-gallery-lightbox-image]");

    const counter =
        lightbox.querySelector("[data-gallery-counter]");

    let currentIndex = 0;


    function showImage(index) {

        currentIndex =
            (index + images.length) % images.length;

        const image = images[currentIndex];

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        counter.textContent =
            `${currentIndex + 1} / ${images.length}`;

        thumbnails.forEach((thumbnail, i) => {
            thumbnail.classList.toggle(
                "active",
                i === currentIndex
            );
        });
    }


    function openLightbox(index) {

        showImage(index);

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";
    }


    function closeLightbox() {

        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }


    gallery.addEventListener("click", event => {

        const button =
            event.target.closest("[data-gallery-open]");

        if (!button) {
            return;
        }

        const index =
            Number(button.dataset.galleryOpen);

        openLightbox(index);
    });


    lightbox
        .querySelector("[data-gallery-close]")
        .addEventListener("click", closeLightbox);


    lightbox
        .querySelector("[data-gallery-prev]")
        .addEventListener("click", () => {
            showImage(currentIndex - 1);
        });


    lightbox
        .querySelector("[data-gallery-next]")
        .addEventListener("click", () => {
            showImage(currentIndex + 1);
        });


    document.addEventListener("keydown", event => {

        if (!lightbox.classList.contains("open")) {
            return;
        }

        switch (event.key) {

            case "Escape":
                closeLightbox();
                break;

            case "ArrowLeft":
                showImage(currentIndex - 1);
                break;

            case "ArrowRight":
                showImage(currentIndex + 1);
                break;
        }
    });


    thumbnails.forEach((thumbnail, index) => {

        thumbnail.addEventListener("click", () => {
            showImage(index);
        });

    });


    showImage(0);
});
