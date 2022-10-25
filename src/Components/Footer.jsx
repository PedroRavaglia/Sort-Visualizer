
export default function Footer() {
    return (
      <footer className="bg-dark text-lg-start mt-5">
        <div className="container-fluid p-3">
          <div className="row align-items-center">
            <div className="col-7">
              <p className="text-light mt-3 ms-3">Made by <b>Pedro Ravaglia</b></p>
            </div>

            <div className="col-5 mt-1 pe-md-5 pe-2">
              <a href="https://github.com/PedroRavaglia" target="_blank" className="btn btn-outline-light btn-floating m-1 float-end" role="button">
                <i className="fab fa-github"></i>
              </a>

              <a href="https://www.linkedin.com/in/pedroravaglia/" target="_blank" className="btn btn-outline-light btn-floating m-1 float-end" role="button">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
}