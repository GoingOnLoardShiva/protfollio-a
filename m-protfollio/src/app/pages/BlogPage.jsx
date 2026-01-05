"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/blogproxy");

        if (!response.ok) {
          console.error("API Error:", response.status);
          return;
        }

        const data = await response.json();
        setPosts(data.post); // ✅ correct key
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <main className="bg-[#0f0f0f] px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-white">
            Latest Blogs
          </h1>
          <p className="text-gray-400 mt-2">
            Thoughts, tutorials & development notes
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.slice(0, 6).map((post) => (
            <article
              key={post._id}
              className="group rounded-xl border border-white/10 bg-[#131313] overflow-hidden transition hover:border-indigo-500/50"
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image || "/default-banner.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-lg font-medium text-white mb-2 group-hover:text-indigo-400 transition">
                  {post.title}
                </h2>

                <p className="text-xs text-gray-400 mb-3">
                  Hiren Ray •{" "}
                  {new Date(post.createdAt).toDateString()}
                </p>

                <p className="text-sm text-gray-300 line-clamp-3">
                  {post.content}
                </p>

                <div className="mt-4">
                  <a
                    href={`https://webnews-psi.vercel.app/blogs/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-400 hover:underline"
                  >
                    Read more →
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <a
            href="https://webnews-psi.vercel.app/categories/all"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-indigo-500 px-6 py-2 text-indigo-400 hover:bg-indigo-500 hover:text-white transition"
          >
            View All Blogs →
          </a>
        </div>
      </div>
    </main>
  );
}
