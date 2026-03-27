document.addEventListener("DOMContentLoaded", function() {
    // 1. Płynne przewijanie do sekcji na stronie
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Obsługa wysłania formularza AJAX-em do Formspree
    const form = document.getElementById('leadForm');
    const successMsg = document.getElementById('formSuccess');
    const errorMsg = document.getElementById('formError');

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Ukrywa poprzednie wiadomości
            successMsg.style.display = 'none';
            errorMsg.style.display = 'none';

            // Zabezpieczenie przed klikaniem wiele razy w czasie wysyłania 
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Wysyłanie...';
            submitBtn.disabled = true;

            const formData = new FormData(form);
            
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;

                if (response.ok) {
                    successMsg.style.display = 'block';
                    form.reset();
                    
                    // Schowaj komunikat o sukcesie po pewnym czasie
                    setTimeout(() => {
                        successMsg.style.display = 'none';
                    }, 6000);
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            errorMsg.innerText = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            errorMsg.innerText = "Oops! Mamy problem z serwerem wysyłającym!";
                        }
                        errorMsg.style.display = 'block';
                    });
                }
            }).catch(error => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                errorMsg.innerText = "Oops! Problem z połączeniem.";
                errorMsg.style.display = 'block';
            });
        });
    }
});
