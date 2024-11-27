import React from "react";
import Layout from "../components/Layout";
import "../styles/About.css";
import aboutimg from "../images/aboutimg.png";
import aboutimg2 from "../images/aboutimg2.png";
import aboutimg3 from "../images/aboutimg3.png";
import { useMediaQuery } from "react-responsive";

const aboutdata = [
  {
    img: aboutimg3,
    title: "Make",
    desc: "To start the process, you need to create a profile on our life partner website.",
  },
  {
    img: aboutimg2,
    title: "Meet",
    desc: "To start the process, you need to create a profile on our life partner website.",
  },
  {
    img: aboutimg,
    title: "Marry",
    desc: "To start the process, you need to create a profile on our life partner website.",
  },
];

const About = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  return (
    <Layout>
      <div
        className={`aboutsection bg-light md:!pt-20 !pt-12 ${
          isMobile ? "px-0" : "px-16"
        }`}
      >
        <div className="container">
          <div className="aboutsection-first-details md:pb-10 pb-8">
            <h1 className="pb-2 md:text-3xl text-xl text-black">Our Story</h1>
            <h2 className="md:!text-[18px] !leading-6 !text-sm text-left ">
              <strong className="!font-semibold">Our Life Partner</strong>{" "}
              offers an opportunity and efficient way to find a life partner.
              With advanced algorithms and filters, you can easily find someone
              who shares your values, beliefs, and interests. We have millions
              of registered users from different parts of the country, and
              filters to match people based on their choices, interests, and
              lifestyle.Our platform is designed with your preferences in mind.
              By leveraging cutting-edge technology, our advanced matching
              algorithms analyze and understand your unique personality traits,
              preferences, and lifestyle choices. Whether you prioritize
              cultural background, religious beliefs, hobbies, or professional
              interests, our system ensures you are matched with like-minded
              individuals who align with your criteria.
            </h2>
            <h2 className="md:!text-[18px] py-4 !leading-6 !text-sm  text-left ">
              We recognize that everyone’s ideal partner is different, which is
              why we offer a variety of filters to refine your search. From age,
              location, and education to more specific preferences such as
              dietary habits, physical fitness, and personal interests, you have
              the freedom to customize your search and focus on what matters
              most to you.
            </h2>
          </div>

          <div className="bg-gradient-to-b from-[#EB4566] to-[#9F1632] rounded-2xl md:px-10 px-2 py-4 my-8">
            <h2 className="text-center font-semibold text-white md:text-3xl text-xl py-4">
              Way to Find A Partner
            </h2>
            <div className="flex flex-wrap justify-center gap-8 ">
              {aboutdata.map((data, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-3xl text-center max-h-[25em] max-w-[22em]"
                >
                  <h2 className="font-semibold md:text-2xl text-xl text-[#EB4566]">
                    {data.title}
                  </h2>
                  <p className="md:text-[14px] text-[11px] text-gray-500 md:py-4 py-2">
                    {data.desc}
                  </p>
                  <img
                    src={data.img}
                    alt="data-img"
                    className="w-80 max-h-60 mx-auto rounded-3xl"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="aboutsection-third-details md:pt-8 md:pb-10 pt-8 ">
            <h1 className="pb-2 md:text-3xl text-xl text-black">
              Our Vision & Mission
            </h1>
            <h2 className="md:!text-[18px] !leading-6 !text-sm  text-left ">
              At
              <strong className="!font-semibold"> Our Life Partner</strong> our
              vision is to create a world where meaningful and lasting
              connections are accessible to everyone. We aspire to be the
              leading platform that empowers individuals to find love and
              companionship, transcending geographical and cultural boundaries.
              By leveraging cutting-edge technology and fostering an inclusive
              community, we envision a future where every person has the
              opportunity to discover their perfect life partner.We believe that
              every individual deserves to experience the joy and fulfillment
              that comes from a deep, meaningful connection. Our platform is
              dedicated to facilitating these connections by providing tools and
              resources that help people find compatible partners based on
              shared values, interests, and life goals. By prioritizing
              authenticity and compatibility, we strive to ensure that each
              connection made on our platform has the potential to blossom into
              a lasting relationship.
            </h2>
            <h2 className=" py-4 md:!text-[18px] !leading-6 !text-sm  text-left ">
              We invite you to join us in our vision of a world where meaningful
              connections are within reach for everyone. Together, we can create
              a future where love and companionship are accessible to all, and
              where every individual has the chance to find their perfect match.
              At Our Life Partner, we are committed to making this vision a
              reality, one connection at a time.
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
