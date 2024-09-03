export default function MyPosts({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  return <div> hi ${params.userId} you have 3posts</div>;
}
