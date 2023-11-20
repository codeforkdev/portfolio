import PartySocket from "partysocket";
import BlogHeader from "../_components/BlogHeader";
import Poll from "./_components/Poll";
import Code from "./Highlight";

export default async function Page() {
  const response = await fetch(
    "https://portfolio-party.codeforkdev.partykit.dev",
    {
      next: { revalidate: 0 },
    }
  );
  const poll = await response.json();
  console.log("POLL", poll);
  return (
    <div>
      <BlogHeader
        title="Realtime poll with Partykit & Nextjs"
        publishedAt={new Date()}
      />

      <div className="my-4">
        <Poll poll={poll ?? {}} />
      </div>

      <section>
        <h2 className="text-xl font-semibold">Dependencies</h2>
        <div className="mb-4">
          <p>Init next app</p>
          <Code>npx create-next-app@latest next-poll</Code>
        </div>
        <div className="mb-4">
          <p>Init Partykit into existing app</p>
          <Code>npx partykit@latest init </Code>
        </div>

        <div className="mb-4">
          <p>Install Partykit client</p>
          <Code>npm install partysocket@latest</Code>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Base</h2>
        <div className="mb-4">
          <Code fileName="/src/page.tsx">
            {`
import Poll from "./Poll"
export default function Home() {
  return (
    <main>
      <Poll />
    </main>
    )
}
          `}
          </Code>
        </div>
        <div className="mb-4">
          <Code fileName="/src/Poll.tsx">
            {`
'use client'         
export default function Home() {
  const ws = usePartySocket({
    host: "http://localhost:1999",
  })
  return <button onClick={() => ws.send("hello mom")}>Send</button>
}
          `}
          </Code>
        </div>
        <Code fileName="/party/index.ts">
          {`
import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {
    console.log(conn.id, "connected")
  }

  onMessage(message: string, sender: Party.Connection) {
    console.log(sender.id, "sent", message)
  }
}

Server satisfies Party.Worker;
          `}
        </Code>
      </section>
    </div>
  );
}
