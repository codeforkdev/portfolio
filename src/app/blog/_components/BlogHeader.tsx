export const BlogHeader = ({
  title,
  publishedAt,
}: {
  title: string;
  publishedAt: Date;
}) => {
  return (
    <>
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p>
        {publishedAt.toLocaleDateString("en-us", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        })}
      </p>
    </>
  );
};

export default BlogHeader;
