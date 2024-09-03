export default function DestoryAccount({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  return <div> hi ${params.userId} you can delete Account</div>;
}
