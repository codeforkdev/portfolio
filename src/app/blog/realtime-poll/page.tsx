import PartySocket from "partysocket";
import BlogHeader from "../_components/BlogHeader";
import Poll from "./_components/Poll";

export default async function Page() {
  const response = await fetch("http://localhost:1999/parties/poll/test", {
    next: { revalidate: 0 },
  });
  const poll = await response.json();
  console.log("POLL", poll);
  return (
    <div>
      <BlogHeader
        title="Realtime poll with Partykit & Nextjs"
        publishedAt={new Date()}
      />

      <Poll poll={poll ?? {}} />
    </div>
  );
}
