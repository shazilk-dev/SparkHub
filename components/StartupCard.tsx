import { cn, formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";

export type StartupTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1 items-center">
          {" "}
          {/* Reduced gap from 1.5 to 1 */}
          <EyeIcon className="size-3 text-primary" />{" "}
          {/* Reduced from size-4 to size-3 */}
          <span className="text-12-medium text-dark-400">{views}</span>
        </div>
      </div>

      <div className="flex-between mt-3 gap-2">
        {" "}
        {/* Reduced margin and gap */}
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-12-medium line-clamp-1 text-dark-400">
              {author?.name}
            </p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-16-semibold line-clamp-1 text-white mt-0.5">
              {title}
            </h3>{" "}
            {/* Reduced margin */}
          </Link>
        </div>
        <Link href={`/user/${author?._id}`}>
          <Image
            src={author?.image || "https://placehold.co/32x32"}
            alt={author?.name || "User"}
            width={28} // Reduced from 32 to 28
            height={28} // Reduced from 32 to 28
            className="rounded-full border border-primary/30"
          />
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className="startup-card_desc">{description}</p>
        <Image
          src={image || "https://placehold.co/400x200"}
          alt="startup"
          width={400}
          height={200}
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between gap-2 mt-3">
        {" "}
        {/* Reduced gap and margin */}
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-12-medium text-primary hover:text-secondary transition-colors">
            {category}
          </p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="startup-card_skeleton" />
      </li>
    ))}
  </>
);

export default StartupCard;
