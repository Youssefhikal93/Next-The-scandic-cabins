import Image from "next/image";

function getInitials(name) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

// Shows the user's photo when there is one (Google accounts), and their
// initials on a colored disc when there isn't (email/password accounts).
function Avatar({
  name,
  image,
  sizeClasses = "h-10 w-10",
  textClasses = "text-sm",
}) {
  return (
    <div
      className={`relative ${sizeClasses} rounded-full overflow-hidden flex items-center justify-center bg-accent-500 shrink-0`}
    >
      {image ? (
        <Image
          fill
          className="object-cover"
          src={image}
          alt={name ?? "User avatar"}
          referrerPolicy="no-referrer"
        />
      ) : (
        <span
          className={`font-semibold text-primary-800 select-none ${textClasses}`}
        >
          {getInitials(name)}
        </span>
      )}
    </div>
  );
}

export default Avatar;
