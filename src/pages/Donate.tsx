import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { config } from '../config';
import { donateContent } from '../content/donate';

const PRESET_AMOUNTS = config.defaultAmounts;
const { header, card, disclaimer, statBadges, about } = donateContent;

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const effectiveAmount = selectedAmount ?? (parseFloat(customAmount) || 0);

  function handlePresetClick(amount: number) {
    setSelectedAmount(amount);
    setCustomAmount('');
  }

  function handleCustomChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  }

  async function handleDonate() {
    if (effectiveAmount < config.minDonationAmount) {
      alert(`Please enter a donation amount of at least $${config.minDonationAmount}`);
      return;
    }

    setIsLoading(true);
    try {
      if (config.paymentLinkUrl.includes('YOUR_PAYMENT_LINK_ID')) {
        alert('Please configure your Stripe Payment Link in src/config.ts');
        return;
      }
      window.location.href = config.paymentLinkUrl;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      {/* Page Header */}
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-4 py-10 md:py-16 text-center">
          <div className="mx-auto max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{header.heading}</h1>
            <p className="text-xl opacity-90">
              {header.subheading}
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-3 md:px-4 py-8 md:py-12">
        <div className="mx-auto max-w-lg">

          {/* Donation Card */}
          <section className="donation-card bg-white rounded-2xl p-6 md:p-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{card.heading}</h2>

            {/* Quick Amount Buttons */}
            <div className="mb-6">
              <p className="text-gray-600 mb-3 text-center font-medium">{card.presetLabel}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {PRESET_AMOUNTS.map((amount) => (
                  <button
                    key={amount}
                    className={`amount-btn py-3 px-3 rounded-lg font-semibold w-full ${
                      selectedAmount === amount
                        ? 'selected text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => handlePresetClick(amount)}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="mb-6">
              <label htmlFor="custom-amount" className="block text-gray-700 font-medium mb-2">
                {card.customLabel}
              </label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500 text-lg font-semibold">$</span>
                <input
                  id="custom-amount"
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  value={customAmount}
                  onChange={handleCustomChange}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg text-xl font-semibold focus:outline-none focus:border-green-600"
                />
              </div>
            </div>

            {/* Donate Button */}
            <button
              onClick={handleDonate}
              disabled={isLoading}
              className="btn-donate w-full text-white py-3 px-4 rounded-lg font-bold text-xl disabled:opacity-60"
              style={{ background: 'linear-gradient(135deg, #CE1126 0%, #006B3F 100%)', border: 'none' }}
            >
              {isLoading ? card.buttonLoading : card.buttonIdle}
            </button>

            <p className="text-center text-gray-500 text-sm mt-4">
              {card.secureNote}
            </p>

            {/* Disclaimer */}
            <div className="mt-4 p-3 rounded-lg border" style={{ backgroundColor: '#eff6ff', borderColor: '#bfdbfe' }}>
              <p className="text-sm text-gray-700 text-center mb-0">
                <strong>Note:</strong> {disclaimer}
              </p>
            </div>

            {/* Stats */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                {statBadges.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-bold text-green-700 mb-1">{s.value}</div>
                    <div className="text-gray-500 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="mt-6 bg-white rounded-2xl p-6 md:p-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{about.heading}</h3>
            <div className="text-gray-600 space-y-4">
              <p>{about.body1}</p>
              <p>{about.body2}</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
