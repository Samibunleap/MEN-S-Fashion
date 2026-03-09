/* ══════════════════════════════════════════
   MEN'S FASHION — Shared JavaScript
══════════════════════════════════════════ */

/* ─── PRODUCTS DATA ──────────────────────── */
const products = [
  { id:1,  name:"Beige Bomber Jacket",    price:149, cat:"Clothing",    tag:"clothing",  img:"./image/product1.jpg", desc:"A modern take on the classic bomber. Crafted in a warm beige, transitions effortlessly from casual weekends to smart-casual evenings." },
  { id:2,  name:"Smart Casual Blazer",    price:199, cat:"Clothing",    tag:"clothing",  img:"./image/product2.png", desc:"Impeccably tailored in a mid-weight fabric. Works with trousers or dark denim." },
  { id:3,  name:"Knitted Polo Shirt",     price:79,  cat:"Clothing",    tag:"clothing",  img:"./image/product3.png", desc:"A refined polo with a fine-knit construction. The subtle texture elevates this wardrobe staple." },
  { id:4,  name:"Textured Wool Coat",     price:229, cat:"Clothing",    tag:"clothing",  img:"./image/product4.png", desc:"A statement piece for the colder months. The textured weave adds visual interest while the relaxed silhouette ensures all-day comfort." },
  { id:5,  name:"Slim Chino Trouser",     price:89,  cat:"Clothing",    tag:"clothing",  img:"./image/casual.png",   desc:"Clean lines, a slim leg, and a comfortable waistband. The go-to trouser for a polished everyday look." },
  { id:6,  name:"Oxford Dress Shirt",     price:99,  cat:"Clothing",    tag:"clothing",  img:"./image/formal.png",   desc:"A classic Oxford cloth button-down, cut for a modern fit. Wear tucked or untucked." },
  { id:7,  name:"Street Hoodie",          price:119, cat:"Clothing",    tag:"clothing",  img:"./image/street.png",   desc:"A heavyweight French terry hoodie with a clean, minimal aesthetic. Oversized cut for layering." },
  { id:8,  name:"Technical Parka",        price:269, cat:"Clothing",    tag:"clothing",  img:"./image/outer.png",    desc:"Weather-resistant and warmly lined — handles the elements without sacrificing style." },
  { id:9,  name:"Leather Derby Shoe",     price:189, cat:"Footwear",   tag:"footwear",  img:"./image/product1.jpg", desc:"Hand-stitched in full-grain leather. A timeless derby with a contemporary last that suits both suits and trousers." },
  { id:10, name:"White Leather Sneaker",  price:159, cat:"Footwear",   tag:"footwear",  img:"./image/product2.png", desc:"A premium white leather sneaker with a cupsole construction. The clean silhouette makes it infinitely wearable." },
  { id:11, name:"Chelsea Boot",           price:219, cat:"Footwear",   tag:"footwear",  img:"./image/product3.png", desc:"A sleek Chelsea boot in smooth calfskin. Elastic side panels and a pull-tab make it as practical as it is elegant." },
  { id:12, name:"Suede Loafer",           price:175, cat:"Footwear",   tag:"footwear",  img:"./image/product4.png", desc:"Crafted in soft suede with a penny keeper detail. The ideal smart-casual shoe for warmer months." },
  { id:13, name:"Leather Bifold Wallet",  price:65,  cat:"Accessories",tag:"wallets",   img:"./image/accessories.png", desc:"A slim bifold in full-grain leather. Holds cards and notes without bulk." },
  { id:14, name:"Woven Leather Belt",     price:75,  cat:"Accessories",tag:"belts",     img:"./image/product1.jpg", desc:"A hand-woven leather belt with a brushed silver buckle. Available in tan and black." },
  { id:15, name:"Merino Wool Scarf",      price:89,  cat:"Accessories",tag:"scarves",   img:"./image/product2.png", desc:"An extra-fine merino scarf in a classic herringbone weave. Lightweight, warm, and endlessly versatile." },
  { id:16, name:"Minimalist Watch",       price:295, cat:"Accessories",tag:"watches",   img:"./image/product3.png", desc:"Swiss-made quartz movement in a 40mm stainless steel case. A watch you'll pass down." },
  { id:17, name:"Canvas Tote Bag",        price:110, cat:"Accessories",tag:"bags",      img:"./image/product4.png", desc:"A waxed canvas tote with leather handles and a canvas lining. The everyday bag, elevated." },
  { id:18, name:"Knitted Beanie",         price:45,  cat:"Accessories",tag:"scarves",   img:"./image/casual.png",   desc:"A ribbed-knit beanie in merino wool. Simple, clean, and incredibly warm." },
];

/* ─── CART STATE ─────────────────────────── */
let cart = JSON.parse(localStorage.getItem('mens-cart') || '[]');
let currentModalProduct = null;

function saveCart() {
  localStorage.setItem('mens-cart', JSON.stringify(cart));
}

/* ─── RENDER HELPERS ─────────────────────── */
function productCard(p) {
  return `
    <div class="product" onclick="openProductModal(${p.id})">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        <div class="product-overlay">
          <button class="btn-add" onclick="event.stopPropagation();addToCart(${p.id})">+ Add to Bag</button>
        </div>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-price">$${p.price}</p>
      </div>
    </div>`;
}

