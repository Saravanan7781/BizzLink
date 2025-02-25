window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const section1 = document.querySelector('.section1');
    const section1Height = section1.offsetHeight;
    const per1 = section1Height/100
    const per8 = per1*8 
    const scrollY = window.pageYOffset;
    if (scrollY > section1Height-per8) {
      navbar.style.background = '#00c1ff';
      navbar.style.boxShadow = '0px 5px 10px';
    }
   else {
      navbar.style.background = 'rgb(255,255,255)';
      navbar.style.boxShadow = '0px 5px 10px';
    }
  });
