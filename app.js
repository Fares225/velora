/**
 * VELORA | Haute Menswear E-Commerce Engine
 * Complete interactive store logic: Catalog, Filters, Cart Drawer, Wishlist,
 * Quick View, Size Guide, Currency Conversion, Multilingual support & Luxury Checkout.
 */

// Global State
const VELORA_STATE = {
  currentLang: 'ar',
  currentCurrency: 'EGP',
  currencyRates: {
    EGP: 1,
    SAR: 0.076,
    USD: 0.020
  },
  currencySymbols: {
    EGP: 'ج.م',
    SAR: 'ر.س',
    USD: '$'
  },
  cart: JSON.parse(localStorage.getItem('velora_cart')) || [],
  wishlist: JSON.parse(localStorage.getItem('velora_wishlist')) || [],
  appliedCoupon: null,
  activeFilter: 'all',
  activeSort: 'featured',
  activeSizeFilter: 'all',
  freeShippingGoal: 2000 // EGP
};

// Premium Products Catalog
const PRODUCTS_DATA = [
  {
    id: 'vel-01',
    titleAr: 'بدلة روما الملكية صوف إيطالي كحلي',
    titleEn: 'Roma Royal Bespoke Wool Suit - Midnight Navy',
    category: 'suits',
    categoryNameAr: 'البدلات والتوكسيدو',
    categoryNameEn: 'Suits & Tuxedos',
    price: 4850,
    oldPrice: 5900,
    rating: 4.9,
    reviewsCount: 38,
    image: 'images/hero_banner.jpg',
    secondaryImage: 'images/atelier_craft.jpg',
    badge: 'الأكثر مبيعاً',
    badgeType: 'hot',
    sizes: ['48', '50', '52', '54', '56'],
    colors: ['#16213e', '#1a1a1a', '#2c3e50'],
    descriptionAr: 'بدلة رجالية استثنائية منسوجة يدوياً من أفخر أنواع الصوف الإيطالي الخالص Super 150s. تمتاز بقصة إيطالية دقيقة تُبرز أناقة القوام، مع بطانة حريرية فخمة وأزرار قرنية طبيعية.',
    descriptionEn: 'Exquisite two-piece suit crafted from pure Italian Super 150s wool. Modern tailored silhouette with silk lining and genuine horn buttons.',
    stock: 4
  },
  {
    id: 'vel-02',
    titleAr: 'توكسيدو مخملي فاخر مع ياقة ساتان',
    titleEn: 'Velvet Midnight Black Tuxedo with Satin Lapel',
    category: 'suits',
    categoryNameAr: 'البدلات والتوكسيدو',
    categoryNameEn: 'Suits & Tuxedos',
    price: 5200,
    oldPrice: 6500,
    rating: 5.0,
    reviewsCount: 29,
    image: 'images/tuxedo.jpg',
    secondaryImage: 'images/hero_banner.jpg',
    badge: 'إصدار حصري',
    badgeType: 'exclusive',
    sizes: ['48', '50', '52', '54'],
    colors: ['#0d0d0d', '#111827'],
    descriptionAr: 'جاكيت عشاء رجالي من المخمل الأسود العميق الفاخر مع طية صدر كلاسيكية من الساتان اللامع. صُمم للمناسبات الراقية والسهرات ليعطيك حضوراً آسراً لا يُنسى.',
    descriptionEn: 'Opulent midnight black velvet tuxedo jacket accented with peak silk satin lapels. The epitome of black-tie sophistication.',
    stock: 3
  },
  {
    id: 'vel-03',
    titleAr: 'جاكيت بومبر جلد سويد إيطالي كستنائي',
    titleEn: 'Heritage Italian Suede Leather Bomber Jacket',
    category: 'casual',
    categoryNameAr: 'الكاجوال الفاخر',
    categoryNameEn: 'Luxury Casual',
    price: 3600,
    oldPrice: 4200,
    rating: 4.8,
    reviewsCount: 44,
    image: 'images/casual_suede.jpg',
    secondaryImage: 'images/hero_banner.jpg',
    badge: 'وصل حديثاً',
    badgeType: 'hot',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['#4a2e18', '#1c1c1c'],
    descriptionAr: 'جاكيت بومبر مصنوع يدوياً من أنعم أنواع جلد السويد الطبيعي. يتميز ببطانة داخلية دافئة وسحابات معدنية مطلية بمعدن البندقية لإطلالة كاجوال فاخرة وعصرية.',
    descriptionEn: 'Hand-tailored suede bomber jacket in rich chestnut tone. Combines timeless leisure with elevated artisan warmth.',
    stock: 6
  },
  {
    id: 'vel-04',
    titleAr: 'قميص ميلانو كتان نقي 100% عاجي',
    titleEn: 'Milano Pure Breathable Linen Shirt - Ivory',
    category: 'shirts',
    categoryNameAr: 'القمصان والكنزات',
    categoryNameEn: 'Shirts & Knits',
    price: 1350,
    oldPrice: 1650,
    rating: 4.7,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    badge: 'خصم 18%',
    badgeType: 'sale',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['#f8f6f0', '#d8e2dc', '#1a202c'],
    descriptionAr: 'قميص صيفي أنيق مصنوع من كتان فلورنسي مغسول فائق النعومة، يوفر تنفساً مثالياً وراحة فائقة طوال اليوم مع ياقة إيطالية أنيقة.',
    descriptionEn: 'Crisp, washed pure Italian linen shirt with spread collar and mother-of-pearl buttons for effortless warm-weather refinement.',
    stock: 12
  },
  {
    id: 'vel-05',
    titleAr: 'كنزة كشمير ملكية بياقة دائرية مرتفعة',
    titleEn: 'Royal Cashmere Roll-Neck Knit Sweater',
    category: 'shirts',
    categoryNameAr: 'القمصان والكنزات',
    categoryNameEn: 'Shirts & Knits',
    price: 2450,
    oldPrice: 3100,
    rating: 4.9,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'images/hero_banner.jpg',
    badge: 'مفضل العملاء',
    badgeType: 'hot',
    sizes: ['M', 'L', 'XL'],
    colors: ['#2b2d42', '#8d99ae', '#edf2f4'],
    descriptionAr: 'كنزة فاخرة محاكة من خيوط الكشمير الخالص من سفوح منغوليا. دفء فائق وخفة استثنائية تناسب ارتداءها بمفردها أو تحت المعاطف والسترات.',
    descriptionEn: 'Pure Grade-A Mongolian cashmere turtleneck, impeccably soft with supreme lightweight thermal warmth.',
    stock: 5
  },
  {
    id: 'vel-06',
    titleAr: 'حذاء أوكسفورد جلدي إيطالي محاك يدوياً',
    titleEn: 'Firenze Handcrafted Full-Grain Oxford Brogues',
    category: 'accessories',
    categoryNameAr: 'الأحذية والإكسسوارات',
    categoryNameEn: 'Footwear & Accessories',
    price: 3200,
    oldPrice: 3900,
    rating: 5.0,
    reviewsCount: 22,
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    badge: 'صناعة يدوية',
    badgeType: 'exclusive',
    sizes: ['41', '42', '43', '44', '45'],
    colors: ['#3e2723', '#212121'],
    descriptionAr: 'حذاء كلاسيكي فخم مصنوع بتقنية Goodyear Welted الشهيرة من جلد البقر الإيطالي الكامل المحبب، بتشطيب يدوي بلون الكستناء مع نعل جلدي مريح مقاوم للزمن.',
    descriptionEn: 'Goodyear-welted full-grain calfskin leather Oxford shoes with burnished antique patina and leather sole.',
    stock: 7
  },
  {
    id: 'vel-07',
    titleAr: 'ساعة كرونوغراف أوتوماتيك بحزام تمساح',
    titleEn: 'Heritage Automatic Chronograph Sapphire Watch',
    category: 'accessories',
    categoryNameAr: 'الأحذية والإكسسوارات',
    categoryNameEn: 'Footwear & Accessories',
    price: 5800,
    oldPrice: 7200,
    rating: 4.9,
    reviewsCount: 17,
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    badge: 'VIP إصدار',
    badgeType: 'exclusive',
    sizes: ['One Size'],
    colors: ['#c5a880', '#silver'],
    descriptionAr: 'تحفة ميكانيكية دقيقة بزجاج ياقوتي مضاد للخدش وميناء أسود كربوني، مع حزام جلدي فاخر ونقشة التمساح وقفل فراشة من الفولاذ المقاوم للصدأ.',
    descriptionEn: 'Automatic mechanical chronograph with anti-reflective sapphire glass, exhibition case back, and alligator-embossed leather strap.',
    stock: 2
  },
  {
    id: 'vel-08',
    titleAr: 'حقيبة سفر دافل جلد طبيعي معتق',
    titleEn: 'Artisan Weekender Leather Duffle Holdall',
    category: 'accessories',
    categoryNameAr: 'الأحذية والإكسسوارات',
    categoryNameEn: 'Footwear & Accessories',
    price: 3400,
    oldPrice: 4100,
    rating: 4.8,
    reviewsCount: 26,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'images/atelier_craft.jpg',
    badge: 'الأكثر طلباً',
    badgeType: 'hot',
    sizes: ['One Size'],
    colors: ['#5d4037', '#212121'],
    descriptionAr: 'حقيبة عطلات السفر الفاخرة المصنوعة من جلد البقر السميك المدبوغ بالنباتات. تتميز بجيوب داخلية مبطنة للابتوب ومستلزمات السفر مع حزام كتف مريح قابل للتعديل.',
    descriptionEn: 'Robust vegetable-tanned leather weekender bag featuring brass hardware, dedicated laptop compartment, and heavy-duty lining.',
    stock: 5
  }
];

