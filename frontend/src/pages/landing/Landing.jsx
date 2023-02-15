export default function Landing() {
  const handleclick = () => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsInVzZXJSb2xlIjoidXNlciIsInVzZXJTdGF0ZSI6MSwiaWF0IjoxNjc2NDE0MTIxLCJleHAiOjE2NzY1MDA1MjF9._JiRl-zBINxA7Nsfjqd0Xgnf6H3LsWdMntLqhvO05G0"
    );
  };
  return (
    <div>
      <h1>PAGE LANDING</h1>
      <p>Test ICON :</p>
      <i className="icons-checked icons-size-30px" aria-hidden="true" />
      <button type="button" onClick={handleclick}>
        TOKEN
      </button>
    </div>
  );
}
