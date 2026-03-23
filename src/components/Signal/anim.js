import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initSignalAnimation(container) {
  const bgCards = [...container.querySelectorAll("[data-signal-bg]")];
  const fgCards = [...container.querySelectorAll("[data-signal-fg]")];
  const summaryCard = container.querySelector("[data-signal-summary]");

  if (!summaryCard) return null;

  const messageCards = [...bgCards, ...fgCards];
  const allCards = [...messageCards, summaryCard];

  gsap.set(allCards, { scale: 0, autoAlpha: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      once: true,
    },
  });

  tl.to(messageCards, {
    scale: 1,
    autoAlpha: 1,
    duration: 0.9,
    ease: "back.out(1.7)",
    stagger: 0.15,
  });

  tl.to(
    summaryCard,
    {
      scale: 1,
      autoAlpha: 1,
      duration: 0.9,
      ease: "back.out(1.7)",
    },
    "-=0.3",
  );

  tl.to(
    bgCards,
    {
      filter: "blur(3px)",
      opacity: 0.25,
      duration: 2,
      ease: "power2.inOut",
      stagger: { each: 0.2, from: "random" },
    },
    "+=0.2",
  );

  return tl;
}
