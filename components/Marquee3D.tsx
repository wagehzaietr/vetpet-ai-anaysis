import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

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
    img: "https://avatar.vercel.sh/sarah",
    rating: 5,
    petType: "🐕",
  },
  {
    name: "Mike Chen",
    username: "@mikechen",
    body: "My cat was acting strange and PetCare AI immediately flagged it as urgent. Turned out to be serious - so grateful!",
    img: "https://avatar.vercel.sh/mike",
    rating: 5,
    petType: "🐱",
  },
  {
    name: "Emma Rodriguez",
    username: "@emmarodriguez",
    body: "As a new pet parent, this AI gives me peace of mind. Quick, accurate, and so easy to use!",
    img: "https://avatar.vercel.sh/emma",
    rating: 5,
    petType: "🐕",
  },
  {
    name: "David Thompson",
    username: "@davidthompson",
    body: "Helped me understand my puppy's symptoms weren't serious. Saved me anxiety and an unnecessary vet trip.",
    img: "https://avatar.vercel.sh/david",
    rating: 5,
    petType: "🐕",
  },
  {
    name: "Lisa Wang",
    username: "@lisawang",
    body: "The symptom checker is incredibly detailed. It knew exactly what questions to ask about my cat's behavior.",
    img: "https://avatar.vercel.sh/lisa",
    rating: 5,
    petType: "🐱",
  },
  {
    name: "James Parker",
    username: "@jamesparker",
    body: "PetCare AI is like having a vet in your pocket. The assessments are spot-on and the advice is practical.",
    img: "https://avatar.vercel.sh/james",
    rating: 5,
    petType: "🐕",
  },
  {
    name: "Ana Garcia",
    username: "@anagarcia",
    body: "My rescue dog had mysterious symptoms. This AI helped me prepare better questions for the vet visit.",
    img: "https://avatar.vercel.sh/ana",
    rating: 5,
    petType: "🐕",
  },
  {
    name: "Tom Wilson",
    username: "@tomwilson",
    body: "Free, fast, and accurate. This tool should be bookmarked by every pet parent. Absolutely essential!",
    img: "https://avatar.vercel.sh/tom",
    rating: 5,
    petType: "🐱",
  },
  {
    name: "Rachel Green",
    username: "@rachelgreen",
    body: "The AI picked up on subtle signs I missed. My cat's health issue was caught early thanks to this tool.",
    img: "https://avatar.vercel.sh/rachel",
    rating: 5,
    petType: "🐱",
  },
  {
    name: "Kevin Brown",
    username: "@kevinbrown",
    body: "Brilliant technology! The health assessments are comprehensive and the emergency alerts are life-saving.",
    img: "https://avatar.vercel.sh/kevin",
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
        "border-gray-200 hover:bg-white/90 hover:shadow-xl",
        // dark styles
        "dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800/90",
        "transition-all duration-300"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-3">
        <img className="rounded-full ring-2 ring-blue-100" width="48" height="48" alt="" src={img} />
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

      <blockquote className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        "{body}"
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