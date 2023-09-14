import React from "react";
import "../styles/Payment.css";

const Payment = () => {
  return (
    <div>
      <div className="payment-title">
        <h1>Smart Mart Payment </h1>
      </div>
      <div className="container preload">
        <div className="creditcard">
          <div className="front">
            <div id="ccsingle"></div>
          </div>
          <div className="back"></div>
        </div>
      </div>
      <div className="htmlForm-container">
        <div className="field-container">
          <label htmlFor="name">Name</label>
          <input id="name" maxLength="20" type="text" />
        </div>
        <div className="field-container">
          <label htmlFor="cardnumber">Card Number</label>
          {/* <span id="generatecard">generate random</span> */}
          <input
            id="cardnumber"
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </div>
        <div className="field-container">
          <label htmlFor="expirationdate">Expiration (mm/yy)</label>
          <input
            id="expirationdate"
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </div>
        <div className="field-container">
          <label htmlFor="securitycode">Security Code</label>
          <input
            id="securitycode"
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
          />
        </div>
      </div>
    </div>
  );
};

export default Payment;
