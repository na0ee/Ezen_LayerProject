export function getAppScrollContainer() {
  return document.querySelector(".desktop-mockup-viewport");
}

export function scrollAppTo(options) {
  const container = getAppScrollContainer();
  if (container) {
    container.scrollTo(options);
    return;
  }
  window.scrollTo(options);
}

export function scrollAppTargetIntoGuidePosition(target, ratio = 0.43) {
  const container = getAppScrollContainer();
  if (container) {
    const targetTop =
      container.scrollTop +
      target.getBoundingClientRect().top -
      container.getBoundingClientRect().top;
    container.scrollTo({
      top: Math.max(0, targetTop - container.clientHeight * ratio),
      behavior: "smooth",
    });
    return;
  }

  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: Math.max(0, targetTop - window.innerHeight * ratio),
    behavior: "smooth",
  });
}
