const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const LARGE_NUMBER_THRESHOLD = 100_000_000;

export function formatCurrency(value, options = {}) {
  const {
    threshold = LARGE_NUMBER_THRESHOLD,
    maxDecimalsM = 1,
    maxDecimalsB = 1,
    maxDecimalsT = 1,
  } = options;

  const num = Number(value) || 0;

  if (num <= threshold) {
    return currencyFormatter.format(num);
  }

  if (num >= 1e12) {
    const trillions = num / 1e12;
    const formatted =
      trillions % 1 === 0
        ? trillions.toFixed(0)
        : trillions.toLocaleString("en-US", {
            maximumFractionDigits: maxDecimalsT,
            minimumFractionDigits: 0,
          });
    return `$${formatted}T`;
  }

  if (num >= 1e9) {
    const billions = num / 1e9;
    const formatted =
      billions % 1 === 0
        ? billions.toFixed(0)
        : billions.toLocaleString("en-US", {
            maximumFractionDigits: maxDecimalsB,
            minimumFractionDigits: 0,
          });
    return `$${formatted}B`;
  }

  const millions = num / 1e6;
  const formatted =
    millions % 1 === 0
      ? millions.toFixed(0)
      : millions.toLocaleString("en-US", {
          maximumFractionDigits: maxDecimalsM,
          minimumFractionDigits: 0,
        });
  return `$${formatted}M`;
}

export { currencyFormatter };
