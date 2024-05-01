import React from "react";
import "./Faq.css";
const Faq = () => {
  return (
    <div className="shu_Box">
      <div className="card_s">
        <img
          className="card-header_s"
          src="https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg"
          alt="Woman typing on keyboard with glowing keys"
        />
        <article className="card-body_s">
          <h2 className="card-title_s">Get Verified Badge</h2>
          <p className="card-text_s">
            If you buy premium subscription, you'll get verified badge. And
            students will be able to contact you directly. They will see your
            contact info on your profile.
            <br />
            That means more students for you.
          </p>
          <div className="cardcta_s">
            <p className="cardmeta-info_s">
              <span>200tk</span> per month
            </p>
            <a href="#" className="cardbutton_s">
              Buy Premium
            </a>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Faq;
