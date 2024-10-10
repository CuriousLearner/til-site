import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Link } from "react-router-dom";

const PostDetail = ({ posts }) => {
  const { path } = useParams();
  const post = posts.find((post) => post.path === path);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div class="container">
      <h1>
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
      </h1>
      <small>
        <strong>Last updated on: </strong>
        {new Date(post.updated_utc).toDateString()} under{" "}
        <strong>
          <Link to={`/topic/${post.topic}`}>{post.topic}</Link>
        </strong>
      </small>
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
  );
};

export default PostDetail;
