export type Category = "it" | "marketing" | "finance" | "leadership";

export interface Event {
  id?: string; // should be the same id as what firebase creates for the event
  topic: string;
  location: string;
  price: number;
  startTime: Date;
  endTime?: Date;
  categories: string[];
  status?: string;
  image?: string | undefined;
  description: string;
}

/**
 * Creates an event and defines defaults for all optional/not-provided keys
 */
export function EventFactory(event?: Event): Event {
  const defaults: Event = {
    topic: "",
    location: "",
    startTime: new Date(),
    endTime: new Date(),
    categories: [],
    status: "",
    price: 0,
    image: "",
    description: "",
  };

  return { ...defaults, ...event };
}

export function formatCentsToCurrency(
  cents: number,
  locale: string = "en-US",
  currency: string = "USD"
) {
  const value = cents / 100;
  return value.toLocaleString(locale, {
    style: "currency",
    currency,
  });
}

export function displayEventDate(date) {
  return new Date(date).toDateString();
}

export function displayEventTime(time) {
  return new Date(time).toTimeString();
}
