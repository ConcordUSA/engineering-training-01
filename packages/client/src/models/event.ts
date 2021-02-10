//type category = "it" | "marketing" | ""

export interface Event {
  id?: string | undefined;
  topic: string;
  location: string;
  date: Date;
  time?: Date; // TODO: Deprecated like a beast
  category: string[];
  status?: string;
  price: number;
  image?: string;
}

export function EventFactory(event: Event): Event {
  const defaults: Event = {
    id: undefined,
    topic: "",
    location: "",
    date: new Date(),
    time: new Date(),
    category: [],
    status: "",
    price: 0,
    image: "",
  };
  return { ...defaults, ...event };
}
