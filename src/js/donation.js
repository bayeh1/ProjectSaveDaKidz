import { config } from './config.js';
class DonationHandler {
    constructor() {
        this.selectedAmount = 0;
        this.selectedPaymentMethod = 'stripe';
        this.init();
    }
    init() {
        this.setupPaymentMethods();
        this.setupAmountButtons();
        this.setupCustomAmountInput();
        this.setupDonateButton();
    }
    setupPaymentMethods() {
        // Set Stripe as default active
        const stripeBtn = document.getElementById('payment-stripe');
        if (stripeBtn) {
            stripeBtn.classList.add('active');
            stripeBtn.addEventListener('click', () => this.selectPaymentMethod('stripe'));
        }
        // Setup alternative payment methods
        const paymentMethodsRow = document.getElementById('payment-methods-row');
        if (!paymentMethodsRow)
            return;
        const altPayments = config.alternativePayments;
        // Cash App
        if (altPayments.cashApp?.enabled) {
            this.createPaymentMethodButton('cashapp', 'Cash App', altPayments.cashApp.link || '', paymentMethodsRow);
        }
        // Venmo
        if (altPayments.venmo?.enabled) {
            this.createPaymentMethodButton('venmo', 'Venmo', altPayments.venmo.link || '', paymentMethodsRow);
        }
        // PayPal
        if (altPayments.paypal?.enabled) {
            this.createPaymentMethodButton('paypal', 'PayPal', altPayments.paypal.link || '', paymentMethodsRow);
        }
        // Zelle
        if (altPayments.zelle?.enabled) {
            this.createZelleButton(paymentMethodsRow);
        }
    }
    createPaymentMethodButton(method, name, link, container) {
        const wrapper = document.createElement('div');
        wrapper.className = 'col-12 col-md-6';
        const button = document.createElement('button');
        button.type = 'button';
        button.id = `payment-${method}`;
        button.className = 'payment-method-btn w-100 p-3 border-2 rounded-lg text-start d-flex align-items-center gap-3';
        button.dataset.method = method;
        button.dataset.link = link;
        const icons = {
            cashapp: '💵',
            venmo: '💙',
            paypal: '🔵'
        };
        button.innerHTML = `
            <span class="fw-bold">${icons[method] || '💰'}</span>
            <div class="flex-grow-1">
                <div class="fw-semibold">${name}</div>
                <div class="small text-muted">No fees</div>
            </div>
        `;
        button.addEventListener('click', () => this.selectPaymentMethod(method));
        wrapper.appendChild(button);
        container.appendChild(wrapper);
    }
    createZelleButton(container) {
        const wrapper = document.createElement('div');
        wrapper.className = 'col-12 col-md-6';
        const button = document.createElement('button');
        button.type = 'button';
        button.id = 'payment-zelle';
        button.className = 'payment-method-btn w-100 p-3 border-2 rounded-lg text-start d-flex align-items-center gap-3';
        button.dataset.method = 'zelle';
        button.innerHTML = `
            <span class="fw-bold">🏦</span>
            <div class="flex-grow-1">
                <div class="fw-semibold">Zelle</div>
                <div class="small text-muted">${config.alternativePayments.zelle.email || ''}</div>
            </div>
        `;
        button.addEventListener('click', () => this.selectPaymentMethod('zelle'));
        wrapper.appendChild(button);
        container.appendChild(wrapper);
    }
    selectPaymentMethod(method) {
        this.selectedPaymentMethod = method;
        // Update button styles
        document.querySelectorAll('.payment-method-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const selectedBtn = document.getElementById(`payment-${method}`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
    }
    setupAmountButtons() {
        const buttons = document.querySelectorAll('.amount-btn');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const amount = parseFloat(button.dataset.amount || '0');
                this.selectAmount(amount);
                this.clearCustomAmountInput();
            });
        });
    }
    setupCustomAmountInput() {
        const input = document.getElementById('custom-amount');
        if (!input)
            return;
        input.addEventListener('input', () => {
            this.selectedAmount = parseFloat(input.value) || 0;
            this.clearAmountButtonSelection();
        });
    }
    setupDonateButton() {
        const button = document.getElementById('donate-button');
        if (!button)
            return;
        button.addEventListener('click', () => this.handleDonation());
    }
    selectAmount(amount) {
        this.selectedAmount = amount;
        this.clearAmountButtonSelection();
        const buttons = document.querySelectorAll('.amount-btn');
        buttons.forEach(btn => {
            const btnAmount = parseFloat(btn.dataset.amount || '0');
            if (btnAmount === amount) {
                btn.classList.add('selected');
                btn.classList.remove('bg-gray-100', 'text-gray-700');
                btn.classList.add('text-white');
            }
            else {
                btn.classList.remove('selected');
                btn.classList.add('bg-gray-100', 'text-gray-700');
                btn.classList.remove('text-white');
            }
        });
    }
    clearAmountButtonSelection() {
        const buttons = document.querySelectorAll('.amount-btn');
        buttons.forEach(btn => {
            btn.classList.remove('selected');
            btn.classList.add('bg-gray-100', 'text-gray-700');
            btn.classList.remove('text-white');
        });
    }
    clearCustomAmountInput() {
        const input = document.getElementById('custom-amount');
        if (input) {
            input.value = '';
        }
    }
    getSelectedAmount() {
        const customInput = document.getElementById('custom-amount');
        const customAmount = parseFloat(customInput?.value || '0');
        return this.selectedAmount || customAmount;
    }
    validateAmount(amount) {
        if (amount < config.minDonationAmount) {
            alert(`Please enter a donation amount of at least $${config.minDonationAmount}`);
            return false;
        }
        return true;
    }
    setButtonLoading(button, isLoading) {
        if (isLoading) {
            button.dataset.originalText = button.textContent || '';
            button.textContent = 'Processing...';
            button.disabled = true;
        }
        else {
            button.textContent = button.dataset.originalText || 'Donate Now';
            button.disabled = false;
        }
    }
    async handleDonation() {
        const amount = this.getSelectedAmount();
        // For alternative payments, redirect immediately (amount is handled by user)
        if (this.selectedPaymentMethod !== 'stripe' && this.selectedPaymentMethod !== 'zelle') {
            const altPayment = config.alternativePayments[this.selectedPaymentMethod];
            if (altPayment?.enabled && altPayment.link) {
                window.open(altPayment.link, '_blank');
                return;
            }
        }
        // For Zelle, show instructions
        if (this.selectedPaymentMethod === 'zelle') {
            const zelle = config.alternativePayments.zelle;
            const amount = this.getSelectedAmount();
            const message = `Please send $${amount > 0 ? amount.toFixed(2) : 'your donation'} to ${zelle.email} via Zelle.\n\n${zelle.instructions || ''}`;
            alert(message);
            return;
        }
        // For Stripe, proceed with payment
        const button = document.getElementById('donate-button');
        if (!button)
            return;
        this.setButtonLoading(button, true);
        try {
            await this.processPayment(amount);
        }
        catch (error) {
            console.error('Donation error:', error);
            alert('There was an error processing your donation. Please try again.');
            this.setButtonLoading(button, false);
        }
    }
    async processPayment(amount) {
        // Option 1: Stripe Payment Links (Fastest - No backend needed)
        if (config.paymentLinkUrl && !config.paymentLinkUrl.includes('YOUR_PAYMENT_LINK_ID')) {
            window.location.href = config.paymentLinkUrl;
            return;
        }
        // Fallback if no payment method configured
        if (config.paymentLinkUrl.includes('YOUR_PAYMENT_LINK_ID')) {
            alert('Please configure your Stripe Payment Link in src/js/config.ts');
            const button = document.getElementById('donate-button');
            if (button) {
                this.setButtonLoading(button, false);
            }
        }
    }
}
export default DonationHandler;
//# sourceMappingURL=donation.js.map