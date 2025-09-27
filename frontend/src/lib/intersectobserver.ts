export type IntersectOpts = {
  onEnter?: () => void;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};

export function intersect(node: Element, opts: IntersectOpts = {}) {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) opts.onEnter?.();
    },
    {
      root: opts.root ?? null,
      rootMargin: opts.rootMargin ?? '0px',
      threshold: opts.threshold ?? 0,
    }
  );
  observer.observe(node);

  return {
    update(newOpts: IntersectOpts) 
    { opts = newOpts; },
    destroy() { observer.disconnect(); }
  };
}