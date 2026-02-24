import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { orderAPI } from '../api';

export function Checkout({ cartItems, onClearCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [orderError, setOrderError] = useState(null);
  
  const [formData, setFormData] = useState({
    // Shipping
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    
    // Billing (same as shipping by default)
    sameAsShipping: true,
    billingFirstName: '',
    billingLastName: '',
    billingAddress: '',
    billingCity: '',
    billingState: '',
    billingZipCode: '',
    billingCountry: '',
    
    // Payment
    cardholderName: '',
    cardType: 'visa',
    cardNumber: '',
    expiryMonth: '01',
    expiryYear: new Date().getFullYear().toString(),
    cvv: '',
  });

  const validateForm = () => {
    const errors = {};
    
    // Shipping validation
    if (!formData.firstName.trim()) errors.firstName = 'First name required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'Valid email required';
    if (!formData.phone.match(/^\d{10,}$/)) errors.phone = 'Valid phone number required (10+ digits)';
    if (!formData.address.trim()) errors.address = 'Address required';
    if (!formData.city.trim()) errors.city = 'City required';
    if (!formData.state.trim()) errors.state = 'State required';
    if (!formData.zipCode.match(/^[A-Z0-9\s]{3,}$/i)) errors.zipCode = 'Valid zip code required (min 3 characters)';
    if (!formData.country.trim()) errors.country = 'Country required';

    // Billing validation
    if (!formData.sameAsShipping) {
      if (!formData.billingFirstName.trim()) errors.billingFirstName = 'First name required';
      if (!formData.billingLastName.trim()) errors.billingLastName = 'Last name required';
      if (!formData.billingAddress.trim()) errors.billingAddress = 'Address required';
      if (!formData.billingCity.trim()) errors.billingCity = 'City required';
      if (!formData.billingState.trim()) errors.billingState = 'State required';
      if (!formData.billingZipCode.match(/^[A-Z0-9\s]{3,}$/i)) errors.billingZipCode = 'Valid zip code required';
      if (!formData.billingCountry.trim()) errors.billingCountry = 'Country required';
    }

    // Payment validation
    if (!formData.cardholderName.trim()) errors.cardholderName = 'Cardholder name required';
    if (!formData.cardNumber.match(/^\d{13,19}$/)) errors.cardNumber = 'Valid card number required (13-19 digits)';
    if (!formData.cvv.match(/^\d{3,4}$/)) errors.cvv = 'Valid CVV required (3-4 digits)';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Create order
      const result = await orderAPI.createOrder(cartItems);
      
      if (result.status === 200 || result.status === 201) {
        onClearCart();
        navigate('/orders', { 
          state: { message: 'Order created successfully! Thank you for your purchase.' } 
        });
      } else {
        throw new Error(result.data?.error || 'Order creation failed');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      const errorMsg = error.response?.data?.error || error.message || 'Payment processing failed';
      setOrderError(errorMsg);
      setLoading(false);
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p className="text-slate-600 mb-6">Your cart is empty</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-6 rounded"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Stock Error Notification */}
      {orderError && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-red-600 text-xl flex-shrink-0">⚠️</div>
            <div>
              <h3 className="font-bold text-red-900 mb-1">Order Issue</h3>
              <p className="text-red-800">{orderError}</p>
              <p className="text-red-700 text-sm mt-2">
                Please review your cart and adjust quantities if needed, then try again.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderError(null);
                  navigate('/cart');
                }}
                className="mt-3 text-red-700 font-semibold hover:text-red-900 underline"
              >
                Back to Cart →
              </button>
            </div>
            <button
              type="button"
              onClick={() => setOrderError(null)}
              className="text-red-600 hover:text-red-900 flex-shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Shipping Address */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.firstName ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:border-fuchsia-500`}
                  />
                  {formErrors.firstName && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.lastName ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:border-fuchsia-500`}
                  />
                  {formErrors.lastName && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded ${
                    formErrors.email ? 'border-red-500' : 'border-slate-300'
                  } focus:outline-none focus:border-fuchsia-500`}
                />
                {formErrors.email && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.email}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className={`w-full px-3 py-2 border rounded ${
                    formErrors.phone ? 'border-red-500' : 'border-slate-300'
                  } focus:outline-none focus:border-fuchsia-500`}
                />
                {formErrors.phone && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.phone}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded ${
                    formErrors.address ? 'border-red-500' : 'border-slate-300'
                  } focus:outline-none focus:border-fuchsia-500`}
                />
                {formErrors.address && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.city ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:border-fuchsia-500`}
                  />
                  {formErrors.city && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">State/Province *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.state ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:border-fuchsia-500`}
                  />
                  {formErrors.state && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.state}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Zip Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.zipCode ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:border-fuchsia-500`}
                  />
                  {formErrors.zipCode && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.zipCode}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.country ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:border-fuchsia-500`}
                  />
                  {formErrors.country && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.country}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Billing Address */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Billing Address</h2>
              <label className="flex items-center mb-4">
                <input
                  type="checkbox"
                  name="sameAsShipping"
                  checked={formData.sameAsShipping}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm font-semibold">Same as shipping address</span>
              </label>

              {!formData.sameAsShipping && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">First Name *</label>
                      <input
                        type="text"
                        name="billingFirstName"
                        value={formData.billingFirstName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${
                          formErrors.billingFirstName ? 'border-red-500' : 'border-slate-300'
                        } focus:outline-none focus:border-fuchsia-500`}
                      />
                      {formErrors.billingFirstName && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.billingFirstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Last Name *</label>
                      <input
                        type="text"
                        name="billingLastName"
                        value={formData.billingLastName}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${
                          formErrors.billingLastName ? 'border-red-500' : 'border-slate-300'
                        } focus:outline-none focus:border-fuchsia-500`}
                      />
                      {formErrors.billingLastName && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.billingLastName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Address *</label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded ${
                        formErrors.billingAddress ? 'border-red-500' : 'border-slate-300'
                      } focus:outline-none focus:border-fuchsia-500`}
                    />
                    {formErrors.billingAddress && (
                      <p className="text-red-600 text-sm mt-1">{formErrors.billingAddress}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">City *</label>
                      <input
                        type="text"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${
                          formErrors.billingCity ? 'border-red-500' : 'border-slate-300'
                        } focus:outline-none focus:border-fuchsia-500`}
                      />
                      {formErrors.billingCity && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.billingCity}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">State/Province *</label>
                      <input
                        type="text"
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${
                          formErrors.billingState ? 'border-red-500' : 'border-slate-300'
                        } focus:outline-none focus:border-fuchsia-500`}
                      />
                      {formErrors.billingState && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.billingState}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Zip Code *</label>
                      <input
                        type="text"
                        name="billingZipCode"
                        value={formData.billingZipCode}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${
                          formErrors.billingZipCode ? 'border-red-500' : 'border-slate-300'
                        } focus:outline-none focus:border-fuchsia-500`}
                      />
                      {formErrors.billingZipCode && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.billingZipCode}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Country *</label>
                      <input
                        type="text"
                        name="billingCountry"
                        value={formData.billingCountry}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border rounded ${
                          formErrors.billingCountry ? 'border-red-500' : 'border-slate-300'
                        } focus:outline-none focus:border-fuchsia-500`}
                      />
                      {formErrors.billingCountry && (
                        <p className="text-red-600 text-sm mt-1">{formErrors.billingCountry}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Payment Information */}
            <section className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Payment Information</h2>

              <div>
                <label className="block text-sm font-semibold mb-2">Cardholder Name *</label>
                <input
                  type="text"
                  name="cardholderName"
                  value={formData.cardholderName}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded ${
                    formErrors.cardholderName ? 'border-red-500' : 'border-slate-300'
                  } focus:outline-none focus:border-fuchsia-500`}
                />
                {formErrors.cardholderName && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.cardholderName}</p>
                )}
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Card Type</label>
                <select
                  name="cardType"
                  value={formData.cardType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-fuchsia-500"
                >
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                  <option value="discover">Discover</option>
                </select>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2">Card Number *</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  placeholder="1234567890123456"
                  className={`w-full px-3 py-2 border rounded ${
                    formErrors.cardNumber ? 'border-red-500' : 'border-slate-300'
                  } focus:outline-none focus:border-fuchsia-500`}
                />
                {formErrors.cardNumber && (
                  <p className="text-red-600 text-sm mt-1">{formErrors.cardNumber}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Month *</label>
                  <select
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-fuchsia-500"
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i} value={String(i + 1).padStart(2, '0')}>
                        {String(i + 1).padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Year *</label>
                  <select
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:border-fuchsia-500"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors.cvv ? 'border-red-500' : 'border-slate-300'
                    } focus:outline-none focus:border-fuchsia-500`}
                  />
                  {formErrors.cvv && (
                    <p className="text-red-600 text-sm mt-1">{formErrors.cvv}</p>
                  )}
                </div>
              </div>
            </section>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 disabled:bg-slate-400 text-white font-bold py-3 rounded transition"
            >
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-slate-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4 pb-4 border-b">
            <div className="flex justify-between">
              <span>Items ({total})</span>
              <span>In Cart</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Subtotal</span>
            <span>Will calculate</span>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="mb-4">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-600"></div>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">Processing Payment</h3>
            <p className="text-slate-600">Please wait while we process your order...</p>
          </div>
        </div>
      )}
    </div>
  );
}
