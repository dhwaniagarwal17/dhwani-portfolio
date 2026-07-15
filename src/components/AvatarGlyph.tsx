export default function AvatarGlyph() {
  return (
    <svg viewBox="0 0 400 480" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="avatarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#646973" />
          <stop offset="100%" stopColor="#BBCCD7" />
        </linearGradient>
        <linearGradient id="avatarGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B600A8" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7621B0" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="440" rx="150" ry="24" fill="#000" opacity="0.4" />
      <path
        d="M200 20 C270 20 320 80 320 160 C320 220 300 260 280 290 C330 320 360 380 360 460 L40 460 C40 380 70 320 120 290 C100 260 80 220 80 160 C80 80 130 20 200 20 Z"
        fill="url(#avatarGrad2)"
      />
      <circle cx="200" cy="150" r="95" fill="url(#avatarGrad)" opacity="0.9" />
      <path
        d="M200 250 C120 250 70 320 70 460 L330 460 C330 320 280 250 200 250 Z"
        fill="url(#avatarGrad)"
        opacity="0.75"
      />
    </svg>
  );
}
