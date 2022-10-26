import { colorTransition, swapSVG, swap, colors, resetColors } from '../App'

export default function insertionSort(state, sortedArray, setSortedArray, setButtonState, canvas) {
    setButtonState(1);
    resetColors(sortedArray);

    let key, j;
    let t = 0;

    t = colorTransition(sortedArray[0], t, state.dur, colors.ordered);

    for (let i=1; i<state.n; i++) {
        key = sortedArray[i];
        j = i - 1;
        t = colorTransition(key, t, state.dur, colors.selected);

        while (j >= 0 && key < sortedArray[j]) {
            t = colorTransition(sortedArray[j], t, state.dur, colors.compare);
            colorTransition(sortedArray[j], t, state.dur, colors.ordered);

            setSortedArray(swap(sortedArray, j, j+1));
            t = swapSVG(sortedArray, j, j+1, t, state.dur, canvas);

            j--;
        }
        t = colorTransition(key, t, state.dur, colors.ordered);
    }

    setTimeout(() => {
        setButtonState(0);
    }, t)
}