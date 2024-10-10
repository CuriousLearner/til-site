import React from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./Posts.css";

const Posts = ({ posts }) => {
  return (
    <>
      <div className="container">
        <h1>TIL (Today I learned)</h1>
        <p>
          A collection of small tips that I learn every day and want to document
          for future reference. {posts.length} TILs 🤓 so far.
        </p>
        <div className="posts">
          {posts.map((post) => (
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
                <strong>
                  <Link to={`/topic/${post.topic}`}>{post.topic}</Link>
                </strong>
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
    </>
  );
};

export default Posts;
