import React, { useState } from "react";
import { IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";

const initialState = {
  name: "",
  email: "",
  message: "",
};

const HomePage = () => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  // const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    // emailjs
    //   .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", e.target, "YOUR_USER_ID")
    //   .then(
    //     (result) => {
    //       console.log(result.text);
    //       clearState();
    //     },
    //     (error) => {
    //       console.log(error.text);
    //     }
    //   );
  };

  return (
    <div id="home-page">
      {/* Header */}
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1>
                    {data.Header ? data.Header.title : "Loading"}
                    <span></span>
                  </h1>
                  <p>{data.Header ? data.Header.paragraph : "Loading"}</p>
                  <a
                    href="#features"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Learn More
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <div id="features" className="text-center">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Features</h2>
          </div>
          <div className="row">
            {data.Features
              ? data.Features.map((d, i) => (
                  <div key={`${d.title}-${i}`} className="col-xs-6 col-md-3">
                    {" "}
                    <i className={d.icon}></i>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                ))
              : "Loading..."}
          </div>
        </div>
      </div>

      {/* About */}
      <div id="about">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-6">
              {" "}
              <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h2>About Us</h2>
                <p>{data.About ? data.About.paragraph : "loading..."}</p>
                <h3>Why Choose Us?</h3>
                <div className="list-style">
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      {data.About
                        ? data.About.Why.map((d, i) => (
                            <li key={`${d}-${i}`}>{d}</li>
                          ))
                        : "loading"}
                    </ul>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-xs-12">
                    <ul>
                      {data.About
                        ? data.About.Why2.map((d, i) => (
                            <li key={`${d}-${i}`}> {d}</li>
                          ))
                        : "loading"}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}

      <div id="services" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Our Services</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div className="row">
            {data.Services
              ? data.Services.map((d, i) => (
                  <div key={`${d.name}-${i}`} className="col-md-4">
                    {" "}
                    <i className={d.icon}></i>
                    <div className="service-desc">
                      <h3>{d.name}</h3>
                      <p>{d.text}</p>
                    </div>
                  </div>
                ))
              : "loading"}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div id="portfolio" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Gallery</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div className="row">
            <div className="portfolio-items">
              {data.Gallery
                ? data.Gallery.map((d, i) => (
                    <div
                      key={`${d.title}-${i}`}
                      className="col-sm-6 col-md-4 col-lg-4"
                    >
                      <Image
                        title={d.title}
                        largeImage={d.largeImage}
                        smallImage={d.smallImage}
                      />
                    </div>
                  ))
                : "Loading..."}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials">
        <div className="container">
          <div className="section-title text-center">
            <h2>What our clients say</h2>
          </div>
          <div className="row">
            {data.Testimonials
              ? data.Testimonials.map((d, i) => (
                  <div key={`${d.name}-${i}`} className="col-md-4">
                    <div className="testimonial">
                      <div className="testimonial-image">
                        {" "}
                        <img src={d.img} alt="" />{" "}
                      </div>
                      <div className="testimonial-content">
                        <p>"{d.text}"</p>
                        <div className="testimonial-meta"> - {d.name} </div>
                      </div>
                    </div>
                  </div>
                ))
              : "loading"}
          </div>
        </div>
      </div>

      {/* Team */}

      <div id="team" className="text-center">
        <div className="container">
          <div className="col-md-8 col-md-offset-2 section-title">
            <h2>Meet the Team</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div id="row">
            {data.Team
              ? data.Team.map((d, i) => (
                  <div
                    key={`${d.name}-${i}`}
                    className="col-md-3 col-sm-6 team"
                  >
                    <div className="thumbnail">
                      {" "}
                      <img src={d.img} alt="..." className="team-img" />
                      <div className="caption">
                        <h4>{d.name}</h4>
                        <p>{d.job}</p>
                      </div>
                    </div>
                  </div>
                ))
              : "loading"}
          </div>
        </div>
      </div>

      {/* Contact */}

      <div>
        <div id="contact">
          <div className="container">
            <div className="col-md-8">
              <div className="row">
                <div className="section-title">
                  <h2>Get In Touch</h2>
                  <p>
                    Please fill out the form below to send us an email and we
                    will get back to you as soon as possible.
                  </p>
                </div>
                <form name="sentMessage" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Name"
                          required
                          onChange={handleChange}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          required
                          onChange={handleChange}
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="4"
                      placeholder="Message"
                      required
                      onChange={handleChange}
                    ></textarea>
                    <p className="help-block text-danger"></p>
                  </div>
                  <div id="success"></div>
                  <button type="submit" className="btn btn-custom btn-lg">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
            <div className="col-md-3 col-md-offset-1 contact-info">
              <div className="contact-item">
                <h3>Contact Info</h3>
                <p>
                  <span>
                    <i className="fa fa-map-marker"></i> Address
                  </span>
                  {data.Contact ? data.Contact.address : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-phone"></i> Phone
                  </span>{" "}
                  {data.Contact ? data.Contact.phone : "loading"}
                </p>
              </div>
              <div className="contact-item">
                <p>
                  <span>
                    <i className="fa fa-envelope-o"></i> Email
                  </span>{" "}
                  {data.Contact ? data.Contact.email : "loading"}
                </p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="social">
                  <ul>
                    <li>
                      <a href={data.Contact ? data.Contact.facebook : "/"}>
                        <IconButton>
                          <FacebookIcon />
                        </IconButton>
                      </a>
                    </li>
                    <li>
                      <a href={data.Contact ? data.Contact.twitter : "/"}>
                        <IconButton>
                          <TwitterIcon />
                        </IconButton>
                      </a>
                    </li>
                    <li>
                      <a href={data.Contact ? data.Contact.instagram : "/"}>
                        <IconButton>
                          <InstagramIcon />
                        </IconButton>
                      </a>
                    </li>
                    <li>
                      <a href={data.Contact ? data.Contact.linkedin : "/"}>
                        <IconButton>
                          <LinkedInIcon />
                        </IconButton>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Image = ({ largeImage, title, smallImage }) => {
  return (
    <div className="portfolio-item">
      <div className="hover-bg">
        {" "}
        <a href={largeImage} title={title} data-lightbox-gallery="gallery1">
          <div className="hover-text">
            <h4>{title}</h4>
          </div>
          <img src={smallImage} className="img-responsive" alt={title} />{" "}
        </a>{" "}
      </div>
    </div>
  );
};

const data = {
  Header: {
    title: "STM - QUAD",
    paragraph: "Summarising Team Meetings",
  },
  About: {
    paragraph:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    Why: [
      "Lorem ipsum dolor",
      "Tempor incididunt",
      "Lorem ipsum dolor",
      "Incididunt ut labore",
    ],
    Why2: [
      "Aliquip ex ea commodo",
      "Lorem ipsum dolor",
      "Exercitation ullamco",
      "Lorem ipsum dolor",
    ],
  },
  Gallery: [
    {
      title: "Project Title",
      largeImage: "img/portfolio/01-large.jpg",
      smallImage: "img/portfolio/01-small.jpg",
    },
    {
      title: "Project Title",
      largeImage: "img/portfolio/02-large.jpg",
      smallImage: "img/portfolio/02-small.jpg",
    },
    {
      title: "Project Title",
      largeImage: "img/portfolio/03-large.jpg",
      smallImage: "img/portfolio/03-small.jpg",
    },
  ],
  Services: [
    {
      icon: "fa fa-wordpress",
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: "fa fa-cart-arrow-down",
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: "fa fa-cloud-download",
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: "fa fa-language",
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: "fa fa-plane",
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      icon: "fa fa-pie-chart",
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
  ],
  Testimonials: [
    {
      img: "img/testimonials/01.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "John Doe",
    },
    {
      img: "img/testimonials/01.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "Johnathan Doe",
    },
    {
      img: "img/testimonials/01.jpg",
      text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at."',
      name: "John Doe",
    },
  ],
  Team: [
    {
      img: "img/team/01.jpg",
      name: "Kunal Agrawal",
      job: "Director",
    },
    {
      img: "img/team/02.jpg",
      name: "Deexith Madas",
      job: "Senior Designer",
    },
    {
      img: "img/team/02.jpg",
      name: "Aman Tiwari",
      job: "Senior Designer",
    },
    {
      img: "img/team/02.jpg",
      name: "Ganesh Utla",
      job: "Senior Designer",
    },
  ],
  Contact: {
    address: "Thakur College of Engineering and Technology ",
    phone: "+1 123 456 1234",
    email: "info@company.com",
    facebook: "fb.com",
    twitter: "twitter.com",
    instagram: "instagram.com",
    linkedin: "linkedin.com",
  },
  Features: [
    {
      icon: "fa fa-comments-o",
      title: "Summarising Chatbot",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
    {
      icon: "fa fa-bullhorn",
      title: "Blah",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
    {
      icon: "fa fa-group",
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
    {
      icon: "fa fa-magic",
      title: "Lorem ipsum",
      text: "Lorem ipsum dolor sit amet placerat facilisis felis mi in tempus eleifend pellentesque natoque etiam.",
    },
  ],
};

export default HomePage;
