/**
 * Formats a number as Uzbek So'm currency.
 * @param {number} amount
 * @param {boolean} [compact=false] – show 1.2M / 15K format
 * @returns {string}
 */
export const formatCurrency = (amount, compact = false) => {
  if (amount === null || amount === undefined) return '';

  if (compact) {
    if (amount >= 1_000_000) return `${(amount / 1_000_000).toFixed(1)} mln so'm`;
    if (amount >= 1_000)     return `${(amount / 1_000).toFixed(0)} ming so'm`;
  }

  return new Intl.NumberFormat('uz-UZ', {
    style: 'decimal',
    maximumFractionDigits: 0,
  }).format(amount) + " so'm";
};

/**
 * Formats a date string for display.
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('uz-UZ', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(date));
};
