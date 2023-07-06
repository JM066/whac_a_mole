# Whac-a-Mole Game

Welcome to my Simple Whac-a-Mole Game!
This interactive game features 24 mole houses arranged as depicted below. Up to 5 moles pop up randomly and will be visible through the background color. The players can gain points by clicking on the active moles as they appear. The game spans a duration of 60 seconds.

![Screenshot](./src/whac_a_mole.png)

**Note:** No styling! only functional!

# User Story

- The player initiates the game by hitting the 'start' button, which triggers the moles to appear randomly.
- A countdown timer is displayed, starting from 60 seconds.
- Players accumulate points by clicking on active moles, incrementing the score.
- The game ends once the countdown reaches zero.
- To play again, simply hit the 'start' button again.

# Installation

1. Download the game
2. Run `npm install` to install.
3. To run the tests, run `npm test`.

## 1. Game Development Breakdown

To avoid repetitions and re-renders, I broke the game down into several components:

1. Main component/page - Game Board the App page.
2. Mole component - Multiple instances required
3. Game Logic Handler - A component that manages all the game logic
4. Time component - This has to be a standalone component and it needs to re-render every second

### 2. Game Board Design

The gmae board is made up of 24 mole houses. I used an array containing subarrays to create rows, which are displayed using "flex".

```js
export const GAMEBOARD_ROWS = [
  [0, 1],
  [2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11],
  [12, 13, 14, 15, 16, 17],
  [18, 19, 20, 21],
  [22, 23],
];
```

```jsx
{
  GAMEBOARD_ROWS.map((row, rowIndex) => (
    <div key={`row-${rowIndex}`} className="row">
      {row.map((active, activeIndex) => (
        <Mole
          key={`mole-${activeIndex}`}
          active={moles[active]}
          onClick={handleClick}
          activeValue={active}
        />
      ))}
    </div>
  ));
}
```

## 3. Mole Component

Each Mole component is unique and can be identified through its index. If the moles[index] is "true" (meaning it's currently visible), clicking on it will increase the player's score and make that mole disappear. However, if the mole is already "false" (not visible), clicking on it doesn't have any effect. To optimize application performance, I've chosen to utilize the useReducer hook instead of managing moles and score states with separate useState hooks. The useReducer hook allows me to handle these states within a single update function. This strategy significantly reduces the number of component re-renders, enhancing both the performance and readability of the code."

```js
const handleClick = (index: number) => {
  dispatch({ type: "deactive", index });
};

export default function reducer(
  state: StateType,
  action: ActionType
): StateType {
  let newMoles;
  switch (action.type) {
    case "deactive":
      if (state.moles[action.index]) {
        newMoles = [...state.moles];
        newMoles[action.index] = false;
        return { score: state.score + 1, moles: newMoles };
      }
      return state;
    case "activate":
      newMoles = [...state.moles];
      newMoles[action.index] = true;
      return { ...state, moles: newMoles };
    default:
      throw new Error("Unexpected action");
  }
}
```

## 4. Game Initiation

The game begins when the 'start' button is clicked, triggering a state change in isStarted from false to true and thus loading the Game component.

```jsx
<Button className="start" onClick={handleStart}>
  {isStarted && <Game state={state} dispatch={dispatch} />}
  Start
</Button>
```

## 5. Timer Functionality

On clicking the 'start' button and the change of isStarted state to true, the Time component loads. This component requires its own render, as it needs to update and display the current remaining time every second.
.

## 6. Game Conclusion

The timer component uses the useTimer hook, where the countdown logic resides. This hook accepts a callback function and delay value as arguments. As it loads, it triggers the handleTimer function every second using setInterval. It also monitors the time state and saves the current time value in local storage. Once the countdown hits zero, the callback function executes, calling setIsStarted with false.

## 7. Game Functionality

The Game component handles generating random moles and updating the moles state. Upon loading, it executes the generateAndUpdateRandomMole function every 1000ms. This function checks if there are more than 5 active moles. If not, it generates a random index number smaller than the moles array length, and updates the corresponding mole state to true. It also toggles the state back to false after 1-3 seconds to maintain.

The useCallback hook is used in the generateAndUpdateRandomMole function. This enables the function to memorize its calculations, ensuring consistent performance even when called multiple times.

```js
const generateAndUpdateRandomMole = useCallback(() => {
  const activeMoles = state.moles.filter((mole) => mole).length;
  if (activeMoles >= 5) return;
  const index = Math.floor(Math.random() * state.moles.length);
  dispatch({ type: "activate", index });

  setTimeout(() => {
    dispatch({ type: "activate", index });
  }, 1000 * Math.random() * 2 + 1);
}, [state, dispatch]);
```

## 8. Clean Up Process

When a component is dismounted or removed, the timers (setTimeout, setInterval) are cancelled to prevent them from continuing to run in the background.
