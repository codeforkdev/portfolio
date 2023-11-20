"use client";

import usePartySocket from "partysocket/react";
import { Poll } from "../../../../../party/poll";
import { useEffect, useState } from "react";

export default function Poll({ poll }: { poll: Record<string, number> }) {
  const [livePoll, setLivePoll] = useState(poll);
  const [votes, setVotes] = useState(
    Object.values(poll).reduce((acc, curr) => (acc += curr), 0)
  );
  const ws = usePartySocket({
    host: "https://portfolio-party.codeforkdev.partykit.dev",
    // host: "http://localhost:1999",
    room: "test",
    party: "poll",
    onMessage: (evt) => {
      const poll = JSON.parse(evt.data) as Poll;
      setLivePoll(poll);
      setVotes(Object.values(poll).reduce((acc, curr) => (acc += curr), 0));
    },
    onClose: () => {},
  });

  const handleVote = (option: string) => ws.send(option);
  return (
    <>
      <div className="flex justify-center gap-6 ">
        <button onClick={() => handleVote("1")}>option 1</button>
        <button onClick={() => handleVote("2")}>option 2</button>
        <button onClick={() => handleVote("3")}>option 3</button>
        <button onClick={() => handleVote("4")}>option 4</button>
      </div>

      <div>
        <Progress totalVotes={votes} votes={livePoll["1"]} />
        <Progress totalVotes={votes} votes={livePoll["2"]} />
        <Progress totalVotes={votes} votes={livePoll["3"]} />
        <Progress totalVotes={votes} votes={livePoll["4"]} />
      </div>
    </>
  );
}

const Progress = ({
  totalVotes,
  votes,
}: {
  totalVotes: number;
  votes: number;
}) => {
  if (!votes || !totalVotes) {
  }
  const progress =
    !votes || !totalVotes ? 0 : Math.floor((votes / totalVotes) * 100);
  return (
    <div className="border relative  w-full">
      <div
        className="h-10 bg-blue-500 w-full top-0 left-0 transition-all duration-1000 "
        style={{ width: `${progress > 0 ? progress : 0.5}%` }}
      />
      <div className="absolute h-full w-full top-0 left-0 flex justify-between items-center px-2">
        <p>votes {votes ?? 0}</p>
        <p>{progress}%</p>
      </div>
    </div>
  );
};
