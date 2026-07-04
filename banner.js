document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');
    const dots = document.querySelectorAll('.dot');

    let index = 0;

    if (!track || !nextBtn) return;

    function updateSlider() {
        // Movimiento suave
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualizar puntos
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateSlider();
    });

    // Soporte para los puntos
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            index = i;
            updateSlider();
        });
    });

    console.log("Slider funcionando con", slides.length, "banners.");
});

const btnMenu = document.getElementById('btnMenu');
    const navLinks = document.getElementById('navLinks');

    btnMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      btnMenu.classList.toggle('active');
    });

    // Cierra el menú al tocar un link (útil en mobile)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        btnMenu.classList.remove('active');
      });
    });