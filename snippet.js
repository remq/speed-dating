[
  ...new Set(
    [...document.getElementsByClassName("nBzcnc")]
      .filter((element) => element.querySelectorAll(".ReFDjc").length)
      .map((element) => element.getAttribute("aria-label"))
      .filter(Boolean)
      .map((label) => label.split(", "))
      .map(([name]) => name)
  ),
];
