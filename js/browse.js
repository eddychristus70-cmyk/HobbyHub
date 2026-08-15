/* ============================================
   HobbyHub — Browse Page Script
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const categoryPills = document.getElementById('categoryPills');
  const listingsGrid = document.getElementById('listingsGrid');
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');

  if (!listingsGrid) return;

  let activeCategory = 'all';

  /* ---------- Pick up ?search= and ?category= from the URL ---------- */
  const urlParams = new URLSearchParams(window.location.search);
  const searchFromUrl = urlParams.get('search');
  const categoryFromUrl = urlParams.get('category');

  if (searchFromUrl) {
    searchInput.value = searchFromUrl;
  }

  if (categoryFromUrl && CATEGORY_LABELS[categoryFromUrl]) {
    activeCategory = categoryFromUrl;
    categoryPills.querySelectorAll('.pill').forEach((pill) => {
      pill.classList.toggle('active', pill.dataset.category === categoryFromUrl);
    });
  }

  /* ---------- Category pill clicks ---------- */
  categoryPills.addEventListener('click', (e) => {
    const pill = e.target.closest('.pill');
    if (!pill) return;

    activeCategory = pill.dataset.category;
    categoryPills.querySelectorAll('.pill').forEach((p) => p.classList.remove('active'));
    pill.classList.add('active');
    render();
  });

  /* ---------- Search + sort ---------- */
  searchInput.addEventListener('input', render);
  sortSelect.addEventListener('change', render);

  /* ---------- Filtering / sorting / rendering ---------- */
  function getFilteredListings() {
    const query = searchInput.value.trim().toLowerCase();
    let listings = getListings();

    if (activeCategory !== 'all') {
      listings = listings.filter((l) => l.category === activeCategory);
    }

    if (query) {
      listings = listings.filter((l) =>
        l.title.toLowerCase().includes(query) ||
        l.description.toLowerCase().includes(query)
      );
    }

    const sortValue = sortSelect.value;
    listings = listings.slice().sort((a, b) => {
      switch (sortValue) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'az':
          return a.title.localeCompare(b.title);
        case 'za':
          return b.title.localeCompare(a.title);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    return listings;
  }

  function render() {
    const listings = getFilteredListings();

    if (listings.length === 0) {
      listingsGrid.innerHTML = '';
      emptyState.style.display = 'block';
    } else {
      emptyState.style.display = 'none';
      listingsGrid.innerHTML = listings.map(renderListingCard).join('');
    }

    resultsCount.textContent = `${listings.length} listing${listings.length !== 1 ? 's' : ''} found`;
  }

  render();
});
