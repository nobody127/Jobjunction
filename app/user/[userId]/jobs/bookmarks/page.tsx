export default function MySavedJobs({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  return <div> hi ${params.userId} you have 3posts bookmarked</div>;
}
