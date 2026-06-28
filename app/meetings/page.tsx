import { supabase } from "@/lib/supabase";
import type { Meeting } from "@/lib/supabase";
import MeetingCard from "@/components/MeetingCard";

async function getMeetings() {
  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("status", "published")
    .order("meeting_date", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data as Meeting[];
}

export default async function MeetingsArchive() {
  const meetings = await getMeetings();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="font-serif text-sm uppercase tracking-[0.18em] text-brass mb-2">
        Full Record
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-harbor-deep mb-8">
        Meeting Archive
      </h1>

      {meetings.length === 0 ? (
        <div className="rounded-lg border border-dashed border-mist bg-paper-raised p-10 text-center">
          <p className="font-serif text-lg text-harbor-deep mb-2">
            No meetings published yet
          </p>
          <p className="text-ink-soft text-sm">
            Check back after the next board meeting.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}
    </div>
  );
}
