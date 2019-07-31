module.exports = {
  'buyer/seller-signup': {
    sms: {
      message:
        'Dear {name}. Welcome to IndiaWasteExchange. You have successfully signed up. Please wait for approval before logging in. Thank you.',
    },
    email: {
      message:
        'Dear Name \n \t Welcome to IndiaWasteExchange. You have successfully signed up. \n Please wait for approval before logging in. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Registration - indiawasteexchange.com',
    },
  },

  'buyer/seller-approved': {
    sms: {
      message: 'Dear {name}. Your request for Sign up has been approved. Welcome to IndiaWasteExchange. Thank you.',
    },
    email: {
      message:
        'Dear Name \n \t Your request for Sign up has been approved. Welcome to IndiaWasteExchange. You can start using the application now. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Approved - indiawasteexchange.com',
    },
  },
};
