import "./Footer.css";

function Footer() {
  return (
    <footer className="mastfooter bg-gray footer">
      <div className="container d-flex flex-column">
        <div className="order-3 row text-sm gt-5 gb-6 font-weight-medium justify-content-center">
          <div className="col-12 col-md-3 gt-5 gt-md-0">
            <div className="pb-2 text-white text-center">Suivez-nous :</div>
            <ul className="d-flex list-unstyled mb-0 justify-content-center flex-wrap">
              <li className="pr-2">
                <button type="button" className="btn-rounded btn-color-footer">
                  <span className="sr-only">Share with Twitter</span>
                  <i className="icons-twitter" aria-hidden="true" />
                </button>
              </li>
              <li className="pr-2">
                <button type="button" className="btn-rounded btn-color-footer">
                  <span className="sr-only">Share with FaceBook</span>
                  <i className="icons-facebook" aria-hidden="true" />
                </button>
              </li>
              <li>
                <button type="button" className="btn-rounded btn-color-footer">
                  <span className="sr-only">Share with LinkedIn</span>
                  <i className="icons-instagram" aria-hidden="true" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
