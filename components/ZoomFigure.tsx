"use client";

import { useRef } from "react";
import Image from "next/image";
import type { ProjectImage } from "@/content/projects";

// Click-to-enlarge figure built on the native <dialog> element: no library.
// The browser provides the backdrop, Escape to close, focus trapping while
// open, and returns focus to the thumbnail on close.
export default function ZoomFigure({ image }: { image: ProjectImage }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => dialogRef.current?.close();
  const onClosed = () => {
    document.documentElement.style.overflow = "";
  };

  const variants: { src: string; visibility: string }[] = image.darkSrc
    ? [
        { src: image.src, visibility: "dark:hidden" },
        { src: image.darkSrc, visibility: "hidden dark:block" },
      ]
    : [{ src: image.src, visibility: "" }];

  return (
    <figure>
      <button
        type="button"
        onClick={open}
        aria-label={`Enlarge image: ${image.alt}`}
        className="block w-full cursor-zoom-in rounded-2xl"
      >
        {variants.map((v) => (
          <Image
            key={v.src}
            src={v.src}
            alt=""
            width={1600}
            height={900}
            className={`w-full rounded-2xl border border-border object-cover ${v.visibility}`}
          />
        ))}
      </button>
      <figcaption className="mt-2 text-xs text-muted">
        {image.alt} · Tap to enlarge
      </figcaption>

      <dialog
        ref={dialogRef}
        onClose={onClosed}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        aria-label={image.alt}
        className="m-auto max-h-[94vh] w-[min(96vw,1500px)] overflow-visible bg-transparent p-0 backdrop:bg-black/85"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="flex w-full justify-end">
            <button
              type="button"
              onClick={close}
              aria-label="Close enlarged image"
              className="inline-flex h-11 min-w-11 items-center justify-center rounded-[10px] border border-border bg-card px-4 text-sm font-medium text-heading transition-colors hover:border-accent hover:text-accent"
            >
              Close ✕
            </button>
          </div>
          {variants.map((v) => (
            <Image
              key={v.src}
              src={v.src}
              alt={image.alt}
              width={1600}
              height={900}
              sizes="96vw"
              quality={90}
              className={`h-auto max-h-[78vh] w-auto max-w-full rounded-xl border border-border bg-card object-contain ${v.visibility}`}
            />
          ))}
          <p className="text-center text-sm text-white/80">{image.alt}</p>
        </div>
      </dialog>
    </figure>
  );
}
