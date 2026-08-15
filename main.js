/* ============================================
   HobbyHub — Shared Script (all pages)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  /* ---------- User dropdown ---------- */
  const userIconBtn = document.getElementById('userIconBtn');
  const userDropdown = document.getElementById('userDropdown');

  if (userIconBtn && userDropdown) {
    userIconBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = userDropdown.classList.toggle('open');
      userIconBtn.classList.toggle('active', isOpen);
      userIconBtn.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', () => {
      userDropdown.classList.remove('open');
      userIconBtn.classList.remove('active');
      userIconBtn.setAttribute('aria-expanded', 'false');
    });

    // Prevent dropdown clicks from closing immediately via the document listener
    userDropdown.addEventListener('click', (e) => e.stopPropagation());
  }

  /* ---------- Header search — redirects to Browse with query ---------- */
  const navSearchForm = document.getElementById('navSearchForm');
  const navSearchInput = document.getElementById('navSearchInput');

  if (navSearchForm) {
    navSearchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = navSearchInput.value.trim();
      const url = query
        ? `browse.html?search=${encodeURIComponent(query)}`
        : 'browse.html';
      window.location.href = url;
    });
  }

  /* ---------- Hero slider (index.html only) ---------- */
  const heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    const slides = heroSlider.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    let current = 0;
    let sliderInterval;

    function goToSlide(index) {
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = index;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }

    function nextSlide() {
      const next = (current + 1) % slides.length;
      goToSlide(next);
    }

    function startAutoplay() {
      sliderInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
      clearInterval(sliderInterval);
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = parseInt(dot.dataset.slide, 10);
        stopAutoplay();
        goToSlide(index);
        startAutoplay();
      });
    });

    startAutoplay();
  }

  /* ---------- Featured listings (index.html only) ---------- */
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid && typeof getListings === 'function') {
    const listings = getListings()
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);

    featuredGrid.innerHTML = listings.map(renderListingCard).join('');
  }

});

/* ---------- Shared card renderer (used by main.js and browse.js) ---------- */
function renderListingCard(listing) {
  const categoryLabel = CATEGORY_LABELS[listing.category] || listing.category;
  const imgSrc = listing.imageUrl && listing.imageUrl.trim()
    ? listing.imageUrl
    : '';
  const dateLabel = listing.dateAvailable
    ? new Date(listing.dateAvailable).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    : '';

  return `
    <div class="listing-card">
      ${imgSrc
        ? `<img class="card-img" src="${escapeHtml(imgSrc)}" alt="${escapeHtml(listing.title)}">`
        : `<div class="card-img"></div>`}
      <div class="card-body">
        <span class="tag tag-${listing.category}">${categoryLabel}</span>
        <h3>${escapeHtml(listing.title)}</h3>
        <p>${escapeHtml(listing.description)}</p>
        <div class="card-meta">
          <span>${capitalize(listing.condition)}</span>
          ${dateLabel ? `<span>Available ${dateLabel}</span>` : ''}
        </div>
        <button class="card-contact-btn" onclick="window.location.href='mailto:${encodeURIComponent(listing.email)}?subject=${encodeURIComponent('HobbyHub: ' + listing.title)}'">
          Contact
        </button>
      </div>
    </div>
  `;
}

function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
