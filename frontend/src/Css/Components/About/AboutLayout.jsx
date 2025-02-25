import React, { useEffect } from 'react';
import '../../../Css/Pages/About.css';
import DescriptionBox from './DescriptionBox';

function AboutLayout() {
  const descDetails = [
   { title: 'Why Choose Us?', desc: " [Your Platform Name] is more than just a networking platform—it's a launchpad for innovation. Unlike traditional startup platforms, we ensure that ideas are shared transparently, encouraging entrepreneurs to take ownership through patents. Our system includes robust investor verification, crowdfunding options, and engagement analytics to help entrepreneurs track investor interest. We provide secure communication channels, allowing meaningful investor-entrepreneur interactions. By integrating a merit-based upvote system and detailed profiles, we ensure that the best ideas gain visibility. Whether you're an entrepreneur or an investor, our platform offers the right tools to drive startup success." },
    {
      title: 'Our Mission ',
      desc: "At Your Platform Name, our mission is to create a thriving ecosystem where young entrepreneurs can connect with visionary investors to bring their ideas to life. We believe in fostering innovation by providing a transparent and collaborative platform for startup funding. By encouraging entrepreneurs to patent their ideas and showcase them confidently, we ensure that intellectual property is valued. Our goal is to break barriers in startup funding, making investment opportunities accessible to both new and experienced entrepreneurs. Whether you're looking to launch a business or fund the next big innovation, we're here to make it happen."
    },
      
   
    { title: 'Our Vision', desc: 'Our vision is to revolutionize the way startups receive funding by creating a platform that bridges the gap between entrepreneurs and investors. We aim to build a trusted and scalable space where innovative ideas receive the attention they deserve. By enabling crowdfunding and investor collaborations, we empower startups to secure funding more efficiently. We envision a future where financial backing is based on creativity, potential, and merit rather than limited access to resources. [Your Platform Name] aspires to become the leading platform where great ideas find the right investors and transform into successful businesses.' },
  ];

  useEffect(() => {
    function rotateCards() {
      let angle = 0;
      let cards = document.querySelectorAll('.descriptionBox');
      
      cards.forEach((card, index) => {
        if (card.classList.contains('descriptionBoxAway')) {
          card.style.transform = `translateY(-120vh) rotate(45deg)`;
        } else {
          card.style.transform = `rotate(${angle}deg)`;
          angle -= 17;
          card.style.zIndex = cards.length - index;
        }
      });
    }

    function scrollEventListener() {
      let target = 300;
      let cards = document.querySelectorAll('.descriptionBox');
      let stackArea = document.querySelector('.dupContainerForAboutPage');
      
      if (!stackArea) return; // Prevents errors if element is missing

      let top = stackArea.getBoundingClientRect().top;
      let distance = -1 * (top / target + 1);
      let index = Math.floor(distance);

      cards.forEach((card, i) => {
        if (i <= index) {
          card.classList.add('descriptionBoxAway');
        } else {
          card.classList.remove('descriptionBoxAway');
        }
      });

      rotateCards();
    }

    rotateCards();
    window.addEventListener('scroll', scrollEventListener);

    return () => {
      window.removeEventListener('scroll', scrollEventListener);
    };
  }, []);

  return (
    <div className="MainAboutPage">
      <div className="leftHalfAboutPage">
        <div className="aboutPageDescription">
          <h1>What we do?</h1>
          <p>
            Welcome to BizzLink, a dynamic platform designed to connect young entrepreneurs with visionary investors. We believe in the power of innovation and collaboration, providing a space where groundbreaking ideas can find the right financial backing to turn into reality.
            <br /><br />
            At BizzLink, we empower entrepreneurs to showcase their ideas with confidence, encouraging them to patent their work and present it to a network of verified investors. Our platform is built on transparency, merit, and accessibility, ensuring that innovative projects get the attention they deserve.</p>
        </div>
      </div>
      <div className="rightHalfAboutPage">
        <div className="descriptionWithSquareboxes">
          {descDetails.map((desc, index) => (
            <DescriptionBox description={desc} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutLayout;
