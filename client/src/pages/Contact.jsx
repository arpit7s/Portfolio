import { useState } from "react";
import { useAuth } from "../store/auth";
import { toast } from 'react-toastify';

const defaultContactFormData = {
  username: "",
  email: "",
  message: "",
};

// type UserAuth = boolean;
export const Contact = () => {
  const [data, setData] = useState(defaultContactFormData);

  const { user } = useAuth();

  console.log("frontend user ", user.email);

  const [userData, setUserData] = useState(true);

  if (userData && user) {
    setData({
      username: user.username,
      email: user.email,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    // console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactForm = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setData(defaultContactFormData);
        // const responseData = await response.json();
        toast.success('Your Message Delivered Successfully');
      } else {
        // Handle API error here
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="section-contact ">
        <div className="contact-content container">
          <h1 className="main-heading">Contact us</h1>
        </div>
        {/* <h1>Contact Page</h1> */}
        <div className="container ">
          <section className="section-form">
            <form onSubmit={handleContactForm}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={data.username}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  name="username"
                  id="username"
                  value={data.email}
                  onChange={handleInput}
                  autoCapitalize="off"
                  required
                />
              </div>
              <div>
                <label htmlFor="message"> message</label>
                <textarea name="message"
                  id="messsage"
                  cols="30"
                  rows="6"
                  value={data.message}
                  onChange={handleInput}
                  autoCapitalize="off"
                >
                </textarea>
              </div>

              <div>
                <button type="submit"> Submit </button>
              </div>
            </form>
          </section>
        </div>
        <section className="mb-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29035.
            2360878213!2d81.28247706506285!3d24.540679740146874!2m3!1f0!2f0!3
            f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39845a348b85dbbd%3A0xbc368
            e68a40a6da9!2sRewa%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v17102
            38995807!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </>
  );
};

export default Contact
