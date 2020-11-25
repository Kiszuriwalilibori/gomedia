const debounce = require("lodash/debounce");
const templatePolyfill = require("template-polyfill");

const testArray = [
  { heading: "heading", content: "Lorem ipsum dolor sit amet" },
  { heading: "heading", content: "Lorem ipsum dolor sit amet, consect etur adipiscing elit. Aenea uismod bibentum laoreet. Proin gravida dolor sit amet lacus." },
  { heading: "ultra mega super long heading", content: "Lorem ipsum dolor sit amet, consect etur adipiscing elit. Aenea uismod bibentum laoreet. Lorem ipsum dolor sit amet." },
  { heading: "heading4", content: "testLorem ipsum dolor sit amet, consect etur adipiscing elit" },
  { heading: "heading5", content: "Aenea uismod bibentum laoreet. Proin gravida dolor sit amet lacus." },
];

const slideNode = document.getElementById("slides-container");
const staticNode = document.getElementById("static-container");

var index = 0;
var currentSlidesCount = slidesCount();

function handleClick(ev) {
  switch (ev.target.id) {
    case "right-arrow":
      index++;
      appendContent(getDataSlice(slidesCount(), index, testArray), slideNode, staticNode);
      break;
    case "left-arrow":
      index--;
      appendContent(getDataSlice(slidesCount(), index, testArray), slideNode, staticNode);
      break;
    default:
  }
}

function getDataSlice(count, index, ary) {
  let result = {};
  result.slice = ary.slice(index, index + count);
  result.post = index + count < ary.length ? true : false;
  result.pre = index > 0 ? true : false;
  return result;
}

function slidesCount() {
  let count;
  if (window.matchMedia("(min-width: 1200px)").matches) {
    count = 3;
  }
  if (window.matchMedia("(min-width: 768px) and (max-width: 1199px)").matches) {
    count = 2;
  }
  if (window.matchMedia("(min-width: 350px) and (max-width: 768px)").matches) {
    count = 1;
  }
  return count;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function appendContent(ary, slidesHook, contentHook) {
  
  var content = document.querySelector("#slide-template").content;

  slidesHook.style.visibility = "hidden";
  contentHook.style.visibility = "hidden";
  removeAllChildNodes(slidesHook);
  removeAllChildNodes(contentHook);
  

  if (ary.pre) {
    const content = document.querySelector("#left-arrow").content;
    slidesHook.appendChild(document.importNode(content, true));
  }

  ary.slice.forEach(function(element, index){

    console.log(content, "content");
    content.querySelector("h3").textContent = element.heading;
    content.querySelector(".h3-text").textContent = element.content;

    content.querySelector("h3").id = 'slide_'+ index +'_header';
    content.querySelector('article').setAttribute('aria-labelledby','slide_'+ index +'_header');
    content.querySelector(".h3-text").id = 'slide_' + index + '_description';
    content.querySelector('article').setAttribute('aria-describedby','slide_'+ index +'_description');
    slidesHook.appendChild(document.importNode(content, true));

    content.querySelector("h3").id = 'content_'+ index +'_header';
    content.querySelector('article').setAttribute('aria-labelledby','content_'+ index +'_header');
    content.querySelector(".h3-text").id = 'content_' + index + '_description';
    content.querySelector('article').setAttribute('aria-describedby','content_'+ index +'_description');

    contentHook.appendChild(document.importNode(content, true));
  });

  if (ary.post) {
    const content = document.querySelector("#right-arrow").content;
    slidesHook.appendChild(document.importNode(content, true));
  }
    slidesHook.style.visibility = "visible";
    contentHook.style.visibility = "visible";
}

templatePolyfill();

window.onload = function () {
  window.addEventListener(
    "click",
    debounce(function (ev) {
      handleClick(ev);
    }, 200)
  );
};

window.addEventListener(
  "resize",
  debounce(function () {
    const count = slidesCount();
    if (count != currentSlidesCount) {
      currentSlidesCount = count;
      appendContent(getDataSlice(count, index, testArray), slideNode, staticNode);
    }
  }, 200)
);

appendContent(getDataSlice(slidesCount(), index, testArray), slideNode, staticNode);
