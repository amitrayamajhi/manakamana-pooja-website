/* ================================================================
   EDIT THESE — your real shop contact details
   ================================================================ */
const SHOP_PHONE_INTL = "9779823090658"; // placeholder: country code + number, no + or spaces
const SHOP_EMAIL = "amitrayamajhi764@gmail.com";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("phoneDisplay").textContent = "+" + SHOP_PHONE_INTL.replace(/^977/, "977-");
  document.getElementById("emailDisplay").textContent = SHOP_EMAIL;

  setupLanguageToggle();
  setupMobileNav();
  setupWhatsappLinks();
  renderProducts();
  setupMapEmbed();
});

/* ---------- Map embed fallback ---------- */
function setupMapEmbed() {
  const iframe = document.querySelector(".map-embed");
  if (iframe && !iframe.getAttribute("src")) {
    const placeholder = document.createElement("div");
    placeholder.className = "map-placeholder";
    placeholder.dataset.en = "Map placeholder — embed your Google Maps link here";
    placeholder.dataset.ne = "नक्सा प्लेसहोल्डर — यहाँ आफ्नो गुगल म्याप लिंक राख्नुहोस्";
    placeholder.textContent = placeholder.dataset.ne;
    iframe.replaceWith(placeholder);
  }
}

/* ---------- Language toggle ---------- */
function applyLanguage(lang) {
  document.body.classList.remove("lang-ne", "lang-en");
  document.body.classList.add("lang-" + lang);
  document.querySelectorAll("[data-en][data-ne]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
}

function setupLanguageToggle() {
  const btn = document.getElementById("langToggle");
  applyLanguage("ne");
  btn.addEventListener("click", () => {
    const next = document.body.classList.contains("lang-ne") ? "en" : "ne";
    applyLanguage(next);
  });
}

/* ---------- Mobile nav ---------- */
function setupMobileNav() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("mainNav");
  hamburger.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
}

/* ---------- WhatsApp links ---------- */
function whatsappLink(message) {
  return `https://wa.me/${SHOP_PHONE_INTL}?text=${encodeURIComponent(message)}`;
}

function setupWhatsappLinks() {
  const genericMsg = "Namaste! I would like to order some pooja items from Manakamana Pooja Samgri Bhandar.";
  document.getElementById("headerWhatsapp").href = whatsappLink(genericMsg);
  document.getElementById("contactWhatsapp").href = whatsappLink(genericMsg);
  document.getElementById("floatingWhatsapp").href = whatsappLink(genericMsg);
}

/* ---------- Products / categories ---------- */
function renderProducts() {
  const tabsEl = document.getElementById("categoryTabs");
  const gridEl = document.getElementById("productGrid");

  PRODUCT_CATEGORIES.forEach((cat, idx) => {
    const tab = document.createElement("button");
    tab.className = "category-tab" + (idx === 0 ? " active" : "");
    tab.dataset.en = cat.en;
    tab.dataset.ne = cat.ne;
    tab.textContent = document.body.classList.contains("lang-ne") ? cat.ne : cat.en;
    tab.dataset.catId = cat.id;
    tab.addEventListener("click", () => {
      tabsEl.querySelectorAll(".category-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderGrid(cat.id);
    });
    tabsEl.appendChild(tab);
  });

  // keep tab labels in sync with language toggle
  const observer = new MutationObserver(() => {
    tabsEl.querySelectorAll(".category-tab").forEach(tab => {
      tab.textContent = document.body.classList.contains("lang-ne") ? tab.dataset.ne : tab.dataset.en;
    });
  });
  observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

  renderGrid(PRODUCT_CATEGORIES[0].id);

  function renderGrid(catId) {
    const cat = PRODUCT_CATEGORIES.find(c => c.id === catId);
    gridEl.innerHTML = "";
    cat.items.forEach(item => {
      const card = document.createElement("div");
      card.className = "product-card";
      const isNe = document.body.classList.contains("lang-ne");
      const priceText = item.price || (isNe ? "मूल्यको लागि सम्पर्क गर्नुहोस्" : "Contact for price");
      const visual = item.img
        ? `<img class="product-photo" src="${item.img}" alt="${item.en}" loading="lazy">`
        : `<div class="product-icon">${cat.icon}</div>`;
      card.innerHTML = `
        ${visual}
        <div class="product-name">${isNe ? item.ne : item.en}</div>
        <div class="product-price">${priceText}</div>
        <button class="product-order-btn">${isNe ? "अर्डर गर्नुहोस्" : "Order"}</button>
      `;
      card.querySelector(".product-order-btn").addEventListener("click", () => {
        const name = document.body.classList.contains("lang-ne") ? item.ne : item.en;
        const msg = item.price
          ? `Namaste! I would like to order: ${name} (${item.price})`
          : `Namaste! I would like to order: ${name}. Please share the price.`;
        window.open(whatsappLink(msg), "_blank", "noopener");
      });
      gridEl.appendChild(card);
    });
  }

  // re-render grid text when language changes
  const gridObserver = new MutationObserver(() => {
    const activeTab = tabsEl.querySelector(".category-tab.active");
    if (activeTab) renderGrid(activeTab.dataset.catId);
  });
  gridObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });
}
