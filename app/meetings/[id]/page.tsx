import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import type { Meeting } from "@/lib/supabase";
import MeetingViewer from "@/components/MeetingViewer";

async function getMeeting(id: string) {
  const { data, error } = await supabase
    .from("meetings")
    .select("*")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data as Meeting;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  if (!meeting) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/meetings"
        className="inline-flex items-center gap-1 text-sm font-medium text-harbor hover:text-harbor-deep transition-colors mb-8"
      >
        ← Back to archive
      </Link>

      <div className="mb-8">
        <p className="font-serif text-sm uppercase tracking-[0.18em] text-brass mb-2">
          {formatDate(meeting.meeting_date)}
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-harbor-deep leading-tight">
          {meeting.title || "Regular Board Meeting"}
        </h1>
      </div>

      <MeetingViewer meeting={meeting} />
    </div>
  );
}
