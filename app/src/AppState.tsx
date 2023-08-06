import React, { createContext, useContext, useReducer } from 'react';
import {event, decks} from './Decks';

interface AppSettings {
  blinkTimeout: number,
  deck: event[],
  mode: 'three-lives' | 'forever',
  prompt: 'text' | 'image' | 'both',
}

interface AppState {
  wrong: number,
  right: number,
  streak: number,
  longestStreak?: number,
  streakHighscore?: number,
  rightHighscore?: number,
  backgroundColor: string,
  settings: AppSettings,
  unusedIndices: number[],
  gameOver: boolean,
  events: event[],
  newEvent?: event,
}

type AppAction =
| {type: 'updateSettings', settings: AppSettings}
| {type: 'resetStats'}
| {type: 'changeDeck', deck: event[]}
| {type: 'insert', index: number, event?: event}
| {type: 'wrong'}
| {type: 'resetColor'}

const pickNextEvent = (state: AppState): AppState => {
  const unusedIndices = state.unusedIndices as number[];
  if (unusedIndices.length === 0) {
    // Deck is finished, so game is won.
    return {...state,
      gameOver: true,
      longestStreak: Math.max(state.longestStreak || 0, state.streak),
    };
  }
  const i = Math.floor(Math.random()*unusedIndices.length);
  const index = unusedIndices[i];
  const event = state.settings.deck[index];
  unusedIndices.splice(i, 1);
  return ({
    ...state,
    newEvent: event,
  });
}

export function isCorrectlyPlaced
  (events: event[], newEvent: event | undefined, index: number): boolean
{
  if (!newEvent) {
    return false;
  }
  const ts = newEvent.timestamp;
  const before = events[index]?.timestamp;
  const after = events[index+1]?.timestamp;
  return ((!before || before <= ts) && (!after || ts <= after));
};

export function findPlacementIndex(state: AppState): number {
  const events = state.events;
  const newEvent = state.newEvent;
  for (let i = -1; i < events.length; i++) {
    if (isCorrectlyPlaced(events, newEvent, i)) {
      return i;
    }
  }
  return events.length;
}

function stateReducer(state: AppState, action: AppAction): AppState {
  const {events, newEvent, settings} = state;
  switch (action.type) {
    case 'changeDeck': {
      const newDeck = action.deck;
      const state1 = {...state,
        settings: {...settings, deck: newDeck},
        unusedIndices: newDeck.map((_, index) => index),
      }
      const state2 = pickNextEvent(state1);
      const firstEvent = state2.newEvent as event;
      return {...pickNextEvent(state2),
        events: [firstEvent],
      }
    }
    case 'resetStats': {
      return {...state,
        wrong: 0,
        right: 0,
        streak: 0,
        gameOver: false,
        longestStreak: 0,
        streakHighscore: Math.max(
          state.longestStreak || 0, state.streakHighscore || 0),
        rightHighscore: Math.max(state.right, state.rightHighscore || 0),
      }
    }
    case 'insert': {
      const index = action.index;;
      const event = (action.event || newEvent) as event;
      events.splice(index + 1, 0, event);
      return ({...pickNextEvent(state),
        events: [...events],
        backgroundColor: "green",
        right: state.right + 1,
        streak: state.streak + 1,
      });
    }
    case 'wrong': {
      let gameOver = state.gameOver;
      if (settings.mode === 'three-lives') {
        gameOver = gameOver || (3 - state.wrong < 2);
      }
      return {...state,
        backgroundColor: "red",
        streak: 0,
        wrong: state.wrong + 1,
        gameOver: gameOver,
        longestStreak: Math.max(state.longestStreak || 0, state.streak),
      };
    }
    case 'resetColor': {
      return {...state,
        backgroundColor: 'inherit'
      };
    }
    case 'updateSettings': {
      return {...state,
        settings: action.settings
      }
    }
  }
}

const initialSettings: AppSettings = {
  blinkTimeout: 150,
  deck: decks[0]["value"],
  mode: 'three-lives',
  prompt: 'both',
};

const initialState: AppState = {
  wrong: 0,
  right: 0,
  streak: 0,
  backgroundColor: 'inherit',
  settings: initialSettings,
  gameOver: false,
  events: [],
  unusedIndices: [],
};

const initializeState = (): AppState =>
  stateReducer(initialState, {
    type: 'changeDeck',
    deck: decks[0]["value"],
  });

const StateContext = createContext<AppState>(initialState);
const DispatchContext = createContext<React.Dispatch<AppAction> | null>(null);

export function StateProvider({children}: {children: React.ReactNode}) {
  const [state, dispatch] = useReducer(stateReducer, null, initializeState);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

export function useAppState() {
  return useContext(StateContext);
}

export function useDispatch() {
  const dispatch = useContext(DispatchContext);
  if (!dispatch) {
    throw "Dispatch is not initialized!";
  }
  return dispatch;
}

export function useAppSettings() {
  return useContext(StateContext).settings;
}

export function useUpdateSettings() {
  const state= useAppState();
  const dispatch = useDispatch();

  if (!dispatch) {
    console.error("Dispatch not initialized!");
    return () => {};
  }

  return (newSettings: AppSettings) => {
    dispatch({type: 'updateSettings', settings: newSettings});
    if (newSettings.deck !== state.settings.deck) {
      dispatch({type: 'resetStats'});
      dispatch({type: 'changeDeck', deck: newSettings.deck});
    }
  }
}