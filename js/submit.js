/* ============================================
   HobbyHub — Submit Listing Page Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('listingForm');
  const formMsg = document.getElementById('formMsg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const conditionInput = form.querySelector('input[name="condition"]:checked');

    const newListing = {
      id: 'listing-' + Date.now(),
      title: form.title.value.trim(),
      category: form.category.value,
      description: form.description.value.trim(),
      imageUrl: form.imageUrl.value.trim(),
      email: form.email.value.trim(),
      dateAvailable: form.dateAvailable.value,
      condition: conditionInput ? conditionInput.value : 'used',
      createdAt: new Date().toISOString()
    };

    addListing(newListing);

    formMsg.textContent = 'Listing posted! Check the Browse page to see it live.';
    formMsg.classList.add('success');

    form.reset();
  });

});
