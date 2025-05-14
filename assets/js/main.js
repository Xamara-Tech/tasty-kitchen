/*==================== SHOW MENU ====================*/
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    // Validate that variables exist
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            // We add the show-menu class to the div tag with the nav__menu class
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 200) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*==================== SCROLL REVEAL ANIMATION ====================*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 2000,
    reset: true
});

sr.reveal(`.home__data, .home__img,
            .about__data, .about__img,
            .services__content, .menu__content,
            .app__data, .app__img,
            .contact__data, .contact__button,
            .footer__content`, {
    interval: 200
})


// Add this at the end of your main.js file

// Menu cart functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart if it doesn't exist yet
    if (!localStorage.getItem('tastyKitchenCart')) {
        localStorage.setItem('tastyKitchenCart', JSON.stringify([]));
    }
    
    // Add event listeners to all cart buttons
    const addToCartButtons = document.querySelectorAll('.menu__button');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const menuItem = this.closest('.menu__content');
            const name = menuItem.querySelector('.menu__name').textContent;
            const priceText = menuItem.querySelector('.menu__preci').textContent;
            const price = parseFloat(priceText.replace('Ksh ', ''));
            const image = menuItem.querySelector('.menu__img').src;
            
            // Create a unique ID based on the name (in a real app, you'd use actual product IDs)
            const id = name.toLowerCase().replace(/\s+/g, '-');
            
            // Get current cart
            const cart = JSON.parse(localStorage.getItem('tastyKitchenCart')) || [];
            
            // Check if item already exists in cart
            const existingItemIndex = cart.findIndex(item => item.id === id);
            
            if (existingItemIndex !== -1) {
                // Item exists, increase quantity
                cart[existingItemIndex].quantity += 1;
            } else {
                // Add new item to cart
                cart.push({
                    id,
                    name,
                    price,
                    image,
                    quantity: 1
                });
            }
            
            // Save updated cart
            localStorage.setItem('tastyKitchenCart', JSON.stringify(cart));
            
            // Update cart count
            updateCartCount();
            
            // Show confirmation
            showToast(`${name} added to cart!`);
        });
    });
    
    // Update cart count initially
    updateCartCount();
});

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('tastyKitchenCart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Show toast notification
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    // Set message and show
    toast.textContent = message;
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}




// Cart management functions
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
});

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('tastyKitchenCart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('tastyKitchenCart', JSON.stringify(cart));
    updateCartCount();
}

// Load and display cart items
function loadCart() {
    const cart = getCart();
    const cartItemsElement = document.getElementById('cart-items');
    const cartEmptyElement = document.getElementById('cart-empty');
    const cartSummaryElement = document.getElementById('cart-summary');
    const cartActionsElement = document.querySelector('.cart-actions');
    
    if (cart.length === 0) {
        // Show empty cart message
        cartItemsElement.style.display = 'none';
        cartSummaryElement.style.display = 'none';
        cartActionsElement.style.display = 'none';
        cartEmptyElement.style.display = 'block';
        return;
    }
    
    // Hide empty cart message and show items
    cartEmptyElement.style.display = 'none';
    cartItemsElement.style.display = 'flex';
    cartSummaryElement.style.display = 'block';
    cartActionsElement.style.display = 'flex';
    
    // Clear existing items
    cartItemsElement.innerHTML = '';
    
    // Add each item to the cart display
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item__img">
            <div class="cart-item__info">
                <h3 class="cart-item__name">${item.name}</h3>
                <p class="cart-item__price">Ksh ${item.price.toFixed(2)}</p>
                <div class="cart-item__quantity">
                    <button class="cart-item__quantity-btn decrease-btn" data-id="${item.id}">-</button>
                    <span class="cart-item__quantity-text">${item.quantity}</span>
                    <button class="cart-item__quantity-btn increase-btn" data-id="${item.id}">+</button>
                </div>
            </div>
            <div class="cart-item__actions">
                <i class='bx bx-trash cart-item__remove' data-id="${item.id}"></i>
            </div>
        `;
        
        cartItemsElement.appendChild(cartItemElement);
    });
    
    // Update summary
    const deliveryFee = 100; // Fixed delivery fee
    const total = subtotal + deliveryFee;
    
    document.getElementById('cart-subtotal').textContent = `Ksh ${subtotal.toFixed(2)}`;
    document.getElementById('cart-delivery').textContent = `Ksh ${deliveryFee.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `Ksh ${total.toFixed(2)}`;
    
    // Add event listeners for quantity buttons and remove button
    attachCartEvents();
}

// Attach event listeners to cart item buttons
function attachCartEvents() {
    // Increase quantity
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const cart = getCart();
            
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                cart[itemIndex].quantity += 1;
                saveCart(cart);
                loadCart();
            }
        });
    });
    
    // Decrease quantity
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const cart = getCart();
            
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                if (cart[itemIndex].quantity > 1) {
                    cart[itemIndex].quantity -= 1;
                } else {
                    cart.splice(itemIndex, 1);
                }
                saveCart(cart);
                loadCart();
            }
        });
    });
    
    // Remove item
    document.querySelectorAll('.cart-item__remove').forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const cart = getCart();
            
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                cart.splice(itemIndex, 1);
                saveCart(cart);
                loadCart();
            }
        });
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Thank you for your order! This would proceed to payment processing in a real application.');
            // In a real app, this would redirect to a checkout page
            const cart = [];
            saveCart(cart);
            loadCart();
        });
    }
}

// Update cart count in header (reusing the function from main.js)
function updateCartCount() {
    const cart = getCart();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('.cart-count');
    cartCountElements.forEach(element => {
        element.textContent = cartCount;
    });
}

// Initialize cart count when page loads
updateCartCount();