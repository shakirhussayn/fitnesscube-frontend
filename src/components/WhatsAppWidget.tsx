export function WhatsAppWidget() {
  const phone = "923372486635";
  const defaultText = encodeURIComponent(
    "Hi FitnessCube! I am visiting your store and would like some assistance with fitness equipment."
  );
  const url = `https://wa.me/${phone}?text=${defaultText}`;

  return (
    <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
        className="group flex items-center gap-2.5 rounded-full bg-card/95 hover:bg-card border border-border/80 pl-1.5 pr-4 py-1.5 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-emerald-500/20 active:scale-95"
      >
        {/* WhatsApp green circle */}
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
          <span className="absolute -inset-0.5 animate-ping rounded-full bg-[#25D366]/40 opacity-75"></span>
          <svg
            className="relative h-5 w-5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.5-1.4-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.02 2.6.13.16 1.78 2.71 4.31 3.8 0 .01.01.01.02.01.6.26 1.07.41 1.44.53.61.19 1.17.17 1.61.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29" />
          </svg>
        </div>

        {/* Text */}
        <span className="text-sm font-semibold text-foreground select-none">
          WhatsApp us
        </span>
      </a>
    </div>
  );
}
