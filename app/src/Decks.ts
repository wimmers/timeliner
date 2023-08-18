import events0 from './events.json';
import events1 from './events1.json';
import inventions from './inventions.json';
import climate from './climate.json';
import fashion from './fashion.json';
// import veganism from './veganism.json';
import architecture from './architecture.json';

type pre_event = {
  year: string | number,
  approximate?: boolean,
  event: string,
  timestamp?: number,
  difficulty?: number,
  url?: string,
  info?: string,
  thumbnailUrl?: string,
  misplaced?: boolean // only for app state
};

export type event = pre_event & {
  timestamp: number
}

export const convert = (deck: pre_event[]): event[] =>
  deck.map(event => {
    if (event.timestamp) {
      return event as event;
    }
    if (typeof event.year === 'string') {
      throw new Error(`Cannot convert string to timestamp: ${event.year}`);
    }
    return {...event, timestamp: event.year}
  });

export type pre_deck = {
  name: string,
  info?: string,
  events: pre_event[]
}

export type deck = pre_deck & {
  events: event[]
}

const meta_decks: pre_deck[] = [
];

export const convert_deck = (deck: pre_deck): deck => ({
  ...deck,
  events: convert(deck.events)
})

export const decks: deck[] = [...meta_decks.map(convert_deck),
  {"name": "Easy 1", "events": events0},
  {"name": "Easy 2", "events": events1},
  {"name": "Inventions", "events": inventions},
  {"name": "Climate Change", "events": convert(climate)},
  // {"name": "Veganism", "events": convert(veganism)},
  {"name": "Architecture", "events": convert(architecture)},
];