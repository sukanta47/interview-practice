import React, { useState, useRef, useEffect } from "react";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const InfiniteScroll = () => {
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);
  const POSTS_PER_PAGE = 10;

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${POSTS_PER_PAGE}`
        );
        const data = await res.json();

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) => [...prev, ...data]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    })();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    });
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-pink-600">
        Infinite Scroll Posts
      </h1>
      <div className="posts-list">
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              margin: "10px",
            }}
          >
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
      <div ref={loader} style={{ height: "20px", margin: "10px" }}>
        {loading && <p>Loading more posts...</p>}
        {!hasMore && !loading && <p>You have reached the end!</p>}
      </div>
    </div>
  );
};
export default InfiniteScroll;
