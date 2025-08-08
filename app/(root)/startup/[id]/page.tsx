/* eslint-disable @next/next/no-img-element */
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import View from "@/components/View";
import { renderMarkdown } from "@/lib/markdown";
import { Skeleton } from "@/components/ui/skeleton";

export const experimental_ppr = true;

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const post = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = renderMarkdown(post?.pitch || "");
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
          className="w-full max-w-4xl mx-auto h-[300px] sm:h-[400px] object-cover rounded-xl shadow-lg startup-card_img"
        />

        <div className="space-y-4 mt-8 max-w-4xl mx-auto">
          <div className="flex-between gap-4">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-3 items-center mb-2 card-container p-3 rounded-xl hover:shadow-xl transition-all"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={48}
                height={48}
                className="profile_image"
              />
              <div>
                <p className="text-sm font-semibold text-18-semibold">
                  {post.author.name}
                </p>
                <p className="text-xs text-12-medium">
                  @{post.author.username}
                </p>
              </div>
            </Link>

            <span className="category-tag">{post.category}</span>
          </div>

          <div className="card-container p-6 rounded-xl">
            <h3 className="text-18-bold mb-4 border-b pb-2 divider">
              Pitch Details
            </h3>
            {parsedContent ? (
              <article
                className="prose prose-gray dark:prose-invert max-w-none font-work-sans"
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
