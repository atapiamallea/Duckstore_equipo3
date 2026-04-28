document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Detiene la recarga de la página

        const datos = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            asunto: document.getElementById('asunto').value,
            mensaje: document.getElementById('mensaje').value
        };

        console.log("Datos capturados:", datos);

        // Esto confirma que funciona
        alert('¡Gracias por tu mensaje, ' + datos.nombre + '! Nos pondremos en contacto pronto.');

        contactForm.reset(); // Limpia el formulario
    });
});