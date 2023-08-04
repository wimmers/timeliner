import React, { createContext, useContext, useReducer } from 'react';
import {event, decks} from './Decks';

const pickNextEvent = (deck: event[], events: event[]): event => {
  let event = events[0];
  for (let i = 0; i < 1000; i++) {
    event = deck[Math.floor(Math.random()*deck.length)];
    if (!(events.includes(event))) {
      return event
    }
  }
  console.log("Lottery ran out of tries!");
  return event;
};

function stateReducer(state: any, action: any) {
  const {events, newEvent, settings} = state;
  switch (action.type) {
    case 'changeDeck': {
      const newDeck = action.deck;
      const events = [pickNextEvent(newDeck, [])];
      return {...state,
        settings: {...settings, deck: newDeck},
        events: events,
        newEvent: pickNextEvent(newDeck, events)
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
      events.splice(index + 1, 0, newEvent);
      return ({...state,
        events: [...events],
        newEvent: pickNextEvent(settings.deck, events),
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
  prompt: 'image',
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
      dispatch({type: 'changeDeck', deck: newSettings.deck});
    }
  }
}