import { Link } from "react-router-dom"
import { ACTIONS } from "../App";
import { sortData } from '../sortData'

export default function Navbar({ dispatch, state, setSortedArray, setButtonState, innerRef }) {
    return (
      <nav className="navbar navbar-dark bg-dark sticky-top" ref={innerRef}>
        <div className="container-fluid">
          <p className="navbar-brand mb-1 ms-3 h1">Sort Visualizer</p>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Sorting Algorithms</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvasDark" aria-label="Close"></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                {sortData.map((d, i) => {
                  return (
                    <li className="nav-item" key={i}>
                      <Link 
                        className={`nav-link ${state.sortSelected == i ? 'active' : ''}`} 
                        aria-current="page" 
                        to={d.url}
                        onClick={() => 
                          dispatch({ 
                            type: ACTIONS.CHANGE_SORT, 
                            payload: { 
                              n: state.n, 
                              setSortedArray: setSortedArray, 
                              setButtonState: setButtonState,
                              sortSelected: i
                            }
                          })
                        }>
                        {d.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>
        </div>
      </nav>
    );
}