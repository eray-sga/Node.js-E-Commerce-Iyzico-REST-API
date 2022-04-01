import Iyzipay, { LOCALE, REFUND_REASON } from "iyzipay";
import * as Cards from "./methods/cards";
import * as Installments from "./methods/installments";
import * as Payments from "./methods/payments";
import * as PaymentsThreeDS from "./methods/threeds-payments";
import * as Checkouts from "./methods/checkouts";
import * as CancelPayments from "./methods/cancel-payments";
import * as RefundPayments from "./methods/refund-payments";
import nanoid from "../../utils/nanoid";
import * as Logs from "../../utils/logs";

/* ---------------------------------------- */
/* a) CARDS */
/* ---------------------------------------- */

//Bir kullanıcı ve kart oluştur
const createUserAndCards = () => {
  Cards.createUserCard({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    email: "email@email.com",
    externalId: nanoid(),
    card: {
      cardAlias: "Kredi Kartım",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
    },
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("1-cards-kullanici-ve-kart-olustur", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("1-cards-kullanici-ve-kart-olustur-hata", err);
    });
};

//Bir kullanıcıya yeni bir kart ekle
const createCardForAUser = () => {
  Cards.createUserCard({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    email: "email@email.com",
    externalId: nanoid(),
    cardUserKey: "Mlze+9URe9HZAgi4WuR9d22BIuY=",
    card: {
      cardAlias: "Kredi Kartım",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
    },
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("2-cards-bir-kullaniciya-kart-ekle", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("2-cards-bir-kullaniciya-kart-ekle-hata", err);
    });
};

//Bir kullanıcının kartlarını oku
const readCardsOfAUser = () => {
  Cards.getUserCards({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    cardUserKey: "Mlze+9URe9HZAgi4WuR9d22BIuY=",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("3-cards-bir-kullanicinin-kartlarini-oku", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("3-cards-bir-kullanicinin-kartlarini-oku-hata", err);
    });
};

//bir kullanıcının bir kartını sil

const deleteCardOfAUser = () => {
  Cards.deleteUserCard({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    cardUserKey: "Mlze+9URe9HZAgi4WuR9d22BIuY=",
    cardToken: "u37XCrD0qVa2oFm7n8uBcO8Fsjw=",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("4-cards-bir-kullanicinin-kartini-sil", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("4-cards-bir-kullanicinin-kartini-sil-hata", err);
    });
};

/* ---------------------------------------- */
/* b) INSTALLMENTS */
/* ---------------------------------------- */

// Bir kart ve ücretle ilgili gerçekleşebilecek taksitlerin kontrolü
const checkInstallments = () => {
  return Installments.checkInstallment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    binNumber: "552879",
    price: "1000",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("5-installments-bir-kart-ve-ucret-taksit-kontrolu", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("5-installments-bir-kart-ve-ucret-taksit-kontrolu", err);
    });
};

//checkInstallments()

/* ---------------------------------------- */
/* b) NORMAL PAYMENTS */
/* ---------------------------------------- */

//Kayıtlı olmayan kartla ödeme yapmak ve kartı kaydetme

const createPayment = () => {
  return Payments.createPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "8675dl",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0",
    },
    buyer: {
      id: "123141",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905055679807",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Bilmemne Mah, bilmemne sk.",
      ip: "85.35.78.122",
      city: "İstanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "iOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },
      {
        id: "BT103",
        name: "Samsung S10",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile(
        "6-payments-yeni-bir-kartla-odeme-al-ve-karti-kaydetme",
        result
      );
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile(
        "6-payments-yeni-bir-kartla-odeme-al-ve-karti-kaydetme",
        err
      );
    });
};

//Bir kredi kartıyla ödeme yap ve kartı kaydet
const createPaymentAndSaveCard = () => {
  return Payments.createPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "8675dl",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "Mlze+9URe9HZAgi4WuR9d22BIuY=",
      cardAlias: "Kredi Kartım Ödemeden Sonra",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "1",
    },
    buyer: {
      id: "123141",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905055679807",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Bilmemne Mah, bilmemne sk.",
      ip: "85.35.78.122",
      city: "İstanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "iOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },
      {
        id: "BT103",
        name: "Samsung S10",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile(
        "7-payments-yeni-bir-kartla-odeme-al-ve-karti-kaydet",
        result
      );
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("7-payments-yeni-bir-kartla-odeme-al-ve-karti-kaydet", err);
    });
};

