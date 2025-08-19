import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";

interface Review {
  img: string;
  name: string;
  username: string;
  body: string;
  rating: number;
  petType: string;
}

const reviews: Review[] = [
  {
    name: "Sarah Miller",
    username: "@sarahmiller",
    body: "PetCare AI caught my dog's infection symptoms early. The vet confirmed everything - saved us a costly emergency visit!",
    img: "https://freesvg.org/img/Sleeping-Cat.png",
    rating: 5,
    petType: "🐕",
  },
  {
    name: "Mike Chen",
    username: "@mikechen",
    body: "My cat was acting strange and PetCare AI immediately flagged it as urgent. Turned out to be serious - so grateful!",
    img: "https://freesvg.org/img/Beagle-1-by-Merlin2525-small.png",
    rating: 5,
    petType: "🐱",
  },
  {
    name: "Emma Rodriguez",
    username: "@emmarodriguez",
    body: "As a new pet parent, this AI gives me peace of mind. Quick, accurate, and so easy to use!",
    img: "https://freesvg.org/img/gato-1.png",
    rating: 5,
    petType: "🐕",
  },
];

const firstRow: Review[] = reviews.slice(0, Math.ceil(reviews.length / 4));
const secondRow: Review[] = reviews.slice(
  Math.ceil(reviews.length / 4),
  Math.ceil(reviews.length / 2)
);
const thirdRow: Review[] = reviews.slice(
  Math.ceil(reviews.length / 2),
  Math.ceil((3 * reviews.length) / 4)
);
const fourthRow: Review[] = reviews.slice(Math.ceil((3 * reviews.length) / 4));

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating,
  petType,
}: Review) => {
  return (
    <figure
      className={cn(
        "relative h-fit w-80 cursor-pointer overflow-hidden rounded-2xl border p-6 shadow-lg",
        // light styles
        "border-gray-200 hover:bg-secondary/10 hover:shadow-xl",
        // dark styles
        "dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800/90",
        "transition-all duration-300"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-3">
        <Image className="rounded-full ring-2 ring-blue-100" width={500} height={500} alt="users-images" src={img} />
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <figcaption className="text-base font-semibold text-gray-900 dark:text-white">
              {name}
            </figcaption>
            <span className="text-lg">{petType}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{username}</p>
        </div>
      </div>

      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      <blockquote className="text-sm text-text dark:text-gray-300 leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
};

export function Marquee3D() {
  return (
    <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        <Marquee pauseOnHover vertical className="[--duration:25s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]" vertical>
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee pauseOnHover className="[--duration:25s]" vertical>
          {thirdRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:25s]" vertical>
          {fourthRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-[#151515]"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#151515]"></div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[#151515]"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[#151515]"></div>
    </div>
  );
}