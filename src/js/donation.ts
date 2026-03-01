import { config, type AlternativePayment } from './config.js';

/**
 * Donation handler module
 * Handles donation amount selection and payment processing
 */

type PaymentMethod = 'stripe' | 'cashapp' | 'venmo' | 'paypal' | 'zelle';

class DonationHandler {
    private selectedAmount: number = 0;
    private selectedPaymentMethod: PaymentMethod = 'stripe';

    constructor() {
        this.init();
    }

    private init(): void {
        this.setupPaymentMethods();
        this.setupAmountButtons();
        this.setupCustomAmountInput();
        this.setupDonateButton();
    }

    private setupPaymentMethods(): void {
        // Set Stripe as default active
        const stripeBtn = document.getElementById('payment-stripe');
        if (stripeBtn) {
            stripeBtn.classList.add('active');
            stripeBtn.addEventListener('click', () => this.selectPaymentMethod('stripe'));
        }

        // Setup alternative payment methods
        const paymentMethodsRow = document.getElementById('payment-methods-row');
        if (!paymentMethodsRow) return;

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

    private createPaymentMethodButton(method: PaymentMethod, name: string, link: string, container: HTMLElement): void {
        const wrapper = document.createElement('div');
        wrapper.className = 'col-12 col-md-6';

        const button = document.createElement('button');
        button.type = 'button';
        button.id = `payment-${method}`;
        button.className = 'payment-method-btn w-100 p-3 border-2 rounded-lg text-start d-flex align-items-center gap-3';
        button.dataset.method = method;
        button.dataset.link = link;

        const icons: Record<string, string> = {
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

    private createZelleButton(container: HTMLElement): void {
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

    private selectPaymentMethod(method: PaymentMethod): void {
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

    private setupAmountButtons(): void {
        const buttons = document.querySelectorAll('.amount-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const amount = parseFloat((button as HTMLElement).dataset.amount || '0');
                this.selectAmount(amount);
                this.clearCustomAmountInput();
            });
        });
    }

    private setupCustomAmountInput(): void {
        const input = document.getElementById('custom-amount') as HTMLInputElement;
        if (!input) return;
        
        input.addEventListener('input', () => {
            this.selectedAmount = parseFloat(input.value) || 0;
            this.clearAmountButtonSelection();
        });
    }

    private setupDonateButton(): void {
        const button = document.getElementById('donate-button');
        if (!button) return;
        
        button.addEventListener('click', () => this.handleDonation());
    }

    private selectAmount(amount: number): void {
        this.selectedAmount = amount;
        this.clearAmountButtonSelection();
        
        const buttons = document.querySelectorAll('.amount-btn');
        buttons.forEach(btn => {
            const btnAmount = parseFloat((btn as HTMLElement).dataset.amount || '0');
            if (btnAmount === amount) {
                btn.classList.add('selected');
                btn.classList.remove('bg-gray-100', 'text-gray-700');
                btn.classList.add('text-white');
            } else {
                btn.classList.remove('selected');
                btn.classList.add('bg-gray-100', 'text-gray-700');
                btn.classList.remove('text-white');
            }
        });
    }

    private clearAmountButtonSelection(): void {
        const buttons = document.querySelectorAll('.amount-btn');
        buttons.forEach(btn => {
            btn.classList.remove('selected');
            btn.classList.add('bg-gray-100', 'text-gray-700');
            btn.classList.remove('text-white');
        });
    }

    private clearCustomAmountInput(): void {
        const input = document.getElementById('custom-amount') as HTMLInputElement;
        if (input) {
            input.value = '';
        }
    }

    private getSelectedAmount(): number {
        const customInput = document.getElementById('custom-amount') as HTMLInputElement;
        const customAmount = parseFloat(customInput?.value || '0');
        return this.selectedAmount || customAmount;
    }

    private validateAmount(amount: number): boolean {
        if (amount < config.minDonationAmount) {
            alert(`Please enter a donation amount of at least $${config.minDonationAmount}`);
            return false;
        }
        return true;
    }

    private setButtonLoading(button: HTMLElement, isLoading: boolean): void {
        if (isLoading) {
            button.dataset.originalText = button.textContent || '';
            button.textContent = 'Processing...';
            (button as HTMLButtonElement).disabled = true;
        } else {
            button.textContent = button.dataset.originalText || 'Donate Now';
            (button as HTMLButtonElement).disabled = false;
        }
    }

    private async handleDonation(): Promise<void> {
        const amount = this.getSelectedAmount();

        // For alternative payments, redirect immediately (amount is handled by user)
        if (this.selectedPaymentMethod !== 'stripe' && this.selectedPaymentMethod !== 'zelle') {
            const altPayment = config.alternativePayments[this.selectedPaymentMethod as keyof typeof config.alternativePayments];
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
        if (!button) return;

        this.setButtonLoading(button, true);

        try {
            await this.processPayment(amount);
        } catch (error) {
            console.error('Donation error:', error);
            alert('There was an error processing your donation. Please try again.');
            this.setButtonLoading(button, false);
        }
    }

    private async processPayment(amount: number): Promise<void> {
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
