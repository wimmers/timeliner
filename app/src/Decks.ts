import events0 from './events.json';
import events1 from './events1.json';
import inventions from './inventions.json';
import climate from './climate.json';

export type event = {
  year: string | number,
  event: string,
  timestamp: number,
  difficulty?: number
};

export const decks = [
  {"name": "Basic", "value": events0 as event[]},
  {"name": "Basic 1", "value": events1 as event[]},
  {"name": "Inventions", "value": inventions as event[]},
  {"name": "Climate Change", "value": climate as event[]}
];