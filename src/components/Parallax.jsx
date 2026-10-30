import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Runs `onUpdate(progress, rect)` while the element is scrolling through the screen.
 * progress goes from +1 (element just entering from the bottom)
 * to -1 (element just leaving at the top), and is 0 in the middle.
 * Does nothing for people who turned on "reduce motion".
 */
function useScrollProgress(ref, onUpdate) {
  const callback = useRef(onUpdate);
  callback.current = onUpdate;

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    let frame;

    const update = () => {
      const rect = element.getBoundingClientRect();
      const vh = window.innerHeight;
      const raw =
        (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      callback.current(Math.max(-1, Math.min(1, raw)), rect);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
}

/**
 * Moves anything (blob, badge, card) up or down as you scroll.
 * distance > 0  -> moves up while scrolling down (floats slower than page)
 * distance < 0  -> moves the opposite way
 * Don't put Tailwind translate classes on it, use position classes only.
 */
export function Parallax({ distance = 40, className = "", children }) {
  const ref = useRef(null);

  useScrollProgress(ref, (progress) => {
    ref.current.style.transform = `translate3d(0, ${progress * -distance}px, 0)`;
  });

  return (
    <div ref={ref} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
}

/**
 * Image that stays in its frame while the photo inside slides slowly.
 * Give the frame a size with className, e.g. "aspect-[4/5] rounded-3xl".
 */
export function ParallaxImage({
  src,
  alt,
  scale = 1.2,
  className = "",
  imgClassName = "",
  ...rest
}) {
  const boxRef = useRef(null);
  const imgRef = useRef(null);

  useScrollProgress(boxRef, (progress, rect) => {
    // The photo is scaled up, so it can move this far without showing the edge
    const maxShift = (rect.height * (scale - 1)) / 2;
    imgRef.current.style.transform = `translate3d(0, ${
      progress * -maxShift
    }px, 0) scale(${scale})`;
  });

  return (
    <div ref={boxRef} className={`overflow-hidden ${className}`}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        style={{ transform: `scale(${scale})` }}
        className={`h-full w-full object-cover will-change-transform ${imgClassName}`}
        {...rest}
      />
    </div>
  );
}

/**
 * Fades and slides its content up when it scrolls into view.
 * delay is in milliseconds (use it to stagger cards).
 */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-out ${
        shown ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}