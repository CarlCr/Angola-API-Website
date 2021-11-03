```json
// GET https://angolaapi.herokuapp.com/api/v1/banks/rates/comercial-exchange

{
  "date": "25 de Fevereiro de 2021",
  "banks": [
    {
      "name": "Banco de Investimento Rural - (BIR)",
      "current": {
        "buy": [
          {
            "currency": "USD/AOA",
            "quotation": 572
          },
          {
            "currency": "EUR/AOA",
            "quotation": 712.07
          }
        ],
        "sell": [
          {
            "currency": "USD/AOA",
            "quotation": 699
          },
          {
            "currency": "EUR/AOA",
            "quotation": 854.55
          }
        ]
      },
      "lastDay": {
        "buy": [
          {
            "currency": "USD/AOA",
            "quotation": 595
          },
          {
            "currency": "EUR/AOA",
            "quotation": 715.31
          }
        ],
        "sell": [
          {
            "currency": "USD/AOA",
            "quotation": 698
          },
          {
            "currency": "EUR/AOA",
            "quotation": 854.55
          }
        ]
      },
      "variation": {
        "buy": [
          {
            "currency": "USD/AOA",
            "variation": "4,02%"
          },
          {
            "currency": "EUR/AOA",
            "variation": "0,46%"
          }
        ],
        "sell": [
          {
            "currency": "USD/AOA",
            "variation": "-0,14%"
          },
          {
            "currency": "EUR/AOA",
            "variation": "0,00%"
          }
        ]
      }
    },
    ...
  ]
    
```