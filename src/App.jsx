import { useState, useRef, useEffect, useReducer } from 'react'
import { Route, Routes, useLocation } from "react-router-dom"
import * as d3 from "d3"
import SortPage from './Components/SortPage'
import D3Canvas from './Components/D3Canvas'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { sortData } from './sortData'

export const ACTIONS = {
  CHANGE_N: 'change-n',
  CHANGE_TIME: 'change-time',
  SHUFFLE: 'shuffle',
  CHANGE_SORT: 'change-sort',
}

function reducer(state, { type, payload }) {
  let new_values=null;

  switch (type) {
    case ACTIONS.CHANGE_N:
      new_values = d3.shuffle(d3.range(1, payload.n+1));
      payload.setSortedArray(new_values);
      payload.setButtonState(0);
      d3.selectAll('line').remove();

      payload.setCanvas({
        ...payload.canvas,
        r_w: (payload.canvas.max_w - payload.canvas.r_s * (payload.n - 1)) / payload.n,
        y: set_y(payload.canvas.max_h, payload.n)
      })

      return {
        ...state,
        n: payload.n,
        y: set_y(state.max_h, payload.n),
        values: new_values,
        max_w: state.w - 2 * state.padding_w,
        r_w: (state.max_w - state.r_s * (payload.n-1)) / payload.n,
      }

    case ACTIONS.CHANGE_TIME:
      return {
        ...state,
        dur: payload,
      }

    case ACTIONS.SHUFFLE:
      new_values = d3.shuffle(d3.range(1, payload.n+1));
      payload.setSortedArray(new_values);
      payload.setButtonState(0);
      d3.selectAll('line').remove();

      return {
        ...state,
        values: new_values
      }

    case ACTIONS.CHANGE_SORT:
      if (payload.sortSelected == state.sortSelected)
        return state;

      new_values = d3.shuffle(d3.range(1, payload.n+1));
      payload.setSortedArray(new_values);
      payload.setButtonState(0);
      d3.selectAll('line').remove();

      return {
        ...state,
        values: new_values,
        sortSelected: payload.sortSelected
      }
  }
}

// colors for each algorithm step 
export const colors = {
  rec: '#69a3b2',
  selected: "red",
  selected_QS: "yellow",
  ordered: "rgb(255, 140, 0)",
  compare: "green",
  compare_QS: "red",
  greater: "purple",
  lesser: "green"
}

function set_y(max_h, n) {
  let y = d3.scaleLinear()
            .domain([1, n+1])
            .range([max_h/n, max_h]);
  return y;
}

export function colorTransition(id, delay, dur=0, color) {
  d3.select(`#rect-${id}`)
  .transition()
  .duration(0)
  .delay(delay)
  .attr("fill", color)

  return delay + dur;
}

export function swap(array, i, j) {
  let prov = array[i];
  array[i] = array[j];
  array[j] = prov;
  return array;
}

export function swapSVG(array, i, j, delay, dur, state) {
  const swap = [i, j];

  for (let ind of swap) {
    d3.select(`#rect-${array[ind]}`)
    .transition()
    .duration(dur)
    .delay(delay)
    .attr("x", d => state.padding_w + ind * (state.r_w + state.r_s));
  }

  return delay + dur;
}

export function resetColors(array) {
  array.forEach((d) => {
    d3.select(`#rect-${d}`)
    .transition()
    .duration(0)
    .delay(0)
    .attr("fill", colors.rec);
  })
}

export function drawLine(canvas, pivot, t, dur) {
  d3.select('svg')
  .append('line')
  .style("stroke", "black")
  .style("stroke-width", 2)
  .attr("x1", canvas.padding_w)
  .attr("y1", canvas.max_h - canvas.y(pivot) + canvas.padding_h)
  .attr("x2", canvas.padding_w + canvas.max_w)
  .attr("y2", canvas.max_h - canvas.y(pivot) + canvas.padding_h)
  .attr("opacity", 0)
  .attr("id", `line-${pivot}`);

  d3.select(`#line-${pivot}`)
  .transition()
  .duration(0)
  .delay(t)
  .attr("opacity", 1);
  return t + dur;
}

