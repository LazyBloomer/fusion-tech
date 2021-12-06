//mobile nav button function

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

//set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Sroll fade up function

window.addEventListener("scroll", reveal);

function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  console.log(reveals);
  for (var i = 0; i < reveals.length; i++) {
    var windowheight = window.innerHeight;
    var revealTop = reveals[i].getBoundingClientRect().top;
    var revealpoint = 50;

    if (revealTop < windowheight - revealpoint) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

// Filter course function

const courseMenu = document.querySelector(".course-menu"),
  courseName = document.querySelectorAll(".course-name");

courseMenu.addEventListener("click", (event) => {
  if (event.target.classList.contains("course-choice")) {
    courseMenu.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");
    const filterValue = event.target.getAttribute("data-filter");
    courseName.forEach((item) => {
      if (item.classList.contains(filterValue) || filterValue === "all") {
        item.classList.remove("hide");
        item.classList.add("show");
      } else {
        item.classList.remove("show");
        item.classList.add("hide");
      }
    });
  }
});

//smooth scrolling for safari and ie edge
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    // console.log(e);
    const hrefEl = link.getAttribute("href");
    // console.log(hrefEl);

    //scroll back to top
    if (hrefEl == "#")
      window.scrollTo({
        // top: 0 to scroll back to top
        top: 0,
        behavior: "smooth",
      });

    //scroll to other links
    if (hrefEl !== "#" && hrefEl.startsWith("#")) {
      const sectionEl = document.querySelector(hrefEl);
      // scrollIntoView: for scrolling to a particular section
      sectionEl.scrollIntoView({
        behavior: "smooth",
      });

      //close the mobile navigation
      if (link.classList.contains("main-nav-link"))
        headerEl.classList.toggle("nav-open");
    }
  });
});

// adding scorlling sticky nav

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
