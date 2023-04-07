import React from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import CallIcon from '@mui/icons-material/Call';

const HomePage = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);  
  const isNonMobile = useMediaQuery("(min-width: 500px)");

  return (
    <div id="home-page" style={{
      color: `${colors.grey[300]}`
    }}>
      {/* Header */}
      <header id="header">
        <div className="intro">
          <div className="overlay" style={{ 
            background: theme.palette.mode==="dark"? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.2)",
            color: theme.palette.mode==="dark"? "#e5e5e5" : "#3d3d3d",
            }}>
            <div className="container">
              <div className="row">
                <div className="intro-text">
                  {
                    isNonMobile? (
                      <h1>
                        {data.Header ? data.Header.title : "Loading"}
                        <span></span>
                      </h1>
                    ):(
                      <h2>
                        {data.Header ? data.Header.title : "Loading"}
                        <span></span>
                      </h2>
                    )
                  }
                  <p>{data.Header ? data.Header.paragraph : "Loading"}</p>
                  <a
                    href="#features"
                    className="btn btn-custom btn-lg page-scroll"
                    style={{
                      backgroundColor: `${colors.primary[700]}`
                    }}
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
      <div id="features" className="text-center" style={{
        backgroundColor: theme.palette.mode==="dark"? "#ccc" : "var(--light-color-9)",
        color: "#555555"
      }}>
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title">
            <h2>Features</h2>
          </div>
          <div className="feature-items">
            {data.Features
              ? data.Features.map((d, i) => (
                  <div key={`${d.title}-${i}`} className="feature-item">
                    {" "}
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
        <div className="about-items">
          <div className="about-img">
            {" "}
            <img src="img/about.jpg" className="img-responsive" alt="" />{" "}
          </div>
          <div className="about-content-div">
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
              Sum-up intends to be a one stop solution for meet summarization needs
            </p>
          </div>
          <div className="row">
            {data.Services
              ? data.Services.map((d, i) => (
                  <div key={`${d.name}-${i}`} className="col-md-4">
                    {" "}
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
      <div id="gallery" className="text-center">
        <div className="container">
          <div className="section-title">
            <h2>Gallery</h2>
            <p>
              Proof of our work is attached below
            </p>
          </div>
          <div className="gallery-items-div">
            <div className="gallery-items">
              {data.Gallery
                ? data.Gallery.map((d, i) => (
                    <div
                      key={`${d.title}-${i}`}
                      className="gallery-item"
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
      <div id="testimonials" style={{
        backgroundColor: theme.palette.mode==="dark"? "#ccc" : "var(--light-color-9)",
        color: "#555555"
      }}>
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
          <div className="section-title">
            <h2>Meet the Team</h2>
            <p>
              We are team Quad who have built this website together.
            </p>
          </div>
          <div className="team-div">
            {data.Team
              ? data.Team.map((d, i) => (
                  <div
                    key={`${d.name}-${i}`}
                    className="team"
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
            <div className="section-title">
              <h2>Get In Touch</h2>
              <p>
                Please share us your issues related to this platform at given email and we
                will get back to you as soon as possible.
              </p>
            </div>
            <div className="contact-info">
              <h3>Contact Info</h3>
              <div className="contact-items">
                <div className="contact-item">
                  <p>
                    <span>
                      <HomeWorkIcon className="contact-icon"/> Address
                    </span>
                    {data.Contact ? data.Contact.address : "loading"}
                  </p>
                </div>
                <div className="contact-item">
                  <p>
                    <span>
                      <CallIcon className="contact-icon"/> Phone
                    </span>{" "}
                    {data.Contact ? data.Contact.phone : "loading"}
                  </p>
                </div>
                <div className="contact-item">
                  <p>
                    <span>
                      <LocalPostOfficeIcon className="contact-icon"/> Email
                    </span>{" "}
                    {data.Contact ? data.Contact.email : "loading"}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="row">
                <div className="social">
                  <ul>
                    <li>
                      <a href={data.Contact ? data.Contact.facebook : "/"} className="social-icon">
                        <FacebookIcon />
                      </a>
                    </li>
                    <li>
                      <a href={data.Contact ? data.Contact.twitter : "/"} className="social-icon">
                        <TwitterIcon />
                      </a>
                    </li>
                    <li>
                      <a href={data.Contact ? data.Contact.instagram : "/"} className="social-icon">
                        <InstagramIcon />
                      </a>
                    </li>
                    <li>
                      <a href={data.Contact ? data.Contact.linkedin : "/"} className="social-icon">
                        <LinkedInIcon />
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
          <img src={smallImage} className="img-responsive" alt={title} style={{
            borderRadius: "15px"
          }} />{" "}
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
      "Team Quad has developed an extension which can be used to summarize team meetings effortlessly with high degree of precision",
    Why: [
      "Best summarization without any hassles",
      "Free to use",
      "Zero latency",
      "Available as an extension",
    ]
  },
  Gallery: [
    {
      title: "Input",
      largeImage: "img/portfolio/summaryip.jpeg",
      smallImage: "img/portfolio/summaryip.jpeg",
    },
    {
      title: "Model-1",
      largeImage: "img/portfolio/model2.jpeg",
      smallImage: "img/portfolio/model2.jpeg",
    },
    {
      title: "Model-2",
      smallImage: "img/portfolio/OpenAi2.png",
      largeImage: "img/portfolio/OpenAi2.png",
    },
  ],
  Services: [
    {
      name: "Audio/Video/Text file summarizer",
      text: "We can take a .mp4,.mp3,text files as input and then summarize its contents in best way possible",
    },
    {
      name: "Summarizing extension",
      text: "To facilitate ease of use for user we also have an extension which can provide detailed summary of Google meet too!",
    },
    {
      name: "Transcription and email services",
      text: "With provide a feature to transcribe the entire meet, summarize it and email it to the participants too",
    },
    /* {
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      name: "Lorem ipsum dolor",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    },
    {
      name: "Consectetur adipiscing",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.",
    }, */
  ],
  Testimonials: [
    {
      img: "img/testimonials/01.jpg",
      text: '"Excellent product with great functionalities"',
      name: "John Doe",
    },
    {
      img: "img/testimonials/03.jpg",
      text: '"Summarization models are very helpful to get a birds eye view of meeting"',
      name: "Joseph Thomas",
    },
    {
      img: "img/testimonials/02.jpg",
      text: '"Easy to use for non techy people too as summary is directly received by mail"',
      name: "Rohan Sharma",
    },
  ],
  Team: [
    {
      img: "img/team/Kunalpic.jpg",
      name: "Kunal Agrawal",
      job: "Director",
    },
    {
      img: "img/team/Deexith.jpg",
      name: "Deexith Madas",
      job: "Senior Designer",
    },
    {
      img: "img/team/Amantiw.jpeg",
      name: "Aman Tiwari",
      job: "Senior Designer",
    },
    {
      img: "img/team/Ganesh_Utla.jpg",
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
      title: "Summarising extension",
      text: "Summarization of meetings from various formats like text file, audio file and video file.",
    },
    {
      title: "Best summarization models.",
      text: "We have used OpenAI and Bert models which have highest degree of precision.",
    },
    {
      title: "Google meet extension for live transcript.",
      text: "Our extension can also download the transcript of a meeting on all platforms like Microsoft Teams, Zoom,Google Meet.",
    },
    {
      title: "User friendly and with group summary mailing features.",
      text: "No need of individual emails, we can share the summary with all the participants of the meeting.",
    },
  ],
};

export default HomePage;
