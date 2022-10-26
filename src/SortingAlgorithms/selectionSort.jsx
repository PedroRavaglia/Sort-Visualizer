import { colorTransition, swapSVG, swap, colors, resetColors } from '../App'

export default function selectionSort(state, sortedArray, setSortedArray, setButtonState, canvas) {
    setButtonState(1);
    resetColors(sortedArray);

    let iMin;
    let t = 0;

    for (let i=0; i<state.n-1; i++) {
        t = colorTransition(sortedArray[i], t, state.dur, colors.selected);

        iMin = i;
        for (let j=i+1; j<state.n; j++) {
            t = colorTransition(sortedArray[j], t, state.dur, colors.compare);

            if (sortedArray[j] < sortedArray[iMin]) {
                colorTransition(sortedArray[iMin], t, state.dur, colors.rec);
                iMin = j;
                t = colorTransition(sortedArray[iMin], t, state.dur, colors.selected);
            }
            else {
                t = colorTransition(sortedArray[j], t, state.dur, colors.rec);
            }
        }

        if (iMin != i) {
            t = colorTransition(sortedArray[i], t, state.dur, colors.selected);

            setSortedArray(swap(sortedArray, i, iMin));
            t = swapSVG(sortedArray, i, iMin, t, state.dur, canvas);

            colorTransition(sortedArray[iMin], t, state.dur, colors.rec);
            t = colorTransition(sortedArray[i], t, state.dur, colors.ordered);

        }
        else {
            t = colorTransition(sortedArray[i], t, state.dur, colors.ordered);
        }
    }

    t = colorTransition(sortedArray[state.n-1], t, state.dur, colors.ordered);

    setTimeout(() => {
        setButtonState(0);
    }, t)
}