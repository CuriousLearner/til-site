import React from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Posts.css";

const TopicPosts = ({ posts }) => {
  const { topic } = useParams(); // get the topic from URL
  const filteredPosts = posts.filter((post) => post.topic === topic); // filter posts by topic

  if (filteredPosts.length === 0) {
    return <div>No posts found under the topic: {topic}</div>;
  }

  return (
    <div className="container">
      <h1>Posts under "{topic}"</h1>
      <div className="posts">
        {filteredPosts.map((post) => (
          <div className="card" key={post.path}>
            <h3 className="card-title">
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={dark}
                        language={match[1]}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.title}
              </ReactMarkdown>
            </h3>
            <small className="card-subtitle text-muted">
              <strong>Last updated on: </strong>
              {new Date(post.updated_utc).toDateString()} under{" "}
              <strong>{post.topic}</strong>
            </small>
            <div className="card-body">
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={dark}
                        language={match[1]}
                        PreTag="div"
                        children={String(children).replace(/\n$/, "")}
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>
            <Link to={`/${post.path}`} className="btn btn-primary">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicPosts;
