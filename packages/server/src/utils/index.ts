export const centsToDollars = (costInCents: number): string => {
  const dollars = costInCents / 100;
  const formatted = dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatted;
};
