"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExpandableBioProps {
  bio: string;
  memberName: string;
}

export function ExpandableBio({ bio, memberName }: ExpandableBioProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldTruncate = bio.length > 120;

  return (
    <div className="mb-4 min-h-[100px]">
      {bio ? (
        <>
          <p
            className={`text-sm text-muted-foreground leading-relaxed ${
              !isExpanded && shouldTruncate ? "line-clamp-3" : ""
            }`}
          >
            {bio}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-2 inline-flex items-center gap-1 text-xs text-[#00E5A0] transition-colors hover:text-[#00C98B]"
              aria-label={`${isExpanded ? "Show less" : "Show more"} about ${memberName}`}
            >
              {isExpanded ? (
                <>
                  Show less <ChevronUp className="size-3" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="size-3" />
                </>
              )}
            </button>
          )}
        </>
      ) : null}
    </div>
  );
}
