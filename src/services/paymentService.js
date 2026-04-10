export const paymentService = {
  // Generate a PayFast checkout URL
  // In a real app, this should be done on a backend for security
  generatePayFastUrl: (data) => {
    const { amount, item_name, m_payment_id, name_first, email_address } = data;
    
    // PayFast Sandbox credentials (Replace with real ones for production)
    const merchant_id = '10000100'; 
    const merchant_key = '46f0cd694581a';
    
    const baseUrl = 'https://sandbox.payfast.co.za/eng/process';
    
    const params = {
      merchant_id,
      merchant_key,
      amount: amount.toFixed(2),
      item_name,
      m_payment_id,
      name_first,
      email_address,
      return_url: 'https://www.google.com/?q=payment_success',
      cancel_url: 'https://www.google.com/?q=payment_cancelled',
      notify_url: 'https://www.google.com/?q=payment_notify'
    };

    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    return `${baseUrl}?${queryString}`;
  }
};
