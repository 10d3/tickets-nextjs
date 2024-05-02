/* eslint-disable tailwindcss/classnames-order */
'use client'

import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

const PaymentButton = () => {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('HTG');
  const [orderId, setOrderId] = useState('123445564454542123');

  const handlePayment = async () => {
    try {
      const response = await fetch('/api/payment/checkout_session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount,
          orderId,
        }),
      });

      const data = await response.json();
      console.log('Payment created:', data);
      if (data.redirect) { // Check for redirect property in response
        console.log(data.redirect)
        window.location.href = data.redirect.destination; // Redirect the user
      } else {
        console.error('Failed to retrieve redirect URL');
        // Handle cases where redirect URL is not available
      }
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };

  return (
    <div className='flex flex-col mx-6 gap-6 mt-16'>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="HTG">HTG</option>
        <option value="USD">USD</option>
      </select>
      <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} />
      <Button onClick={handlePayment}>Pay Now</Button>
    </div>
  );
};

export default PaymentButton;