//Bir kayıtlı kart ile ödeme yap
const createPaymentWithSavedCard = () => {
  return Payments.createPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "8675dl",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardUserKey: "Mlze+9URe9HZAgi4WuR9d22BIuY=",
      cardToken: "0FAFviKxKSemxf+nAIHlEROl4Q4=",
    },
    buyer: {
      id: "123141",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905055679807",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Bilmemne Mah, bilmemne sk.",
      ip: "85.35.78.122",
      city: "İstanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "iOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },
      {
        id: "BT103",
        name: "Samsung S10",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("8-payments-kayitli-bir-kartla-odeme-al", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("8-payments-kayitli-bir-kartla-odeme-al-hata", err);
    });
};

/* ---------------------------------------- */
/* e) 3D Secure Payments */
/* ---------------------------------------- */

const initializeThreeDSPayments = () => {
  PaymentsThreeDS.initializePayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "8675dl",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "0",
    },
    buyer: {
      id: "123141",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905055679807",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Bilmemne Mah, bilmemne sk.",
      ip: "85.35.78.122",
      city: "İstanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "iOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },
      {
        id: "BT103",
        name: "Samsung S10",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("9-threeds-payments-yeni-bir-kartla-odeme-al", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("9-threeds-payments-yeni-bir-kartla-odeme-al-hata", err);
    });
};

//ödemeyi 3ds ile tamamlama
const completeThreeDSPayment = () => {
  PaymentsThreeDS.completePayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    paymentId: "12132314",
    conversationData: "conversation data",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("10-threeds-payments-odeme-tamamla", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("10-threeds-payments-odeme-tamamla-hata", err);
    });
};

//3ds ödemesini hali hazırdaki kayıtlı
const initializeThreeDSPaymentsWithRegisteredCard = () => {
  PaymentsThreeDS.initializePayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "8675dl",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardUserKey: "Mlze+9URe9HZAgi4WuR9d22BIuY=",
      cardToken: "0FAFviKxKSemxf+nAIHlEROl4Q4=",
    },
    buyer: {
      id: "123141",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905055679807",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Bilmemne Mah, bilmemne sk.",
      ip: "85.35.78.122",
      city: "İstanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "iOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },
      {
        id: "BT103",
        name: "Samsung S10",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("11-threeds-payments-kayitli-bir-kart", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("11-threeds-payments-kayitli-bir-kart-hata", err);
    });
};

//3ds ödemesini hali hazırdaki kayıtlı
const initializeThreeDSPaymentsWithNewCardAndRegister = () => {
  PaymentsThreeDS.initializePayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "8675dl",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/payment/3ds/complete",
    paymentCard: {
      cardUserKey: "Mlze+9URe9HZAgi4WuR9d22BIuY=",
      cardAlias: "Kredi Kartım Ödemeden Sonra",
      cardHolderName: "John Doe",
      cardNumber: "5528790000000008",
      expireMonth: "12",
      expireYear: "2030",
      cvc: "123",
      registerCard: "1",
    },
    buyer: {
      id: "123141",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905055679807",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Bilmemne Mah, bilmemne sk.",
      ip: "85.35.78.122",
      city: "İstanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "iOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },
      {
        id: "BT103",
        name: "Samsung S10",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("12-threeds-payments-kayitli-bir-kart", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("12-threeds-payments-kayitli-bir-kart-hata", err);
    });
};

/* ---------------------------------------- */
/* f) Checkout Form */
/* ---------------------------------------- */

