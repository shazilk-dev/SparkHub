/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import View from "@/components/View";

import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";

const md = markdownit();

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "");
  console.log(formatDate(post?._createdAt));
  return (
    <>
      <section className="hero_container">
        <p className="tag">{formatDate(post?._createdAt)}</p>

        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-3xl">{post.description}</p>
      </section>

      <section className="section_container">
        <Image
          src={post.image || "https://placehold.co/800x400"}
          alt="startup thumbnail"
          width={800}
          height={400}
          className="w-full h-auto rounded-xl border border-glass-border"
        />

        <div className="space-y-3 mt-6 max-w-4xl mx-auto">
          {" "}
          {/* Reduced spacing and margin */}
          <div className="flex-between gap-3">
            {" "}
            {/* Reduced gap from 4 to 3 */}
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-2 glass-container p-2 rounded-xl hover:bg-glass-medium transition-all" /* Reduced gap, margin, and padding */
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={40} // Reduced from 48 to 40
                height={40} // Reduced from 48 to 40
                className="rounded-full border border-primary/30"
              />
              <div>
                <p className="text-14-medium text-white font-semibold">
                  {post.author.name}
                </p>
                <p className="text-12-medium text-dark-400">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <div className="glass-container p-4 rounded-xl">
            {" "}
            {/* Reduced padding from p-6 to p-4 */}
            <h3 className="text-18-bold text-white mb-3">Pitch Details</h3>{" "}
            {/* Reduced margin from mb-4 to mb-3 */}
            {parsedContent ? (
              <article
                className="prose prose-invert max-w-none font-work-sans break-words text-dark-200"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />
            ) : (
              <p className="no-result">No details provided</p>
            )}
          </div>
        </div>

        <hr className="divider" />

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default page;

// import { Suspense } from "react";
// import { client } from "@/sanity/lib/client";
// import {
//   PLAYLIST_BY_SLUG_QUERY,
//   STARTUP_BY_ID_QUERY,
// } from "@/sanity/lib/queries";
// import { notFound } from "next/navigation";
// import { formatDate } from "@/lib/utils";
// import Link from "next/link";
// import Image from "next/image";

// import markdownit from "markdown-it";
// import { Skeleton } from "@/components/ui/skeleton";
// import View from "@/components/View";
// import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

// const md = markdownit();

// export const experimental_ppr = true;

// const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
//   const id = (await params).id;

//   const [post, { select: editorPosts }] = await Promise.all([
//     client.fetch(STARTUP_BY_ID_QUERY, { id }),
//     client.fetch(PLAYLIST_BY_SLUG_QUERY, {
//       slug: "editor-picks-new",
//     }),
//   ]);

//   if (!post) return notFound();

//   const parsedContent = md.render(post?.pitch || "");

//   return (
//     <>
//       <section className="pink_container !min-h-[230px]">
//         <p className="tag">{formatDate(post?._createdAt)}</p>

//         <h1 className="heading">{post.title}</h1>
//         <p className="sub-heading !max-w-5xl">{post.description}</p>
//       </section>

//       <section className="section_container">
//         <img
//           src={post.image}
//           alt="thumbnail"
//           className="w-full h-auto rounded-xl"
//         />

//         <div className="space-y-5 mt-10 max-w-4xl mx-auto">
//           <div className="flex-between gap-5">
//             <Link
//               href={`/user/${post.author?._id}`}
//               className="flex gap-2 items-center mb-3"
//             >
//               <Image
//                 src={post.author.image}
//                 alt="avatar"
//                 width={64}
//                 height={64}
//                 className="rounded-full drop-shadow-lg"
//               />

//               <div>
//                 <p className="text-20-medium">{post.author.name}</p>
//                 <p className="text-16-medium !text-black-300">
//                   @{post.author.username}
//                 </p>
//               </div>
//             </Link>

//             <p className="category-tag">{post.category}</p>
//           </div>

//           <h3 className="text-30-bold">Pitch Details</h3>
//           {parsedContent ? (
//             <article
//               className="prose max-w-4xl font-work-sans break-all"
//               dangerouslySetInnerHTML={{ __html: parsedContent }}
//             />
//           ) : (
//             <p className="no-result">No details provided</p>
//           )}
//         </div>

//         <hr className="divider" />

//         {editorPosts?.length > 0 && (
//           <div className="max-w-4xl mx-auto">
//             <p className="text-30-semibold">Editor Picks</p>

//             <ul className="mt-7 card_grid-sm">
//               {editorPosts.map((post: StartupTypeCard, i: number) => (
//                 <StartupCard key={i} post={post} />
//               ))}
//             </ul>
//           </div>
//         )}

//         <Suspense fallback={<Skeleton className="view_skeleton" />}>
//           <View id={id} />
//         </Suspense>
//       </section>
//     </>
//   );
// };

// export default Page;
