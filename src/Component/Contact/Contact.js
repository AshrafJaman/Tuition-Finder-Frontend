import React, { useState } from 'react';
import './Contact.css';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [dis, setDis] = useState(false);
  const handleEmail = (e) => {
    e.preventDefault();
    setDis(true);
    emailjs
      .sendForm('service_zh8tedo', 'template_57e27p7', e.target, 'user_r28jwDwRGxJXeoJcqAC7H')
      .then(
        function (response) {
          alert('Email Sent');
          e.target.reset();
          setDis(false);
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          setDis(false);
          alert(error);
          console.log('FAILED...', error);
        }
      );
  };
  return (
    <div className="contact" id="contact">
      {/* <h2>Contact With Us</h2>
      <form onSubmit={handleEmail}>
        <div>
          <input type="text" placeholder="Name" required name="name" />
          <input type="text" placeholder="Email Address" required name="email" />
          <input type="text" name="subject" placeholder="Subject" required />
        </div>
        <div>
          <textarea
            id=""
            cols="30"
            rows="10"
            placeholder="Message"
            required
            name="message"
          ></textarea>
        </div>
        <div className="form_submit">
          <input type="submit" disabled={dis} />
        </div>
      </form> */}
    </div>
  );
};

export default Contact;
