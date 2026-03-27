// Przechowywanie ścieżki (Skup czy Pośrednictwo), aby sprzedawca miał lepszy kontekst
function setQuizPath(intent) {
    const intentInput = document.getElementById('userIntent');
    if(intentInput) {
        intentInput.value = intent;
    }
}

let currentStep = 1;
const totalSteps = 3;

function nextStep(stepNum) {
    // Basic validations before moving
    if (stepNum === 2) {
        // Validate Step 1
        const radioChecked = document.querySelector('input[name="propertyType"]:checked');
        if (!radioChecked) {
            document.getElementById('errStep1').classList.remove('hidden');
            return;
        } else {
            document.getElementById('errStep1').classList.add('hidden');
        }
    } else if (stepNum === 3) {
        // Validate Step 2
        const locationVal = document.getElementById('locationData').value;
        if (locationVal.trim() === '') {
            document.getElementById('errStep2').classList.remove('hidden');
            return;
        } else {
            document.getElementById('errStep2').classList.add('hidden');
        }
    }

    // Hide all steps
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.add('hidden'));
    
    // Show current step
    document.getElementById('step' + stepNum).classList.remove('hidden');
    currentStep = stepNum;

    // Update Progress Bar
    const progressPercents = [33.3, 66.6, 100];
    document.getElementById('progressBar').style.width = progressPercents[stepNum - 1] + '%';
}

function prevStep(stepNum) {
    // Hide all
    document.querySelectorAll('.quiz-step').forEach(el => el.classList.add('hidden'));
    
    // Show step
    document.getElementById('step' + stepNum).classList.remove('hidden');
    currentStep = stepNum;

    // Update Progress Bar
    const progressPercents = [33.3, 66.6, 100];
    document.getElementById('progressBar').style.width = progressPercents[stepNum - 1] + '%';
}

document.addEventListener("DOMContentLoaded", function() {
    // Sticky CTA show/hide on scroll (optional for desktop)
    const stickyCta = document.querySelector('.sticky-cta');
    const heroSection = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        // On Desktop/Mobile, show sticky CTA only after scrolling past the Hero
        // But CSS forces it always flex on mobile, let's keep it visible on mobile, toggle on desktop
        if(window.innerWidth > 768) {
            if (window.scrollY > heroSection.offsetHeight) {
                stickyCta.style.display = 'flex';
            } else {
                stickyCta.style.display = 'none';
            }
        }
    });

    // Form Submissions
    const form = document.getElementById('leadQuizForm');
    const successBox = document.getElementById('quizSuccess');
    const errorBox = document.getElementById('quizError');
    const errorResponseText = document.getElementById('errorResponseText');

    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 
            
            // Validate step 3 Phone
            const phoneVal = document.getElementById('phoneData').value;
            if (phoneVal.trim() === '') {
                document.getElementById('errStep3').classList.remove('hidden');
                return;
            } else {
                document.getElementById('errStep3').classList.add('hidden');
            }

            const submitBtn = document.getElementById('finalSubmitBtn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Przesyłam...';
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
                    form.classList.add('hidden');
                    successBox.classList.remove('hidden');
                } else {
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            errorResponseText.innerText = data["errors"].map(error => error["message"]).join(", ");
                        } else {
                            errorResponseText.innerText = "Błąd na serwerze pocztowym. Spróbuj później.";
                        }
                        errorBox.classList.remove('hidden');
                    });
                }
            }).catch(error => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
                errorResponseText.innerText = "Brak połączenia internetowego.";
                errorBox.classList.remove('hidden');
            });
        });
    }
});
