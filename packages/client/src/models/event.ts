//type category = "it" | "marketing" | ""

export interface Event {
  id?: string; // should be the same id as what firebase creates for the event
  topic: string;
  location: string;
  price: number;
  startTime: Date;
  endTime?: Date;
  interestedCategories: string[];
  status?: string;
  image?: string |undefined;
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
    interestedCategories: [],
    status: "",
    price: 0,
    image: "",
  };

  return { ...defaults, ...event };
}
