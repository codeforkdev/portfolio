import type * as Party from "partykit/server";

export type Poll = Record<string, number>;
export default class Server implements Party.Server {
  constructor(readonly party: Party.Party) {}

  async onConnect(conn: Party.Connection, ctx: Party.ConnectionContext) {}

  async onMessage(message: string, sender: Party.Connection) {
    // check if poll exists
    const existingPoll = await this.party.storage.get<Poll>("poll");

    if (!existingPoll) {
      // init poll if not exists
      const newPoll = {} as Poll;
      newPoll[message] = 1;
      await this.party.storage.put("poll", newPoll);
    } else {
      // check if option exists if not append option to poll
      const option = existingPoll[message];
      if (!option) {
        existingPoll[message] = 1;
      } else {
        // option exists, increment vote by 1
        existingPoll[message] += 1;
      }
      await this.party.storage.put("poll", existingPoll);
    }

    const updatedPoll = await this.party.storage.get("poll");

    this.party.broadcast(JSON.stringify(updatedPoll));
  }

  async onRequest(request: Party.Request) {
    if (request.method === "GET") {
      const poll = await this.party.storage.get("poll");
      return new Response(JSON.stringify(poll ?? {}));
    }

    return new Response("Method not allowed", { status: 405 });
  }
}

Server satisfies Party.Worker;
