export default function Avatar({ name, id, size = "md" }) {
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  const hue = (id * 47) % 360;
  const dim = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-14 h-14 text-xl" : "w-10 h-10 text-sm";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center font-bold flex-shrink-0`}
      style={{ background: `hsl(${hue},60%,88%)`, color: `hsl(${hue},50%,32%)` }}
    >
      {initials}
    </div>
  );
}
