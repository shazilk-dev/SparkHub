const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          {" "}
          {/* Reduced from 13px to 11px for compact design */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 shadow-glow"></span>
          <span className="relative inline-flex size-[9px] rounded-full bg-primary shadow-glow"></span>{" "}
          {/* Reduced from 11px to 9px */}
        </span>
      </div>
    </div>
  );
};

export default Ping;