//Checkout form içinde ödeme başlat

const initializeCheckoutForm = () => {
  Checkouts.initialize({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: "300",
    paidPrice: "300",
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: "8675dl",
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    callbackUrl: "https://localhost/api/checkout/complete/payment",
    cardUserKey: "Mlze+9URe9HZAgi4WuR9d22BIuY=",
    enabledInstallments: [1, 2, 3, 6, 9],
    buyer: {
      id: "123141",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905055679807",
      email: "email@email.com",
      identityNumber: "743008664791",
      lastLoginDate: "2020-10-05 12:43:35",
      registrationDate: "2020-10-04 12:43:35",
      registrationAddress: "Bilmemne Mah, bilmemne sk.",
      ip: "85.35.78.122",
      city: "İstanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    billingAddress: {
      contactName: "John Doe",
      city: "İstanbul",
      country: "Turkey",
      address: "Bilmemne Mah, bilmemne sk.",
      zipCode: "34745",
    },
    basketItems: [
      {
        id: "BT101",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 90,
      },
      {
        id: "BT102",
        name: "Samsung S20",
        category1: "Telefonlar",
        category2: "iOS Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 150,
      },
      {
        id: "BT103",
        name: "Samsung S10",
        category1: "Telefonlar",
        category2: "Android Telefonlar",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: 60,
      },
    ],
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("13-checkout-form-payments", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("13-checkout-form-payments-hata", err);
    });
};

//tamamlanmış veya tamamlanmamış ödeme checkout form ödeme bilgisini verir.
const getFormPayment = () => {
  Checkouts.getFormPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    token: "f78cf722-97e1-486b-8f0d-0ebd1a3427ef",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("14-checkout-form-payments-get-details", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("14-checkout-form-payments-get-details-hata", err);
    });
};

/* ---------------------------------------- */
/* g) CANCEL PAYMENTS */
/* ---------------------------------------- */

//ÖDEMEYİ İPTAL ETME TESTİ
const cancelPayments = () => {
  CancelPayments.cancelPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    paymentId: "17068865",
    ip: "85.72.89.789",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("15-cancel-payments", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("15-cancel-payments-hata", err);
    });
};

//ÖDEMEYİ İPTAL ETME TESTİ
const cancelPaymentsWithreason = () => {
  CancelPayments.cancelPayment({
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    paymentId: "17068865",
    ip: "85.72.89.789",
    reason: Iyzipay.REFUND_REASON.BUYER_REQUEST,
    description: "Kullanıcı isteğiyle iptal edildi",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("16-cancel-payments-reason", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("16-cancel-payments-reason-hata", err);
    });
};

/* ---------------------------------------- */
/* h) REFUND PAYMENTS */
/* ---------------------------------------- */

//Ödemenin belirli bir parçasını iade et
const refundPayment = () => {
  RefundPayments.refundPayments({ 
      locale: Iyzipay.LOCALE.TR,
      conversationId: nanoid(),
      paymentTransactionId: "35556789",
      price: "60",
      currency: Iyzipay.CURRENCY.TRY,
      ip: "85.72.89.789",
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("17-refund-payments-reason", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("17-refund-payments-reason-hata", err);
    });
};

//ödemenin bir kısmını neden ve açıklama ile iade et
const refundPaymentWithreason = () => {
  RefundPayments.refundPayments({ 
      locale: Iyzipay.LOCALE.TR,
      conversationId: nanoid(),
      paymentTransactionId: "35556789",
      price: "60",
      currency: Iyzipay.CURRENCY.TRY,
      ip: "85.72.89.789",
      reason: Iyzipay.REFUND_REASON.BUYER_REQUEST,
      description: "Kullanıcı iade istedi"
  })
    .then((result) => {
      console.log(result);
      Logs.logFile("18-refund-payments-with-reason", result);
    })
    .catch((err) => {
      console.log(err);
      Logs.logFile("18-refund-payments-with-reason-hata", err);
    });
};