import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";
import Link from "next/link";

export default async function Page() {
  const cabins = await getCabins();
  const cabinsNumber = cabins.length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-x-12 lg:gap-x-24 md:gap-y-16 lg:gap-y-32 text-base md:text-lg items-center px-4 sm:px-6 lg:px-8 py-8 md:py-12 max-w-7xl mx-auto">
      {/* First Text Block - spans 3 cols on desktop */}
      <div className="col-span-1 md:col-span-3 order-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
          Welcome to The Scandic Cabins
        </h1>

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <p>
            Where nature&apos;s beauty and comfortable living blend seamlessly.
            Hidden away in the heart of the noridc lands, this is your paradise
            away from home.
          </p>
          <p>
            Our {cabinsNumber} luxury cabins provide a cozy base, but the real
            freedom and peace you&apos;ll find in the surrounding mountains.
          </p>
          <p>
            This is where memorable moments are made, surrounded by
            nature&apos;s splendor.
          </p>
        </div>
      </div>

      {/* First Image - spans 2 cols on desktop */}
      <div className="col-span-1 md:col-span-2 order-2">
        <Image
          src={image1}
          alt="Family at cabin"
          placeholder="blur"
          quality={80}
          className="w-full h-auto rounded-lg"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
      </div>

      {/* Second Image - spans 2 cols on desktop */}
      <div className="col-span-1 md:col-span-2 order-3 sm:order-4 md:order-3 relative aspect-square">
        <Image
          src={image2}
          alt="Cabin owners family"
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
      </div>

      {/* Second Text Block - spans 3 cols on desktop */}
      <div className="col-span-1 md:col-span-3 order-4 sm:order-3 md:order-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>

        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          <p>
            Since 1962, The Scandic Cabins has been a cherished family-run
            retreat, nurtured with love and care.
          </p>
          <p>
            Here, you&apos;re not just a guest, you&apos;re part of our extended
            family.
          </p>

          <div className="pt-4">
            <Link
              href="/cabins"
              className="inline-block bg-accent-500 px-6 py-3 md:px-8 md:py-4 text-primary-800 text-base md:text-lg font-semibold hover:bg-accent-600 transition-all rounded-lg"
            >
              Explore our luxury cabins
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
