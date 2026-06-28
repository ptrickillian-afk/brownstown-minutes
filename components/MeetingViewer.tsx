"use client";

import { useState } from "react";
import type { Meeting } from "@/lib/supabase";

export default function MeetingViewer({ meeting }: { meeting: Meeting }) {
  const hasAudio = Boolean(meeting.audio_url);
  const [tab, setTab] = useState<"read" | "listen">("read");

  return (
    <div>
      {hasAudio && (
        <div className="mb-6 flex rounded-md border border-mist bg-paper-raised p-1 w-fit">
          <button
            onClick={() => setTab("read")}
            className={`rounded-[5px] px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "read"
                ? "bg-harbor text-paper-raised"
                : "text-ink-soft hover:text-harbor"
            }`}
          >
            Read Minutes
          </button>
          <button
            onClick={() => setTab("listen")}
            className={`rounded-[5px] px-4 py-1.5 text-sm font-medium transition-colors ${
              tab === "listen"
                ? "bg-harbor text-paper-raised"
                : "text-ink-soft hover:text-harbor"
            }`}
          >
            Listen to Recap
          </button>
        </div>
      )}

      {tab === "read" || !hasAudio ? (
        <article className="rounded-lg border border-mist bg-paper-raised p-7 sm:p-9">
          {meeting.minutes_text ? (
            <div className="whitespace-pre-wrap text-[15px] leading-7 text-ink font-[450]">
              {meeting.minutes_text}
            </div>
          ) : (
            <p className="text-ink-soft italic">
              Minutes for this meeting are not yet available.
            </p>
          )}
        </article>
      ) : (
        <div className="rounded-lg border border-mist bg-paper-raised p-7 sm:p-9">
          <h2 className="font-serif text-lg font-semibold text-harbor-deep mb-1">
            Brownstown Recap
          </h2>
          <p className="text-sm text-ink-soft mb-5">
            A friendly two-host summary of this meeting's key decisions and
            discussions.
          </p>
          <audio controls className="w-full" src={meeting.audio_url ?? undefined}>
            Your browser does not support the audio element.
          </audio>

          {meeting.podcast_script && (
            <details className="mt-6 group">
              <summary className="cursor-pointer text-sm font-medium text-harbor hover:text-harbor-deep transition-colors">
                Show podcast transcript
              </summary>
              <div className="mt-4 whitespace-pre-wrap text-sm leading-6 text-ink-soft border-t border-mist pt-4">
                {meeting.podcast_script}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
