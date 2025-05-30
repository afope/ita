import "./homepage.css";

const HomePage = () => {
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
        <div className="page-number">01</div>
      </header>
      <div className="content-container">
        <h1 className="heading">ITA</h1>
        <p className="description">
          The best way for people to connect and commune is over shared
          interest. Lagos being the creative whirlpool that it is and home to
          some of the most eruptive (and subversive, perhaps) creativity in the
          world, would be the most unassuming place for people to gather over a
          shared love of words, their power, their beauty, their unparalleled
          ability to subvert, change, and redirect.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
