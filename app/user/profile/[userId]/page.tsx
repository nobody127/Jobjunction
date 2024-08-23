export default function UserProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  return <div>hello {params.userId}</div>;
}
