import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

import { StartupTypeCard } from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { auth } from "@/auth";

// Disable static generation for this page to ensure fresh data
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log("Session ID:", session?.id);

  // Use direct client fetch with no CDN for fresh data and add timestamp to force refresh
  const post = await client
    .withConfig({
      useCdn: false,
      perspective: "published",
      stega: false,
    })
    .fetch(STARTUP_QUERY, {
      ...params,
      // Add timestamp to bypass any caching
      _timestamp: Date.now(),
    });

  console.log("Fetched startups count:", post?.length);
  console.log(
    "Fetched startups:",
    JSON.stringify(
      post.map((p: any) => ({
        id: p._id,
        title: p.title,
        created: p._createdAt,
      })),
      null,
      2
    )
  );

  return (
    <>
      <section className="hero_container">
        <h1 className="heading">
          Pitch your startup, <br /> connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-lg">
          {" "}
          {/* Reduced from max-w-2xl to max-w-lg */}
          Submit Ideas, Vote on Pitches, Get Noticed in Virtual Competitions
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-18-semibold">
          {query ? `Search Results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-4 card_grid">
          {post?.length > 0 ? (
            post.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No Startups Found</p>
          )}
        </ul>
      </section>
    </>
  );
}
