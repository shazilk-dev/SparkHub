const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          {" "}
          {/* Reduced from 13px to 11px for compact design */}
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50 shadow-clean"></span>
          <span className="relative inline-flex size-[9px] rounded-full bg-primary shadow-clean"></span>{" "}
          {/* Clean shadows instead of glow */}
        </span>
      </div>
    </div>
  );
};

export default Ping;
