import { colorTransition, swapSVG, swap, colors, resetColors, drawLine,cleanLine } from '../App'

function partition(array, low, high, t, state, setSortedArray, canvas) {

    let pivot = array[high];

    if (high - low == 0) {
        t = colorTransition(pivot, t, 2*state.dur, colors.ordered);
        return [low, t];
    }

    // Index of smaller element and indicates the right position of pivot found so far
    let i = low - 1;
    let rect_mod = [];

    colorTransition(pivot, t, state.dur, colors.selected_QS);
    t = drawLine(canvas, pivot, t, state.dur);

    for (let j = low; j <= high-1; j++) {
        t = colorTransition(array[j], t, state.dur, colors.compare_QS);

        if (array[j] < pivot) {
            i++;
            setSortedArray(swap(array, i, j));
            t = swapSVG(array, i, j, t, state.dur, canvas);
            t = colorTransition(array[i], t, state.dur, colors.lesser);
            rect_mod.push(array[i]);
        }

        else if (array[j] > pivot) {
            t = colorTransition(array[j], t, state.dur, colors.greater);
            rect_mod.push(array[j]);
        }
    }

    cleanLine(pivot, t);
    setSortedArray(swap(array, i+1, high));
    t = swapSVG(array, i+1, high, t, 1.5*state.dur, canvas) + state.dur;

    rect_mod.forEach((d) => {
        colorTransition(d, t, state.dur, colors.rec);
    })
    t = colorTransition(pivot, t, state.dur, colors.ordered);

    return [i+1, t];
}


export default function quickSort(state, sortedArray, setSortedArray, setButtonState, canvas, first_call=false, low, high, t) {
    if (first_call) {
        resetColors(sortedArray);
        setButtonState(1);
    }

    if (low <= high) {
        let pi = partition(sortedArray, low, high, t, state, setSortedArray, canvas);
        t = quickSort(state, sortedArray, setSortedArray, setButtonState, canvas, false, low, pi[0] - 1, pi[1]);
        t = quickSort(state, sortedArray, setSortedArray, setButtonState, canvas, false, pi[0] + 1, high, t);
    }

    if (first_call) {
        setTimeout(() => {
            setButtonState(0);
        }, t)
    }

    return t;
}