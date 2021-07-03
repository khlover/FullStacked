import "./index.css";

function Footer() {
  return (
    <div className="Footer">
      <div className="contact">
        <span className="logo">
          <img
            id="logo"
            src="/assets/Logo.png"
            alt="Company logo"
            width="36px"
            height="36px"
          />
          <p className="logoTitle">Stacked</p>
        </span>

        <span className="phone ">
          <img
            src="/assets/phone.png"
            alt="grey phone"
            width
            height="13.5px"
          ></img>
          <p>8 (800) 123-45-67</p>
        </span>

        <span className="mail">
          <img
            src="/assets/mail.png"
            alt="grey envelope"
            width="15px"
            height="12px"
          ></img>
          <p>info@stacked.com</p>
        </span>
      </div>

      <div className="navDiv">
        <p className="FooterTitle">Company</p>
        <p>About</p>
        <p>Careers</p>
        <p>Press & Talent</p>
      </div>

      <div className="navDiv">
        <p className="FooterTitle">Help</p>
        <p>Contact Us</p>
        <p>Privacy</p>
        <p>Terms</p>
      </div>

      <div className="socialmedia">
        <p className="FooterTitle">Follow</p>
        <span className="socialLogo">
          <img src="/assets/facebook.png" alt="facebook logo"></img>
          <img src="/assets/twitter.png" alt="twitter logo"></img>
          <img src="/assets/youtube.png" alt="youtube logo"></img>
          <img src="/assets/instagram.png" alt="isntagram logo"></img>
        </span>
      </div>
    </div>
  );
}

export default Footer;
