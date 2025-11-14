"use client";

export default function GuardedPlay({ audioPath, label, className }) {
  const handleClick = () => {
    // For now, just log so we know it works.
    // Later we’ll plug in your real audio player logic here.
    console.log("Play meditation:", audioPath);
    alert("This is where your meditation would play. We’ll wire the real player next.");
  };

  return (
    <button type="button" className={className} onClick={handleClick}>
      {label || "Play"}
    </button>
  );
}
