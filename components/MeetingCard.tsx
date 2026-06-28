import Link from "next/link";
import type { Meeting } from "@/lib/supabase";

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.toLocaleDateString("en-US", { day: "numeric" }),
    full: date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }),
  };
}

function excerpt(text: string | null, length = 160) {
  if (!text) return "";
  const clean = text.replace(/\\n/g, " ").replace(/\s+/g, " ").trim();
  return clean.length > length ? clean.slice(0, length).trim() + "…" : clean;
}

export default function MeetingCard({
  meeting,
  featured = false,
}: {
  meeting: Meeting;
  featured?: boolean;
}) {
  const date = formatDate(meeting.meeting_date);
  const hasAudio = Boolean(meeting.audio_url);

  return (
    <Link
      href={`/meetings/${meeting.id}`}
      className={`group block rounded-lg border border-mist bg-paper-raised transition-all hover:border-harbor hover:shadow-[0_4px_18px_-6px_rgba(43,76,92,0.25)] ${
        featured ? "p-7 sm:p-8" : "p-5"
      }`}
    >
      <div className="flex items-start gap-5">
        {/* Date stamp — the signature element */}
        <div
          className={`flex-shrink-0 flex flex-col items-center justify-center rounded-md border-2 border-brass text-brass ${
            featured ? "h-16 w-16" : "h-12 w-12"
          }`}
        >
          <span className={`font-serif font-semibold leading-none ${featured ? "text-xs" : "text-[10px]"}`}>
            {date.month}
          </span>
          <span className={`font-serif font-bold leading-none ${featured ? "text-2xl mt-0.5" : "text-base"}`}>
            {date.day}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-medium text-ink-soft/70">
              {date.full}
            </span>
            {hasAudio && (
              <span className="inline-flex items-center gap-1 rounded-full bg-moss/10 px-2 py-0.5 text-[11px] font-medium text-moss">
                ♪ Podcast available
              </span>
            )}
          </div>
          <h3
            className={`font-serif font-semibold text-harbor-deep group-hover:text-harbor transition-colors ${
              featured ? "text-2xl mb-2" : "text-lg mb-1"
            }`}
          >
            {meeting.title || "Regular Board Meeting"}
          </h3>
          {featured && (
            <p className="text-ink-soft text-[15px] leading-relaxed">
              {excerpt(meeting.minutes_text, 220)}
            </p>
          )}
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-harbor">
            Read minutes or listen
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
