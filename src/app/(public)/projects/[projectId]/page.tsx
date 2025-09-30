export default async function BlogDetailsPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;

  return <div className=""></div>;
}
