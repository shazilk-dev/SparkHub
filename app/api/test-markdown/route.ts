import { NextResponse } from "next/server";
import { renderMarkdown } from "@/lib/markdown";

export async function GET() {
  const testCases = [
    "**Welcome to Agenoverse…**",
    "**Welcome to Agenoverse… **",
    "**Welcome to Agenoverse...**",
    "# This is a heading",
    "## This is h2",
    "- List item 1\n- List item 2",
    "`code snippet`",
    "*italic text*",
    "**bold text**",
  ];

  const results = testCases.map((test) => ({
    input: test,
    output: renderMarkdown(test),
    length: test.length,
    chars: test.split("").map((c) => c.charCodeAt(0)),
  }));

  return NextResponse.json({
    message: "Markdown test results",
    results,
  });
}
