document.addEventListener('DOMContentLoaded', () => {
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const amountInput = document.getElementById('amount');
    const convertButton = document.getElementById('convertButton');
    const resultDiv = document.getElementById('result');
  
    const apiUrl = 'https://api.exchangerate-api.com/v4/latest/USD';
  
    // Fetch exchange rates and populate currency options
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const currencies = Object.keys(data.rates);
        populateCurrencyOptions(currencies);
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
      });
  
    function populateCurrencyOptions(currencies) {
      currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);
  
        const option2 = document.createElement('option');
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
      });
    }
  
    convertButton.addEventListener('click', () => {
      const amount = parseFloat(amountInput.value);
      const from = fromCurrency.value;
      const to = toCurrency.value;
  
      if (isNaN(amount) || !from || !to) {
        alert('Please enter a valid amount and select currencies.');
        return;
      }
  
      convertCurrency(amount, from, to);
    });
  
    function convertCurrency(amount, from, to) {
      fetch(`${apiUrl}`)
        .then(response => response.json())
        .then(data => {
          const fromRate = data.rates[from];
          const toRate = data.rates[to];
          const convertedAmount = (amount / fromRate) * toRate;
          resultDiv.textContent = `${amount} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
        })
        .catch(error => {
          console.error('Error converting currency:', error);
        });
    }
  });
  