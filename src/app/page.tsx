import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="mb-8">
        <p className="text-amber-300 mb-2 text-xs">
          IPA /nɔ.ɛl/ - team player, honest, self motivated
        </p>
        <p className="text-neutral-300 leading-[1.6rem]">
          Hi there, I&apos;m <b className="text-neutral-200">Noel</b> aka{" "}
          <b className="text-neutral-200">codefork</b>. I&apos;m 28 y/o and have
          worked the last 5 years of my career as a data migration engineer. The
          last couple years of my career was spent writing automation scripts
          for data migration processing and to scale these processes across
          numerous servers across different client enviroments and industries
          ranging from healthcare, goverments, banks and law firms.
        </p>
      </section>

      <section className="pb-5">
        <h2 className="mb-2 text-neutral-200 font-bold text-xl">
          The transition to web development
        </h2>
        <p className="text-neutral-300  leading-[1.6rem]">
          In my previous position I assigned myself with creating a solution
          which would allow the team to process data and manage migrations in
          various environments through a web app. During this process I&apos;ve
          fell in love with creating web apps/solutions and listening to user
          feedback.
        </p>
      </section>

      <section className="pb-5 "></section>

      <section className="mb-8">
        <div className="flex items-center justify-between">
          <h3 className="mb-2 text-neutral-200 font-bold text-xl">Projects</h3>
          <Link
            href="/resume"
            className=" text-neutral-200 hover:text-amber-300 flex gap-2 items-baseline text-xl font-semibold transition-colors"
          >
            Resume
            <ExternalLinkIcon size={12} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 text-neutral-300 gap-2">
          <Project
            href="/project/x-clone"
            title="X clone"
            description="Includes realtime post metrics, instant messenger and spaces."
          />
          <Project
            href="/project/x-clone"
            title="X clone"
            description="Includes realtime post metrics, instant messenger and spaces."
          />
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-neutral-200 font-bold text-xl">Blog</h3>
      </section>
    </>
  );
}

type Props = {
  href: string;
  title: string;
  description: string;
};
const Project = ({ href, title, description }: Props) => {
  return (
    <Link href={href}>
      <article className="flex flex-col gap-1 hover:border-amber-300/50 rounded-xl border border-transparent p-4 group transition-colors">
        <p className=" text-neutral-200 font-semibold group-hover:underline transition-colors">
          {title}
        </p>
        <p className="text-sm">{description}</p>
      </article>
    </Link>
  );
};
