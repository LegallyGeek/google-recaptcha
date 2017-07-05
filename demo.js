const GoogleRecaptcha = require('google-recaptcha')
 
const googleRecaptcha = new GoogleRecaptcha({secret: '6Lck-SUUAAAAAMaMcf_rnLiP9iKmIEPKEojoJCrb'})
 
const recaptchaResponse = '03AEHxwuwCHLRDlGpSJOBfcLYuX-L0kJ9QwJT5YTMU3xSCqhDPsfB6SPE_2vO-z77-FYLOlw0FmCzVjVYA_f_UCpXAvynPSu6XXIFGTIAFMvP85nA1ITlk-hxJMSqlCUaV7ljXUqgMK7_Gj_uaYzCRwH9F-YZsrfB2x979GZXTxjEh2tBn-q1zGG1dFDr9kygx46kS7155DzL4CCPaEKtMHcpU_a7BxAvAl0A84m9WsgmmmeEKwZRtyJi6EmQwFCr2G0capR3hYak7O9TC-LEieHeaSWLVsmbEmMiHJ0q1IGI9n1r9RZy5wnyKMSwGNPn7rTw3KogWF-Le'
 
  googleRecaptcha.verify({response: recaptchaResponse}).then((resp) => {
    console.log('GOOD:', resp);
  }).catch((err_resp) => {
    console.log('BAD:', err_resp);
  })