"use client";

export default function BackgroundGrid() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 flex justify-between px-6 md:px-16 lg:px-24">
      <div className="w-[1px] h-full bg-neutral-200/40" />
      <div className="w-[1px] h-full bg-neutral-200/40" />
      <div className="w-[1px] h-full bg-neutral-200/40" />
      <div className="w-[1px] h-full bg-neutral-200/40" />
      <div className="w-[1px] h-full bg-neutral-200/40" />
    </div>
  );
}