// Available Promo Codes
const PROMO_CODES = {
  'VELORA10': { discountPercent: 10, label: 'خصم 10% بمناسبة الافتتاح' },
  'VIP20': { discountPercent: 20, label: 'خصم أعضاء نادي فيلورا 20%' }
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  updateWishlistCount();
  setupEventListeners();
  updateShippingProgress();
});

// ==========================================================================
// PRICE & CURRENCY FORMATTER
// ==========================================================================
function formatPrice(amountInEgp) {
  const rate = VELORA_STATE.currencyRates[VELORA_STATE.currentCurrency] || 1;
  const symbol = VELORA_STATE.currencySymbols[VELORA_STATE.currentCurrency] || 'ج.م';
  const converted = Math.round(amountInEgp * rate);
  
  if (VELORA_STATE.currentCurrency === 'USD') {
    return `${symbol}${converted.toLocaleString()}`;
  }
  return `${converted.toLocaleString()} ${symbol}`;
}

// ==========================================================================
// RENDER PRODUCTS GRID
// ==========================================================================
function renderProducts() {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  // Filter products
  let filtered = [...PRODUCTS_DATA];

  if (VELORA_STATE.activeFilter !== 'all') {
    filtered = filtered.filter(p => p.category === VELORA_STATE.activeFilter);
  }

  if (VELORA_STATE.activeSizeFilter !== 'all') {
    filtered = filtered.filter(p => p.sizes.includes(VELORA_STATE.activeSizeFilter));
  }

  // Sort products
  if (VELORA_STATE.activeSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (VELORA_STATE.activeSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (VELORA_STATE.activeSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 1rem; color: var(--border-gold);"></i>
        <h3>لا توجد قطع مطابقة لهذا الاختيار حالياً</h3>
        <p>جرب تصفية مختلفة أو استكشف التشكيلة الكاملة</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const isWishlisted = VELORA_STATE.wishlist.some(item => item.id === p.id);
    const title = VELORA_STATE.currentLang === 'ar' ? p.titleAr : p.titleEn;
    const categoryName = VELORA_STATE.currentLang === 'ar' ? p.categoryNameAr : p.categoryNameEn;

    return `
      <article class="product-card" data-id="${p.id}">
        <div class="product-media-container">
          <img src="${p.image}" alt="${title}" loading="lazy" />
          
          <div class="product-badge badge-${p.badgeType}">${p.badge}</div>

          <div class="product-actions-floating">
            <button class="action-float-btn ${isWishlisted ? 'active-wishlist' : ''}" 
                    onclick="toggleWishlist('${p.id}')" 
                    title="إضافة إلى المفضلة" 
                    aria-label="Wishlist">
              <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
            </button>
            <button class="action-float-btn" 
                    onclick="openQuickView('${p.id}')" 
                    title="نظرة سريعة" 
                    aria-label="Quick View">
              <i class="fa-solid fa-expand"></i>
            </button>
          </div>

          <div class="quick-add-overlay">
            <button class="btn-card-add" onclick="quickAddToCart('${p.id}')">
              <i class="fa-solid fa-bag-shopping"></i>
              <span>أضف للسلة</span>
            </button>
            <button class="btn-card-quickview" onclick="openQuickView('${p.id}')">
              <i class="fa-regular fa-eye"></i>
            </button>
          </div>
        </div>

        <div class="product-info">
          <span class="product-category-meta">${categoryName}</span>
          <h3 class="product-title" onclick="openQuickView('${p.id}')" style="cursor: pointer;">${title}</h3>

          <div class="product-rating">
            <span>★</span>
            <strong>${p.rating}</strong>
            <span class="rating-count">(${p.reviewsCount} تقييم)</span>
          </div>

          <div class="product-price-row">
            <span class="price-current">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================================================
// CART & DRAWER MANAGEMENT
// ==========================================================================
function quickAddToCart(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const defaultSize = product.sizes[0] || 'M';
  const defaultColor = product.colors[0] || '#000';

  addToCart(product.id, defaultSize, defaultColor, 1);
}

function addToCart(productId, size, color, quantity = 1) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = VELORA_STATE.cart.findIndex(
    item => item.id === productId && item.size === size && item.color === color
  );

  if (existingIndex > -1) {
    VELORA_STATE.cart[existingIndex].quantity += quantity;
  } else {
    VELORA_STATE.cart.push({
      id: product.id,
      titleAr: product.titleAr,
      titleEn: product.titleEn,
      price: product.price,
      image: product.image,
      size: size,
      color: color,
      quantity: quantity
    });
  }

  saveCart();
  updateCartUI();
  openCartDrawer();
  showToast(`تمت إضافة "${product.titleAr}" إلى حقيبة التسوق بنجاح ✨`);
}

function updateCartQuantity(index, delta) {
  if (!VELORA_STATE.cart[index]) return;

  VELORA_STATE.cart[index].quantity += delta;
  if (VELORA_STATE.cart[index].quantity <= 0) {
    VELORA_STATE.cart.splice(index, 1);
    showToast('تمت إزالة القطعة من السلة');
  }

  saveCart();
  updateCartUI();
}

function removeFromCart(index) {
  if (!VELORA_STATE.cart[index]) return;
  VELORA_STATE.cart.splice(index, 1);
  saveCart();
  updateCartUI();
  showToast('تم حذف القطعة من حقيبة التسوق');
}

function saveCart() {
  localStorage.setItem('velora_cart', JSON.stringify(VELORA_STATE.cart));
}

function calculateCartTotals() {
  const subtotal = VELORA_STATE.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  let discount = 0;

  if (VELORA_STATE.appliedCoupon && PROMO_CODES[VELORA_STATE.appliedCoupon]) {
    const percent = PROMO_CODES[VELORA_STATE.appliedCoupon].discountPercent;
    discount = Math.round((subtotal * percent) / 100);
  }

  const shipping = subtotal >= VELORA_STATE.freeShippingGoal || subtotal === 0 ? 0 : 120;
  const total = Math.max(0, subtotal - discount + shipping);

  return { subtotal, discount, shipping, total };
}

function updateCartUI() {
  const cartBody = document.getElementById('cart-items-body');
  const cartCountBadges = document.querySelectorAll('.cart-count');
  const cartTotalPreview = document.getElementById('cart-total-preview');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountRow = document.getElementById('cart-discount-row');
  const discountEl = document.getElementById('cart-discount-val');
  const shippingEl = document.getElementById('cart-shipping-val');
  const grandTotalEl = document.getElementById('cart-grand-total');

  const totalItems = VELORA_STATE.cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountBadges.forEach(badge => badge.textContent = totalItems);

  const { subtotal, discount, shipping, total } = calculateCartTotals();

  if (cartTotalPreview) {
    cartTotalPreview.textContent = formatPrice(total);
  }

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = shipping === 0 ? 'مجاني' : formatPrice(shipping);
  if (grandTotalEl) grandTotalEl.textContent = formatPrice(total);

  if (discountRow && discountEl) {
    if (discount > 0) {
      discountRow.style.display = 'flex';
      discountEl.textContent = `-${formatPrice(discount)}`;
    } else {
      discountRow.style.display = 'none';
    }
  }

  updateShippingProgress();

  if (!cartBody) return;

  if (VELORA_STATE.cart.length === 0) {
    cartBody.innerHTML = `
      <div class="empty-drawer-msg">
        <i class="fa-solid fa-bag-shopping"></i>
        <h4>حقيبة التسوق فارغة</h4>
        <p>استكشف أحدث تشكيلة رجالية فاخرة وأضف لمستك الخاصة</p>
      </div>
    `;
    return;
  }

  cartBody.innerHTML = VELORA_STATE.cart.map((item, index) => {
    const title = VELORA_STATE.currentLang === 'ar' ? item.titleAr : item.titleEn;
    return `
      <div class="cart-item">
        <button class="cart-item-remove" onclick="removeFromCart(${index})" title="حذف" aria-label="Remove">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <img src="${item.image}" alt="${title}" class="cart-item-img" />
        <div class="cart-item-details">
          <div>
            <h4 class="cart-item-title">${title}</h4>
            <div class="cart-item-variant">المقاس: ${item.size}</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
            <div class="cart-item-stepper">
              <button class="stepper-btn" onclick="updateCartQuantity(${index}, -1)">-</button>
              <span class="stepper-value">${item.quantity}</span>
              <button class="stepper-btn" onclick="updateCartQuantity(${index}, 1)">+</button>
            </div>
            <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function updateShippingProgress() {
  const { subtotal } = calculateCartTotals();
  const fill = document.getElementById('shipping-progress-fill');
  const text = document.getElementById('shipping-goal-text');
  if (!fill || !text) return;

  const goal = VELORA_STATE.freeShippingGoal;
  const remaining = Math.max(0, goal - subtotal);
  const percentage = Math.min(100, (subtotal / goal) * 100);

  fill.style.width = `${percentage}%`;

  if (remaining === 0 && subtotal > 0) {
    text.innerHTML = '🎉 مبروك! لقد حصلت على <strong>شحن مجاني</strong> لكافة طلباتك!';
  } else {
    text.innerHTML = `أضف <strong>${formatPrice(remaining)}</strong> إضافية للحصول على <strong>شحن مجاني</strong>!`;
  }
}

// Drawer Toggles
function openCartDrawer() {
  document.getElementById('cart-drawer').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cart-drawer').classList.remove('active');
  document.body.style.overflow = '';
}

// ==========================================================================
// WISHLIST MANAGEMENT
// ==========================================================================
function toggleWishlist(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const index = VELORA_STATE.wishlist.findIndex(item => item.id === productId);

  if (index > -1) {
    VELORA_STATE.wishlist.splice(index, 1);
    showToast(`تمت إزالة "${product.titleAr}" من قائمة رغباتك`);
  } else {
    VELORA_STATE.wishlist.push(product);
    showToast(`تم حفظ "${product.titleAr}" في قائمة رغباتك الفاخرة ❤️`);
  }

  localStorage.setItem('velora_wishlist', JSON.stringify(VELORA_STATE.wishlist));
  updateWishlistCount();
  renderProducts();
  renderWishlistDrawer();
}

function updateWishlistCount() {
  const badges = document.querySelectorAll('.wishlist-count');
  badges.forEach(b => b.textContent = VELORA_STATE.wishlist.length);
}

function openWishlistDrawer() {
  renderWishlistDrawer();
  document.getElementById('wishlist-drawer').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeWishlistDrawer() {
  document.getElementById('wishlist-drawer').classList.remove('active');
  document.body.style.overflow = '';
}

function renderWishlistDrawer() {
  const body = document.getElementById('wishlist-items-body');
  if (!body) return;

  if (VELORA_STATE.wishlist.length === 0) {
    body.innerHTML = `
      <div class="empty-drawer-msg">
        <i class="fa-regular fa-heart"></i>
        <h4>قائمة الرغبات فارغة</h4>
        <p>احفظ إطلالاتك وقطعك المفضلة للعودة إليها في أي وقت</p>
      </div>
    `;
    return;
  }

  body.innerHTML = VELORA_STATE.wishlist.map(item => `
    <div class="cart-item">
      <button class="cart-item-remove" onclick="toggleWishlist('${item.id}')" title="إزالة">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <img src="${item.image}" alt="${item.titleAr}" class="cart-item-img" />
      <div class="cart-item-details">
        <div>
          <h4 class="cart-item-title">${item.titleAr}</h4>
          <span class="product-category-meta">${item.categoryNameAr}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
          <div class="cart-item-price">${formatPrice(item.price)}</div>
          <button class="btn-primary" style="padding: 0.4rem 0.8rem; font-size: 0.78rem;" onclick="quickAddToCart('${item.id}'); toggleWishlist('${item.id}');">
            نقل للسلة
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// QUICK VIEW MODAL
// ==========================================================================
let currentQuickViewProduct = null;
let selectedQuickViewSize = null;
let selectedQuickViewQty = 1;

function openQuickView(productId) {
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  currentQuickViewProduct = product;
  selectedQuickViewSize = product.sizes[0];
  selectedQuickViewQty = 1;

  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-dynamic-content');

  const title = VELORA_STATE.currentLang === 'ar' ? product.titleAr : product.titleEn;
  const desc = VELORA_STATE.currentLang === 'ar' ? product.descriptionAr : product.descriptionEn;

  content.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-media">
        <img src="${product.image}" id="qv-main-img" alt="${title}" />
      </div>
      <div class="quickview-details">
        <span class="product-category-meta" style="color: var(--gold-primary); font-weight: 700;">
          ${product.categoryNameAr} • ${product.badge}
        </span>
        <h2 style="font-size: 1.6rem; font-weight: 800; color: #fff; margin: 0.4rem 0 0.8rem;">
          ${title}
        </h2>
        
        <div class="product-rating" style="margin-bottom: 1rem;">
          <span>★</span>
          <strong>${product.rating}</strong>
          <span class="rating-count">(${product.reviewsCount} تقييم موثق من عملاء النخبة)</span>
        </div>

        <div class="product-price-row" style="margin-bottom: 1.5rem;">
          <span class="price-current" style="font-size: 1.6rem;">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old" style="font-size: 1.1rem;">${formatPrice(product.oldPrice)}</span>` : ''}
        </div>

        <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
          ${desc}
        </p>

        <div style="margin-bottom: 1.5rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <span class="variant-picker-label">اختر المقاس:</span>
            <button onclick="openSizeGuide()" style="font-size: 0.8rem; color: var(--gold-light); text-decoration: underline;">
              📏 دليل المقاسات
            </button>
          </div>
          <div class="size-pill-group">
            ${product.sizes.map(sz => `
              <button class="size-btn ${sz === selectedQuickViewSize ? 'selected' : ''}" onclick="selectQuickViewSize('${sz}', this)">
                ${sz}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 1rem; margin-top: auto;">
          <div class="cart-item-stepper" style="height: 48px; border-radius: var(--radius-sm);">
            <button class="stepper-btn" style="width: 38px; height: 100%; font-size: 1rem;" onclick="changeQvQty(-1)">-</button>
            <span class="stepper-value" id="qv-qty-val" style="width: 38px; font-size: 1rem;">1</span>
            <button class="stepper-btn" style="width: 38px; height: 100%; font-size: 1rem;" onclick="changeQvQty(1)">+</button>
          </div>
          
          <button class="btn-primary" style="flex: 1; height: 48px;" onclick="addQuickViewToCart()">
            <i class="fa-solid fa-bag-shopping"></i>
            <span>أضف إلى حقيبة التسوق</span>
          </button>
        </div>

        <div style="margin-top: 1.2rem; font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
          <i class="fa-solid fa-circle-check" style="color: var(--success);"></i>
          <span>متبقي ${product.stock} قطع فقط في مخزون المشغل الإيطالي</span>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function selectQuickViewSize(size, el) {
  selectedQuickViewSize = size;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
}

function changeQvQty(delta) {
  selectedQuickViewQty = Math.max(1, selectedQuickViewQty + delta);
  const el = document.getElementById('qv-qty-val');
  if (el) el.textContent = selectedQuickViewQty;
}

function addQuickViewToCart() {
  if (!currentQuickViewProduct) return;
  addToCart(currentQuickViewProduct.id, selectedQuickViewSize, currentQuickViewProduct.colors[0], selectedQuickViewQty);
  closeModal('quickview-modal');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Size Guide Modal
function openSizeGuide() {
  document.getElementById('sizeguide-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ==========================================================================
// CHECKOUT EXPERIENCE & ORDER SIMULATION
// ==========================================================================
function openCheckoutModal() {
  if (VELORA_STATE.cart.length === 0) {
    showToast('حقيبة التسوق فارغة! أضف بعض المنتجات أولاً.');
    return;
  }

  closeCartDrawer();
  const modal = document.getElementById('checkout-modal');
  const summaryBox = document.getElementById('checkout-summary-breakdown');
  const { subtotal, discount, shipping, total } = calculateCartTotals();

  summaryBox.innerHTML = `
    <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: 1rem; margin-bottom: 1rem;">
      <h4 style="font-size: 1rem; color: #fff; margin-bottom: 0.8rem;">ملخص القطع (${VELORA_STATE.cart.length}):</h4>
      <div style="max-height: 180px; overflow-y: auto; display: flex; flex-direction: column; gap: 0.8rem;">
        ${VELORA_STATE.cart.map(i => `
          <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
            <span>${i.titleAr} (${i.size}) × ${i.quantity}</span>
            <strong style="color: var(--gold-light);">${formatPrice(i.price * i.quantity)}</strong>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="summary-row"><span>المجموع الفرعي:</span> <span>${formatPrice(subtotal)}</span></div>
    ${discount > 0 ? `<div class="summary-row" style="color: var(--gold-primary);"><span>الخصم المطبق:</span> <span>-${formatPrice(discount)}</span></div>` : ''}
    <div class="summary-row"><span>رسوم الشحن الفاخر:</span> <span>${shipping === 0 ? 'مجاني' : formatPrice(shipping)}</span></div>
    <div class="summary-row total-row"><span>الإجمالي النهائي:</span> <span>${formatPrice(total)}</span></div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  const city = document.getElementById('client-city').value;
  const address = document.getElementById('client-address').value.trim();
  const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'cod';

  if (!name || !phone || !address) {
    showToast('يرجى استكمال جميع البيانات المطلوبة لضمان دقة التوصيل', 'error');
    return;
  }

  const orderNumber = 'VEL-' + Math.floor(100000 + Math.random() * 900000);
  const { total } = calculateCartTotals();

  // Show Success Receipt Modal Screen
  const checkoutContainer = document.getElementById('checkout-form-container');
  checkoutContainer.innerHTML = `
    <div style="text-align: center; padding: 2.5rem 1rem;">
      <div style="width: 80px; height: 80px; border-radius: 50%; background: rgba(46, 204, 113, 0.15); border: 2px solid var(--success); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; color: var(--success); font-size: 2.5rem; animation: pulseAnimation 2s infinite;">
        ✓
      </div>
      <h2 style="font-size: 2rem; color: #fff; margin-bottom: 0.5rem;">تم تأكيد طلبك بنجاح!</h2>
      <p style="color: var(--gold-light); font-size: 1.1rem; font-weight: 700; margin-bottom: 1.5rem;">رقم الطلب الخاص بك: #${orderNumber}</p>
      
      <div style="background: var(--bg-tertiary); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.5rem; max-width: 450px; margin: 0 auto 2rem; text-align: right;">
        <p style="margin-bottom: 0.5rem;"><strong>الاسم:</strong> ${name}</p>
        <p style="margin-bottom: 0.5rem;"><strong>الهاتف:</strong> ${phone}</p>
        <p style="margin-bottom: 0.5rem;"><strong>عنوان التسليم:</strong> ${city} - ${address}</p>
        <p style="margin-bottom: 0.5rem;"><strong>طريقة الدفع:</strong> ${getPaymentLabel(paymentMethod)}</p>
        <p style="margin-bottom: 0; color: var(--gold-light);"><strong>المبلغ الإجمالي للدفع:</strong> ${formatPrice(total)}</p>
      </div>

      <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 2rem; max-width: 500px; margin-inline: auto;">
        شكراً لاختيارك دار فيلورا. سيتواصل معك أحد مستشاري الأناقة هاتفياً خلال ساعات لتأكيد المقاسات وتتبع الشحنة حتى باب منزلك.
      </p>

      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn-primary" onclick="resetOrderAndClose()">
          العودة للتسوق
        </button>
        <button class="btn-outline" onclick="window.print()">
          طباعة الفاتورة 🖨️
        </button>
      </div>
    </div>
  `;

  // Clear Cart
  VELORA_STATE.cart = [];
  saveCart();
  updateCartUI();
  updateWishlistCount();
}

function getPaymentLabel(method) {
  switch (method) {
    case 'cod': return 'الدفع نقداً عند الاستلام (COD)';
    case 'card': return 'بطاقة ائتمان بنكية (فيزا / ماستركارد)';
    case 'instapay': return 'تحويل فوري عبر انستاباي / فودافون كاش';
    default: return 'الدفع عند الاستلام';
  }
}

function resetOrderAndClose() {
  closeModal('checkout-modal');
  location.reload();
}

// ==========================================================================
// COUPON PROMO ENGINE
// ==========================================================================
function applyCoupon() {
  const input = document.getElementById('coupon-input');
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (PROMO_CODES[code]) {
    VELORA_STATE.appliedCoupon = code;
    showToast(`🎉 مبروك! تم تطبيق ${PROMO_CODES[code].label}`);
    updateCartUI();
  } else {
    showToast('عفواً، كود الخصم غير صالح أو منتهي الصلاحية', 'error');
  }
}

// ==========================================================================
// TOAST NOTIFICATIONS
// ==========================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-${type === 'error' ? 'circle-exclamation' : 'circle-check'}" 
       style="color: ${type === 'error' ? 'var(--danger)' : 'var(--gold-primary)'}; font-size: 1.2rem;"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

// ==========================================================================
// EVENT LISTENERS & FILTER CONTROLS
// ==========================================================================
function setupEventListeners() {
  // Category tabs filter
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      VELORA_STATE.activeFilter = pill.getAttribute('data-category');
      renderProducts();
    });
  });

  // Sort dropdown
  const sortSelect = document.getElementById('catalog-sort');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      VELORA_STATE.activeSort = e.target.value;
      renderProducts();
    });
  }

  // Size filter
  const sizeSelect = document.getElementById('size-filter-select');
  if (sizeSelect) {
    sizeSelect.addEventListener('change', (e) => {
      VELORA_STATE.activeSizeFilter = e.target.value;
      renderProducts();
    });
  }

  // Currency select
  const currencySelect = document.getElementById('currency-selector');
  if (currencySelect) {
    currencySelect.addEventListener('change', (e) => {
      VELORA_STATE.currentCurrency = e.target.value;
      renderProducts();
      updateCartUI();
      showToast(`تم تغيير العملة إلى ${e.target.value}`);
    });
  }

  // Language toggle
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
      const isAr = VELORA_STATE.currentLang === 'ar';
      VELORA_STATE.currentLang = isAr ? 'en' : 'ar';
      document.documentElement.setAttribute('lang', VELORA_STATE.currentLang);
      document.documentElement.setAttribute('dir', isAr ? 'ltr' : 'rtl');
      langToggleBtn.textContent = isAr ? 'العربية' : 'English';
      renderProducts();
      updateCartUI();
      showToast(isAr ? 'Switched to English' : 'تم التحويل إلى اللغة العربية');
    });
  }

  // Live Search
  const searchInput = document.getElementById('search-catalog-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.product-card');
      cards.forEach(card => {
        const title = card.querySelector('.product-title')?.textContent.toLowerCase() || '';
        const cat = card.querySelector('.product-category-meta')?.textContent.toLowerCase() || '';
        if (title.includes(query) || cat.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Newsletter Submit
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      showToast(`مرحباً بك في نادي فيلورا النخبوي! تم إرسال كود خصم 15% إلى ${email}`);
      newsletterForm.reset();
    });
  }

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-main');
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('header-scrolled');
      } else {
        header.classList.remove('header-scrolled');
      }
    }
  });
}
