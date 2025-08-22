// components/FeaturedPosts.jsx
import { Calendar, MessageSquare } from "lucide-react";

const posts = [
  {
    id: 1,
    image: "/images/post1.jpg",
    title: "Loudest à la Madision #1 (L’integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
    tags: ["Google", "Trending", "New"],
    isNew: true,
  },
  {
    id: 2,
    image: "/images/post2.jpg",
    title: "Loudest à la Madision #1 (L’integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
    tags: ["Google", "Trending", "New"],
    isNew: true,
  },
  {
    id: 3,
    image: "/images/post3.jpg",
    title: "Loudest à la Madision #1 (L’integral)",
    description:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: 10,
    tags: ["Google", "Trending", "New"],
    isNew: true,
  },
];

const FeaturedPosts = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {/* Title */}
      <div className="text-center mb-10">
        <p className="text-blue-500 font-medium">Practice Advice</p>
        <h2 className="text-3xl font-bold mb-2">Featured Posts</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Problems trying to resolve the conflict between the two major realms of
          Classical physics: Newtonian mechanics
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
          >
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              {post.isNew && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                  NEW
                </span>
              )}
            </div>
            <div className="p-5">
              {/* Tags */}
              <div className="flex space-x-3 text-sm text-gray-400 mb-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="hover:text-blue-500 cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{post.description}</p>

              {/* Footer */}
              <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar size={16} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MessageSquare size={16} />
                  <span>{post.comments} comments</span>
                </div>
              </div>

              {/* Learn More */}
              <a
                href="#"
                className="text-blue-500 text-sm font-medium flex items-center space-x-1"
              >
                <span>Learn More</span>
                <span>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
