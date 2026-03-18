export const validators = {
  required: (msg = "Bu maydon to'ldirilishi shart") => ({
    required: msg,
  }),

  email: {
    required: "Email kiritish shart",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Email formati noto'g'ri",
    },
  },

  password: {
    required: "Parol kiritish shart",
    minLength: {
      value: 6,
      message: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
    },
  },

  phone: {
    pattern: {
      value: /^\+998[0-9]{9}$/,
      message: "Telefon raqam formati: +998901234567",
    },
  },

  price: {
    required: "Narx kiritish shart",
    min: { value: 1, message: "Narx 0 dan katta bo'lishi kerak" },
  },

  quantity: {
    required: "Miqdor kiritish shart",
    min: { value: 1, message: "Miqdor kamida 1 bo'lishi kerak" },
  },
};