export function cleanLine(pivot, t) {
  d3.select(`#line-${pivot}`)
  .transition()
  .duration(0)
  .delay(t)
  .attr("opacity", 0);
}

function initElement(el) {
  const margin = "-100px";
  const top = el.dataset.ioTop ? el.dataset.ioTop : margin;
  const bottom = el.dataset.ioBottom ? el.dataset.ioBottom : margin;
  const rootMargin = top + " 0px " + bottom + " 0px";

  let options = {
    root: null,
    rootMargin: rootMargin,
    threshold: 0.01
  }

  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        el.classList.add("in-view");
        el.classList.remove("hidden");
      }
    })
  }, options); 

  observer.observe(el);
}

function App() {
  const initialState = {
    n: 10, // size of the array
    dur: 300, // duration between each animation step
  };
  initialState.values = d3.shuffle(d3.range(1, initialState.n + 1));

  let location = useLocation();
  sortData.forEach((d, i) => {
    if (location.pathname == "/")
      initialState.sortSelected = 0;
    else if(d.url == location.pathname) {
      initialState.sortSelected = i;
    }
  })

  const initialCanvas = {
    w: window.innerWidth-20,
    h: window.innerHeight,
    padding_h: 50,
  }
  initialCanvas.r_s = initialCanvas.w <= 576 ? 0 : 5; // space between rectangles
  initialCanvas.padding_w = initialCanvas.w <= 576 ? 10 : 50;
  initialCanvas.max_h = initialCanvas.h - 2 * initialCanvas.padding_h;
  initialCanvas.max_w = initialCanvas.w - 2 * initialCanvas.padding_w;
  initialCanvas.r_w = (initialCanvas.max_w - initialCanvas.r_s * (initialState.n - 1)) / initialState.n; // width of each rectangle
  initialCanvas.y = set_y(initialCanvas.max_h, initialState.n);

  const [state, dispatch] = useReducer(reducer, initialState);
  const [canvas, setCanvas] = useState(initialCanvas);
  const [sortedArray, setSortedArray] = useState(state.values);
  const [buttonState, setButtonState] = useState(0);

  let navBarRef = useRef();
  let sortPageRef = useRef();

  let sortPageObj = { state, sortedArray, setSortedArray, setButtonState, canvas, buttonState, dispatch, setCanvas };


  useEffect(() => {
    const targetElement = document.querySelector(".animate");
    initElement(targetElement);
  })

  useEffect(() => {
    function handleResize() {
      let h = window.innerHeight - navBarRef.current.clientHeight - sortPageRef.current.clientHeight - 32;
      h = h < 250 ? 300 : h;
      const w = window.innerWidth-20
      const padding_w =  w <= 576 ? 10 : 50;
      const max_h = h - 2 * canvas.padding_h;
      const max_w = w - 2 * padding_w;
      const r_s = w <= 576 ? 0 : 5;
      const r_w = (max_w - r_s * (state.n - 1)) / state.n;
      const y = set_y(max_h, state.n);
    
      setCanvas({
        ...canvas,
        w,
        h,
        padding_w,
        max_h,
        max_w,
        r_w,
        y,
        r_s
      })
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    sortPageObj = { state, sortedArray, setSortedArray, setButtonState, canvas, buttonState };

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [state.n, state.values]);

  return (
    <div className="App">
      <Navbar {...{dispatch, state, setSortedArray, setButtonState}} innerRef={navBarRef} />

      <Routes>
        <Route path="/" element={
          <SortPage {...{sortData: sortData[0], ...sortPageObj}} innerRef={sortPageRef}>
            <D3Canvas {...{state, canvas}} />
          </SortPage>
        }/>

        {sortData.map((d, i) => {
          return (
            <Route path={d.url} key={i} element={
              <SortPage {...{sortData: d, ...sortPageObj}} innerRef={sortPageRef}>
                <D3Canvas {...{state, canvas}}/>
              </SortPage>
            }/>
          )
        })}
      </Routes>

      <Footer />
    </div>
  )
}

export default App
