import { colorTransition, swapSVG, swap, colors, resetColors } from "../App";

export default function bubbleSort(state, sortedArray, setSortedArray, setButtonState, canvas) {
  setButtonState(1);
  resetColors(sortedArray);

  let swapped;
  let t = 0;

  for (let i = 0; i < state.n - 1; i++) {
    swapped = false;

    for (let j = 0; j < state.n - 1 - i; j++) {
      colorTransition(sortedArray[j], t, state.dur, colors.compare);
      t = colorTransition(sortedArray[j + 1], t, state.dur, colors.compare);

      if (sortedArray[j] > sortedArray[j + 1]) {
        setSortedArray(swap(sortedArray, j, j + 1));
        swapped = true;

        t = swapSVG(sortedArray, j, j + 1, t, state.dur, canvas);
      }

      colorTransition(sortedArray[j], t, state.dur, colors.rec);
      colorTransition(sortedArray[j + 1], t, state.dur, colors.rec);
    }
    colorTransition(sortedArray[state.n - i - 1], t, state.dur, colors.ordered);

    if (!swapped) {
      sortedArray.forEach((d) => {
        colorTransition(d, t, state.dur, colors.ordered);
      });
      break;
    }
  }
  colorTransition(1, t, state.dur, colors.ordered);

  setTimeout(() => {
    setButtonState(0);
  }, t);
}
