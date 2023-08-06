import React, { createContext, useContext, useReducer } from 'react';
import {event, decks} from './Decks';

const pickNextEvent = (state: any) => {
  const unusedIndices = state.unusedIndices as number[];
  if (unusedIndices.length === 0) {
    return {...state,
      gameOver: true,
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
  (events: event[], newEvent: event, index: number): boolean
{
  const ts = newEvent.timestamp;
  const before = events[index]?.timestamp;
  const after = events[index+1]?.timestamp;
  return ((!before || before <= ts) && (!after || ts <= after));
};

export function findPlacementIndex(state: any): number {
  const events = state.events;
  const newEvent = state.newEvent;
  for (let i = -1; i < events.length; i++) {
    if (isCorrectlyPlaced(events, newEvent, i)) {
      return i;
    }
  }
  return events.length;
}

function stateReducer(state: any, action: any) {
  const {events, newEvent, settings} = state;
  switch (action.type) {
    case 'changeDeck': {
      const newDeck = action.deck as event[];
      const state1 = {...state,
        settings: {...settings, deck: newDeck},
        unusedIndices: newDeck.map((_, index) => index),
      }
      const state2 = pickNextEvent(state1);
      const firstEvent = state2.newEvent;
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
      const event = action.event || newEvent;
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

const initialSettings = {
  blinkTimeout: 150,
  deck: decks[0]["value"],
  mode: 'three-lives',
  prompt: 'both',
};

const initialState = {
  wrong: 0,
  right: 0,
  streak: 0,
  backgroundColor: 'inherit',
  settings: initialSettings,
};

const initializeState = () =>
  stateReducer(initialState, {
    type: 'changeDeck',
    deck: decks[0]["value"],
  });

const StateContext = createContext({settings: {}});
const DispatchContext = createContext<React.Dispatch<any> | null>(null);

export function StateProvider({children}: {children: any}) {
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
  return useContext(DispatchContext);
}

export function useAppSettings() {
  return useContext(StateContext).settings;
}

export function useUpdateSettings() {
  const state: any = useAppState();
  const dispatch: any = useDispatch();

  return (newSettings: any) => {
    dispatch({type: 'updateSettings', settings: newSettings});
    if (newSettings.deck !== state.settings.deck) {
      dispatch({type: 'resetStats'});
      dispatch({type: 'changeDeck', deck: newSettings.deck});
    }
  }
}