import { ACTIONS } from "../App";

export default function SortPage({ sortData, state, sortedArray, setSortedArray, setButtonState, canvas, buttonState, dispatch, setCanvas, children, innerRef }) {
  
  const sortButton =
    sortData.name == "Quick Sort" ? 
      <button 
        className="btn btn-outline-dark btn-md btn-block" 
        onClick={() => sortData.func(state, sortedArray, setSortedArray, setButtonState, canvas, true, 0, state.n - 1, 0)} 
        disabled={buttonState}
      >
        Sort
      </button> :
      <button
        className="btn btn-outline-dark btn-md btn-block"
        onClick={() => sortData.func(state, sortedArray, setSortedArray, setButtonState, canvas)}
        disabled={buttonState}
      >
        Sort
      </button>
    
    const compl = ["Average Complexity", "Best Case", "Worst Case", "Space Complexity"];

  return (
    <div key={sortData.name} className="info-container">
      <div className="container-fluid align-middle mt-3 mb-3" ref={innerRef}>
        <div className="row">
          <div className=" text-center col-xl-5 mb-xl-0 mb-3">
            <h1 className="sort-name display-3 fw-semibold">{sortData.name}</h1>
          </div>

          <div className="d-grid gap-1 col-xl-2 col-sm-4 mb-sm-0 mb-3">
            {sortButton} 

            <button
                className="btn btn-outline-dark btn-md btn-block"
                onClick={() => 
                  dispatch({ 
                    type: ACTIONS.SHUFFLE, 
                    payload: { 
                      n: state.n, 
                      setSortedArray: setSortedArray, 
                      setButtonState: setButtonState 
                    }
                  })
                }
              >
              Shuffle
            </button>
          </div>

          <div className="slider-container d-grid gap-2 col-xl-4 col-sm-8 col-12 ms-xl-4 ms-sm-0 ms-0">
            <div className="row align-items-center">
              <div className="col">
                <span>Elements</span>
              </div>

              <div className="col-7">
                <input
                  style={{marginTop: "8px"}}
                  id="n"
                  className="form-range"
                  type="range"
                  min="2"
                  max="70"
                  value={state.n}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.CHANGE_N,
                      payload: {
                        n: parseInt(e.target.value),
                        setSortedArray: setSortedArray,
                        setButtonState: setButtonState,
                        setCanvas: setCanvas,
                        canvas: canvas,
                      },
                    })
                  }
                ></input>
              </div>

              <div className="col">
                <span>{state.n}</span>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col">
                <span>Time</span>
              </div>

              <div className="col-7">
                <input
                  style={{marginTop: "8px"}}
                  id="time"
                  className="form-range"
                  type="range"
                  min="50"
                  max="500"
                  value={state.dur}
                  onChange={(e) =>
                    dispatch({
                      type: ACTIONS.CHANGE_TIME,
                      payload: parseInt(e.target.value),
                    })
                  }
                ></input>
              </div>

              <div className="col">
                <span style={{whiteSpace: "nowrap"}}>{`${state.dur} ms`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {children}

      <div className="info container-fluid ps-sm-5 pe-sm-5 ps-4 pe-4">
        <div className="row">
          <div className="col-lg-6 col-12">
            <h1 className="mb-4">Description</h1>
            {sortData.desc.map((d, i) => {
              return <p key={i}>{d}</p>
            })}
          </div>

          <div className="col-lg col-0">
          </div>

          <div className="col-lg-4 col-6 mt-lg-0 mt-3">
            <h1>Complexity</h1>

            <table className="table animate hidden">
              <tbody>
                {compl.map((d, i) => {
                  return (
                    <tr key={i}>
                      <td className="compl-name fw-semibold">{d}</td>
                      <td>{sortData.comp[i]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-md-0 col-6">
        </div>
      </div>
    </div>
  );
}
