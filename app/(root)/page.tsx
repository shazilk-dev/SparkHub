import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUP_QUERY } from "@/sanity/lib/queries";

import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();
  console.log(session?.id);

  const { data: post } = await sanityFetch({ query: STARTUP_QUERY, params });

  console.log(JSON.stringify(post, null, 2));

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
          {" "}
          {/* Reduced margin from mt-6 to mt-4 */}
          {post?.length > 0 ? (
            post.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No Startups Found</p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