/* ─── SEARCH ─────────────────────────────── */
function openSearch() {
  document.getElementById('searchOverlay').classList.add('open');
  setTimeout(() => document.getElementById('searchInput').focus(), 100);
}
function closeSearch(e) {
  if (!e || e.target === document.getElementById('searchOverlay')) {
    document.getElementById('searchOverlay').classList.remove('open');
    document.getElementById('searchInput').value = '';
    document.querySelector('.search-hint').textContent = "Try: Bomber jacket, Wool coat, Sneakers…";
  }
}
function handleSearch(val) {
  if (!val.trim()) {
    document.querySelector('.search-hint').textContent = "Try: Bomber jacket, Wool coat, Sneakers…";
    return;
  }
  const results = products.filter(p => p.name.toLowerCase().includes(val.toLowerCase()));
  document.querySelector('.search-hint').textContent = results.length
    ? results.map(p => p.name).join(' · ')
    : 'No results found';
}

/* ─── CART ───────────────────────────────── */
function openCart() {
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').classList.add('open');
}
function closeCart(e) {
  if (!e || e.target === document.getElementById('cartOverlay')) {
    document.getElementById('cartOverlay').classList.remove('open');
    document.getElementById('cartDrawer').classList.remove('open');
  }
}
function addToCart(id, size) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  const sz = size || 'M';
  const existing = cart.find(i => i.id === id && i.size === sz);
  if (existing) { existing.qty++; }
  else { cart.push({ ...p, qty: 1, size: sz }); }
  saveCart();
  updateCartUI();
  showToast(`${p.name} added to bag`);
}
function removeFromCart(id, size) {
  cart = cart.filter(i => !(i.id === id && i.size === size));
  saveCart();
  updateCartUI();
}
function changeQty(id, size, delta) {
  const item = cart.find(i => i.id === id && i.size === size);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { cart = cart.filter(i => !(i.id === id && i.size === size)); }
  saveCart();
  updateCartUI();
}
function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(b => b.textContent = count);
  const itemsEl = document.getElementById('cartItems');
  const footerEl = document.getElementById('cartFooter');
  if (!itemsEl) return;
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-bag"></i><p>Your bag is empty</p></div>`;
    if (footerEl) footerEl.style.display = 'none';
  } else {
    itemsEl.innerHTML = cart.map(i => `
      <div class="cart-item">
        <img class="cart-item-img" src="${i.img}" alt="${i.name}">
        <div class="cart-item-info">
          <h4>${i.name}</h4>
          <div class="cart-item-price">$${i.price} &middot; Size ${i.size}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="changeQty(${i.id},'${i.size}',-1)">&#8722;</button>
            <span class="qty-num">${i.qty}</span>
            <button class="qty-btn" onclick="changeQty(${i.id},'${i.size}',1)">+</button>
          </div>
        </div>
        <button class="cart-item-remove" onclick="removeFromCart(${i.id},'${i.size}')">&#10005;</button>
      </div>`).join('');
    if (footerEl) {
      footerEl.style.display = 'block';
      document.getElementById('cartTotal').textContent = '$' + total.toFixed(0);
    }
  }
}

/* ─── SIZE GUIDE MODAL ───────────────────── */
function openSizeModal() {
  document.getElementById('sizeModal').classList.add('open');
}
function closeSizeModal(e) {
  if (!e || e.target === document.getElementById('sizeModal')) {
    document.getElementById('sizeModal').classList.remove('open');
  }
}
function switchSizeTab(btn, tab) {
  document.querySelectorAll('.size-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  ['sizeTabTops', 'sizeTabBottoms', 'sizeTabShoes'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  const map = { tops: 'sizeTabTops', bottoms: 'sizeTabBottoms', shoes: 'sizeTabShoes' };
  document.getElementById(map[tab]).style.display = 'block';
}

/* ─── PRODUCT DETAIL MODAL ───────────────── */
function openProductModal(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  currentModalProduct = p;
  document.getElementById('modalImg').src = p.img;
  document.getElementById('modalImg').alt = p.name;
  document.getElementById('modalCat').textContent = p.cat;
  document.getElementById('modalName').textContent = p.name;
  document.getElementById('modalPrice').textContent = '$' + p.price;
  document.getElementById('modalDesc').textContent = p.desc;
  document.querySelectorAll('.size-opt').forEach((b, i) => b.classList.toggle('selected', i === 2));
  document.getElementById('productModal').classList.add('open');
}
function closeProductModal(e) {
  if (!e || e.target === document.getElementById('productModal')) {
    document.getElementById('productModal').classList.remove('open');
    currentModalProduct = null;
  }
}
function selectSize(btn) {
  document.querySelectorAll('.size-opt').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}
function addToCartFromModal() {
  if (!currentModalProduct) return;
  const selectedSize = document.querySelector('.size-opt.selected')?.textContent || 'M';
  addToCart(currentModalProduct.id, selectedSize);
  closeProductModal();
}

/* ─── NEWSLETTER ─────────────────────────── */
function subscribeNewsletter() {
  const input = document.getElementById('newsletterEmail');
  if (!input) return;
  if (!input.value || !input.value.includes('@')) { showToast('Please enter a valid email'); return; }
  input.value = '';
  showToast('Welcome to the inner circle!');
}

/* ─── TOAST ──────────────────────────────── */
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

/* ─── KEYBOARD ESC ───────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSearch();
    closeCart();
    closeSizeModal();
    closeProductModal();
  }
});

/* ─── HEADER SCROLL (home only) ──────────── */
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  if (header.classList.contains('solid')) return; // inner pages stay solid
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });
}

/* ─── INIT ───────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  initHeaderScroll();
});
