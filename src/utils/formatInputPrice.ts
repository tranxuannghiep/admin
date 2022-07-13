export function formatPrice(price: string) {
  const regex = /^([,]?[0-9|.])+$/;
  if (price.length === 0) return "0";
  if (!regex.test(price)) return false;

  if (price.split(".")[1] && price.split(".")[1].length > 2) {
    return parseFloat(price).toFixed(2);
  }
  return price;
}
