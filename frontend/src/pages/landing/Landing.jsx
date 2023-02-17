import Footer from "../../components/footer/Footer";
import "./Landing.css";

export default function Landing() {
  return (
    <>
      <div className="b-shadow flex-grow-1 m-4 rounded bg-white text-center">
        <h1>PAGE LANDING</h1>
        <p>Test ICON :</p>
        <i className="icons-checked icons-size-30px" aria-hidden="true" />
      </div>
      <Footer />
    </>
  );
}
