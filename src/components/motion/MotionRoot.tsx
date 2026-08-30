"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

function splitWords(element: HTMLElement) {
  if (element.dataset.splitReady === "true") return;
  const text = element.textContent ?? "";
  const parts = text.split(/(\s+)/);
  element.textContent = "";
  element.setAttribute("aria-label", text.trim());

  parts.forEach((part) => {
    if (!part.trim()) {
      element.appendChild(document.createTextNode(part));
      return;
    }
    const mask = document.createElement("span");
    const word = document.createElement("span");
    mask.className = "split-word-mask";
    word.className = "split-word";
    word.textContent = part;
    mask.setAttribute("aria-hidden", "true");
    mask.appendChild(word);
    element.appendChild(mask);
  });

  element.dataset.splitReady = "true";
}

export function MotionRoot() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;

    if (reduce) {
      gsap.set("[data-split-reveal], [data-reveal], [data-hero-item]", {
        autoAlpha: 1,
        clearProps: "filter",
      });
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
      gsap.fromTo(
        heroItems,
        { y: 28, autoAlpha: 0, filter: "blur(8px)" },
        {
          y: 0,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: 1.05,
          ease: "power4.out",
          stagger: 0.08,
          delay: 0.15,
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-split-reveal]").forEach((element) => {
        splitWords(element);
        const words = element.querySelectorAll(".split-word");
        gsap.fromTo(
          words,
          { yPercent: 110, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 0.95,
            ease: "power4.out",
            stagger: 0.045,
            scrollTrigger: {
              trigger: element,
              start: "top 84%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { y: 36, autoAlpha: 0, filter: "blur(8px)" },
          {
            y: 0,
            autoAlpha: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 86%",
              once: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax-layer]").forEach((layer) => {
        const speed = Number(layer.dataset.speed || -0.16);
        const section = layer.closest("[data-parallax-section]") ?? layer;
        gsap.to(layer, {
          y: () => window.innerHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      if (desktop) {
        gsap.utils.toArray<HTMLElement>("[data-sticky-stack]").forEach((stack) => {
          const cards = gsap.utils.toArray<HTMLElement>(
            stack.querySelectorAll("[data-stack-card]"),
          );
          cards.forEach((card, index) => {
            const next = cards[index + 1];
            if (!next) return;
            gsap.to(card, {
              scale: 0.94 + index * 0.012,
              autoAlpha: 0.72,
              y: -20,
              ease: "none",
              scrollTrigger: {
                trigger: next,
                start: "top 80%",
                end: "top 24%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
          });
        });

      }

      const footer = document.querySelector("[data-footer-parallax]");
      if (footer) {
        gsap.fromTo(
          footer,
          { yPercent: -8, autoAlpha: 0.88 },
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "top 55%",
              scrub: 1,
            },
          },
        );
      }
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const fonts = document.fonts;
    fonts?.ready.then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return null;
}
