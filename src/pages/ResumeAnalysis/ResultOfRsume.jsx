import React, { useEffect, useState } from "react";

const ResultOfRsume = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts") // Fetch 100 posts
      .then((response) => response.json())
      .then((json) => {
        setPosts(json);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCopyAll = () => {
    if (posts.length > 0) {
      const allText = posts
        .map((post, index) => `Post ${index + 1}:\nTitle: ${post.title}\nBody: ${post.body}\n\n`)
        .join("");

      navigator.clipboard.writeText(allText)
        .then(() => alert("All 100 posts copied to clipboard!"))
        .catch((err) => console.error("Failed to copy:", err));
    }
  };

  return (
    <div className="p-5 max-w-6xl my-10 mx-auto bg-white shadow-lg rounded-lg">
      <div className="sticky top-0 bg-white p-4 shadow-md z-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Fetch & Copy 100 Posts</h1>

        
        <button
          onClick={handleCopyAll}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Copy All 100 Posts
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center mt-5">Loading...</p>
      ) : (
        <div className="flex flex-col gap-4 mt-5">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex w-full items-center bg-gray-50 border-l-4 border-blue-600 p-4 shadow-md rounded-md transition transform hover:-translate-y-1"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-gray-700 mt-2">{post.body}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultOfRsume;
