import { pharmacy } from "@/lib/catalog";

const euro = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
});

export function formatEuro(amount: number): string {
  return euro.format(amount);
}

export function formatStock(stock: number): string {
  if (stock <= 0) {
    return "Tijdelijk uitverkocht";
  }
  if (stock <= 5) {
    return `Nog ${stock} op voorraad`;
  }
  return "Op voorraad";
}

export function formatAddress(): string {
  const { street, postalCode, city } = pharmacy.address;
  return `${street}, ${postalCode} ${city}`;
}

export function createOrderId(): string {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `AM-${n}`;
}
