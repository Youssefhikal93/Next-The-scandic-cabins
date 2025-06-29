import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr] md:gap-20 border border-primary-800 py-6 px-6 md:py-3 md:px-10 mb-16 md:mb-24">
      {/* Image - Full width on mobile, 3fr on desktop */}
      <div className="relative h-90 md:h-auto md:scale-[1.15] md:-translate-x-3">
        <Image
          className="object-cover rounded-lg"
          fill
          src={image}
          alt={`Cabin ${name}`}
        />
      </div>

      {/* Content - Full width on mobile, 4fr on desktop */}
      <div className="md:mt-10">
        {/* Title - Adjusted for mobile */}
        <h3 className="text-accent-100 font-black text-4xl sm:text-5xl md:text-7xl md:translate-x-[-254px] translate-y-[-90px] md:translate-0 md:mb-5 bg-primary-950 p-4 md:p-6 md:pb-1 w-full md:w-[150%]">
          Cabin {name}
        </h3>

        {/* Description - Adjusted text size for mobile */}
        <p className="text-base md:text-lg text-primary-300 mb-8 md:mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        {/* Features List - Stacked with adjusted spacing */}
        <ul className="flex flex-col gap-5 md:gap-4 mb-6 md:mb-7">
          <li className="flex gap-3 items-start md:items-center">
            <UsersIcon className="h-5 w-5 text-primary-600 mt-1 md:mt-0" />
            <span className="text-base md:text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-start md:items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600 mt-1 md:mt-0" />
            <span className="text-base md:text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Nordic</span> (lands)
            </span>
          </li>
          <li className="flex gap-3 items-start md:items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600 mt-1 md:mt-0" />
            <span className="text-base mt-1 md:text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Cabin;
