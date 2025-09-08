
import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setCurrency] = useState("INR");
  const [exchangeRates, setExchangeRates] = useState({
  });
  const [convertedAmount, setConvertedAmount] = useState(null);
  useEffect(() => {
    const apiURL = `https://v6.exchangerate-api.com/v6/421053c2983014eacdfc439d/latest/${fromCurrency}`
    axios.get(apiURL)
      .then(response => {
        setExchangeRates(response.data.conversion_rates)
      })
      .catch(error => {
        console.log(error);
      });
  }, [fromCurrency]);
  /* */
  useEffect(() => {
    const conversionRate = exchangeRates[toCurrency]
    if (conversionRate) {
      const converted = amount * conversionRate;
      setConvertedAmount(converted.toFixed(2))
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'amount':
        setAmount(value);
        break;
      case 'fromCurrency':
        setFromCurrency(value);
        break;
      case 'toCurrency':
        setCurrency(value);
        break;
    }
  }

  /* ui section */
  return (
    <div className="card">
      <img src="" alt="" />
      <h1 className='text-6xl'>Currency Converter</h1>
      {/* wrapper*/}
      <div className="currency-exchange">
        {/*input wrapper1 */}
        <div className="input_container">
          <label className='input_label'>Amount</label>
          <input className="input-field" type="number" name="amount" value={amount} onChange={handleChange} />
        </div>
        {/*input wrapper 2 */}
        <div className="input_container">
          <label className='input_label'>From Currency</label>
          <select name="fromCurrency" value={fromCurrency} onChange={handleChange} className="input-field">
            {
              Object.keys(exchangeRates).map(currency => (<option key={currency} value={currency}>{currency}</option>
              ))
            }
          </select>
        </div>
        <div className="input_container">
          <label className='input_label'>To Currency</label>
          <select name="toCurrency" value={toCurrency} onChange={handleChange} className="input-field">
            {
              Object.keys(exchangeRates).map(currency =>
              (
                <option key={currency} value={currency}>{currency}</option>
              )
              )
            }
          </select>
        </div>
      </div>
      <div className="output">
        <h2>Converted Amount:<b>{convertedAmount}</b></h2>
      </div>
    </div>
  )
}

export default App
