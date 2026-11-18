import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Meeting } from "@/lib/supabase";
import MeetingCard from "@/components/MeetingCard";
// Always load the latest meetings from the database on each visit,
// instead of showing a copy frozen at the last deploy.
export const dynamic = "force-dynamic";


async function getMeetings() {
  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("status", "published")
    .order("meeting_date", { ascending: false })
    .limit(6);

  if (error) {
    console.error(error);
    return [];
  }
  return data as Meeting[];
}

export default async function Home() {
  const meetings = await getMeetings();
  const [latest, ...rest] = meetings;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <section className="mb-14">
        <p className="font-serif text-sm uppercase tracking-[0.18em] text-brass mb-3">
          The Township Record
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold text-harbor-deep leading-tight mb-4">
          Brownstown's board meetings,
          <br />
          read or heard — your choice.
        </h1>
        <p className="text-ink-soft text-lg max-w-2xl">
          Draft minutes and a friendly recap podcast from every Brownstown Charter Township board meeting, kept here for any resident to read or listen to. Minutes remain drafts until the Board approves them, and the approved minutes from the township are the official record.
        </p>
      </section>

      {latest ? (
        <section className="mb-16">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft mb-4">
            Most Recent Meeting
          </h2>
          <MeetingCard meeting={latest} featured />
        </section>
      ) : (
        <section className="mb-16 rounded-lg border border-dashed border-mist bg-paper-raised p-10 text-center">
          <p className="font-serif text-lg text-harbor-deep mb-2">
            No meetings have been published yet
          </p>
          <p className="text-ink-soft text-sm">
            Check back after the next board meeting — minutes and a recap
            podcast will appear here.
          </p>
        </section>
      )}

      {rest.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
              Recent Meetings
            </h2>
            <Link
              href="/meetings"
              className="text-sm font-medium text-harbor hover:text-harbor-deep transition-colors"
            >
              View full archive →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {rest.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
