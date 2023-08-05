import events0 from './events.json';
import events1 from './events1.json';
import inventions from './inventions.json';
import climate from './climate.json';
import fashion from './fashion.json';

export type event = {
  year: string | number,
  event: string,
  timestamp: number,
  difficulty?: number,
  url?: string,
  info?: string,
  thumbnailUrl?: string,
  misplaced?: boolean // only for app state
};

const fashionConverted = fashion.map(
  event => ({...event, timestamp: event.year}));

export const decks = [
  {"name": "Easy 1", "value": events0 as event[]},
  {"name": "Easy 2", "value": events1 as event[]},
  {"name": "Inventions", "value": inventions as event[]},
  {"name": "Climate Change", "value": climate as event[]},
  {"name": "Fashion", "value": fashionConverted as event[]}
];