import { ImageResponse } from "next/og";

function StaticDotPattern() {
  return (
    <svg
      width="1200"
      height="630"
      viewBox="0 0 1200 630"
      style={{
        position: "absolute",
        inset: 0,
        color: "#a3a3a3",
        opacity: 0.45,
      }}
    >
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" />
        </pattern>
      </defs>

      <rect width="1200" height="630" fill="url(#dots)" />
    </svg>
  );
}

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "May Rain";

  return new ImageResponse(
    <div tw="flex flex-col w-full h-full items-center justify-center bg-black text-white relative">
      <div tw="flex flex-col md:flex-row w-full py-12 px-4 md:items-center justify-between p-8">
        <StaticDotPattern />
        <h2 tw="flex flex-col text-4xl font-bold tracking-tight text-left">
          {title}
        </h2>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
