import "./homepage.css";

const SignUp = () => {
  // Loading text animation

  return (
    <div className="home-container">
      <header>
        <div className="bookmark-icon">
          <svg
            width="64"
            height="144"
            viewBox="0 0 20 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0V48L10 39L20 48V0H0Z" fill="currentColor" />
          </svg>
        </div>
        <div className="page-number">02</div>
      </header>
      <div className="signup-container">
        <h1 className="signup-heading">Sign up for tea</h1>
        <form action="">
          <input type="email" />
          <button>submit</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
