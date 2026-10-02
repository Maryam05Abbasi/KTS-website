console.log("KTS Website setup connected successfully!");

// Smooth scroll to quote section and pre-select service
function selectServiceForQuote(serviceName) {
    const formSection = document.getElementById('quote-form-section');
    const serviceSelect = document.getElementById('serviceType');
    
    if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
    }
    
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        // Fallback to modal if on a page without on-page form
        openModal(serviceName);
    }
}

// Open / Close Modal Logic
function openModal(serviceName = '') {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'flex';
        if (serviceName) {
            const selectElement = document.getElementById('modalServiceSelect');
            if (selectElement) selectElement.value = serviceName;
        }
    }
}

function closeModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Secondary WhatsApp Escalation (Emergency Only)
function emergencyWhatsApp(serviceName = '') {
    const phoneNumber = "971581382229";
    let message = "EMERGENCY INQUIRY: Hello Karakoram Technical Services, I require urgent technical support.";
    if (serviceName) {
        message = `EMERGENCY INQUIRY: I need urgent assistance for: ${serviceName}`;
    }
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
}

// Structured Form Handling with Web3Forms Integration
async function handleQuoteSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // UI Loading State
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

    // Generate reference ticket
    const referenceId = 'KTS-' + Math.floor(100000 + Math.random() * 900000);

    // Form Payload
    const formData = new FormData(form);
    formData.append("access_key", "62129e7c-7b1b-4de8-9a17-8a342ed02476");
    formData.append("subject", `New Service Request - Ticket ${referenceId}`);
    formData.append("reference_id", referenceId);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            // Show Confirmation Modal
            const successModal = document.getElementById('confirmationModal');
            if (successModal) {
                document.getElementById('refTicketNumber').innerText = referenceId;
                successModal.style.display = 'flex';
            }
            form.reset();
        } else {
            alert("Submission failed. Please try again or contact support.");
        }
    } catch (error) {
        console.error("Form Submission Error:", error);
        alert("An error occurred while submitting. Please check your network connection.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Request';
        closeModal();
    }
}

function closeConfirmationModal() {
    const modal = document.getElementById('confirmationModal');
    if (modal) modal.style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    const confModal = document.getElementById('confirmationModal');
    if (event.target === modal) closeModal();
    if (event.target === confModal) closeConfirmationModal();
};