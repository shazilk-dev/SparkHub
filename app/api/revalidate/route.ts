import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Revalidate the home page and user pages
    revalidatePath("/");
    revalidatePath("/user/[id]", "page");
    revalidatePath("/startup/[id]", "page");

    return NextResponse.json({
      revalidated: true,
      message: "Cache cleared successfully",
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      {
        revalidated: false,
        message: "Error clearing cache",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST to revalidate cache",
  });
}
