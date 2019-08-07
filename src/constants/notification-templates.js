module.exports = {
  'buyer/seller-signup': {
    sms: {
      message:
        'Dear {name}. Welcome to IndiaWasteExchange. You have successfully signed up. Please wait for approval before logging in. Thank you.',
    },
    email: {
      message:
        'Dear {name} \n \t Welcome to IndiaWasteExchange. You have successfully signed up. \n Please wait for approval before logging in. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Registration - indiawasteexchange.com',
    },
  },

  'buyer/seller-approved': {
    sms: {
      message: 'Dear {name}. Your request for Sign up has been approved. Welcome to IndiaWasteExchange. Thank you.',
    },
    email: {
      message:
        'Dear {name} \n \t Your request for Sign up has been approved. Welcome to IndiaWasteExchange. You can start using the application now. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Approved - indiawasteexchange.com',
    },
  },

  'buyer-order-placed': {
    sms: {
      message: 'Dear {buyerName}. Your order request has been placed with the {sellerName}. Please wait for the seller approval. Thank you for using IndiaWasteExchange. Thank you.',
    },
    email: {
      message:
        'Dear {buyerName} \n \t Your request has been placed with the {sellerName}. Please wait for the seller approval. Thank you for using IndiaWasteExchange. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Awaiting seller approval of your bid - indiawasteexchange.com',
    },
  },

  'seller-order-placed': {
    sms: {
      message: 'Dear {sellerName}. You have received an order request from {buyerName}. Please approve/decline within 24 hours. Thank you for using IndiaWasteExchange. Thank you.',
    },
    email: {
      message:
        'Dear {sellerName} \n \t You have received an order request from {buyerName}. Please approve/decline within 24 hours. Thank you for using IndiaWasteExchange. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Awaiting your approval of a bid - indiawasteexchange.com',
    },
  },

  'buyer-order-approved': {
    sms: {
      message: 'Dear {buyerName}. Your order request has been accepted by {sellerName}. Please collect your order by the accepted timing. Thank You.',
    },
    email: {
      message:
        'Dear {buyerName} \n \t Your order request has been accepted by {sellerName}. Please collect your order by the accepted timing. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Awaiting seller approval of your bid - indiawasteexchange.com',
    },
  },

  'seller-order-approved': {
    sms: {
      message: 'Dear {sellerName}. You have accepted the order from {buyerName}. Please keep your order items ready by the accepted time. Thank you.',
    },
    email: {
      message:
        'Dear {sellerName} \n \t You have accepted the order from {buyerName}. Please keep your order items ready by the accepted time. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'You have approved a bid - indiawasteexchange.com',
    },
  },

  'buyer-order-declined': {
    sms: {
      message: 'Dear {buyerName}. Your order request has been declined by {sellerName}. Please contact seller for further information. Thank You.',
    },
    email: {
      message:
        'Dear {buyerName} \n \t Your order request has been declined by {sellerName}. Please contact seller for further information. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Your bid has been declined - indiawasteexchange.com',
    },
  },

  'seller-order-declined': {
    sms: {
      message: 'Dear {sellerName}. You have declined the order from {buyerName}... Thank you.',
    },
    email: {
      message:
        'Dear {sellerName} \n \t You have declined the order from {buyerName}. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'You have declined a bid - indiawasteexchange.com',
    },
  },

  'buyer-order-edited': {
    sms: {
      message: 'Dear {buyerName}. Your previous order request with {sellerName} has been updated. Thank You.',
    },
    email: {
      message:
        'Dear {buyerName} \n \t Your previous order request with {sellerName} has been updated. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Your bid has been updated - indiawasteexchange.com',
    },
  },

  'seller-order-edited': {
    sms: {
      message: 'Dear {sellerName}. {buyerName} has updated their order. Thank you.',
    },
    email: {
      message:
        'Dear {sellerName} \n \t {buyerName} has updated their order. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'You have declined a bid - indiawasteexchange.com',
    },
  },

  'buyer-order-cancelled': {
    sms: {
      message: 'Dear {buyerName}. You have cancelled the order request to {sellerName}. Thank You.',
    },
    email: {
      message:
        'Dear {buyerName} \n \t You have cancelled the order request to {sellerName}. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'Your bid has been updated - indiawasteexchange.com',
    },
  },

  'seller-order-cancelled': {
    sms: {
      message: 'Dear {sellerName}. {buyerName} has cancelled their order. Thank you.',
    },
    email: {
      message:
        'Dear {sellerName} \n \t {buyerName} has cancelled their order. Thank you. \n Thanks, \n IndiaWasteExchange Team.',
      subject: 'You have declined a bid - indiawasteexchange.com',
    },
  },
};
