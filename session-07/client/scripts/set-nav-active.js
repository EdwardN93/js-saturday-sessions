document.addEventListener("DOMContentLoaded", async function () {
  try {
    const apiUrl = `http://localhost:3000/navtemplate`;
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();

    const nav = document.createElement("nav");
    const ul = document.createElement("ul");

    const divForLogo = document.createElement("div");
    const h2Logo = document.createElement("h2");
    h2Logo.textContent = "LOGO";
    divForLogo.classList.add("logo-container");
    divForLogo.append(h2Logo);

    ul.classList.add("nav-links");

    data.forEach((element) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = solveLinks(element.link);
      a.textContent = element.name;

      li.append(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    document.querySelector("#navbar").append(divForLogo, nav);
    setActiveLink();
  } catch (error) {
    console.log(error);
  }
});

function setActiveLink() {
  const currLocation = window.location.href.split("/").pop();
  const links = document.querySelectorAll("#navbar a");

  links.forEach((link) => {
    if (link.getAttribute("href").includes(currLocation))
      link.classList.add("active");
  });
}

function solveLinks(link) {
  const isInPagesFolder = window.location.pathname.includes("/pages/");

  if (isInPagesFolder) {
    link = link.replace("../", "../");
  } else {
    link = link.replace("../pages/", "pages/");
    link = link.replace("../", "");
  }

  return link;
}

const inputNum = 1234;

function getNum(num) {
  const string = String(num);
  let sum = 0;
  for (let i = 0; i < string.length; i++) {
    sum += Number(string[i]);
  }
  console.log(sum);
}
getNum(inputNum);
