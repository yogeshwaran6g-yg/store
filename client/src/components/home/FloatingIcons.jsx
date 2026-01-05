export default function FloatingIcons() {
  return (
    <>
      <span className="absolute top-20 left-20 w-3 h-3 bg-orange-400 rounded-full animate-floatSlow" />
      <span className="absolute top-40 right-32 w-2 h-2 bg-white rounded-full opacity-80 animate-floatFast" />
      <span className="absolute bottom-40 left-1/3 w-3 h-3 bg-orange-300 rounded-full animate-floatMedium" />
      <span className="absolute top-1/3 right-1/4 w-2 h-2 bg-white opacity-60 rounded-full animate-floatSlow" />
    </>
  );
}
