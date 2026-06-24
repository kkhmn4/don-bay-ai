export default function Loading() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-5">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-hairline" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-deep-teal animate-spin" />
        </div>
        <p className="font-sans text-mist" style={{ fontSize: "15px" }}>
          Đang tải...
        </p>
      </div>
    </div>
  );
}
