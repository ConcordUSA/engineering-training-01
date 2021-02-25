import moment from "moment";

export type Category = "it" | "marketing" | "finance" | "leadership";

export const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export interface IEvent {
  id?: string; // should be the same id as what firebase creates for the event
  topic: string;
  location: string;
  price: number;
  startTime: Date;
  endTime?: Date;
  categories: Category[];
  status?: string;
  image?: string | undefined;
  description: string;
  totalRevenue?: number;
}

export interface IFilter {
  topic?: string;
  catagories?: Category[];
  location?: string;
}

/**
 * Creates an event and defines defaults for all optional/not-provided keys
 */
export function EventFactory(event?: Partial<IEvent>): IEvent {
  const defaults: IEvent = {
    topic: "",
    location: "",
    startTime: new Date(),
    endTime: new Date(),
    categories: [],
    status: "",
    price: 0,
    image: "",
    description: "",
    totalRevenue: 0,
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
  return moment(date).format("MMM D h:mm a");
}

export function displayEventTime(time) {
  return new Date(time).toTimeString();
}
