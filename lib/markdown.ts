import MarkdownIt from "markdown-it";

// Create a simple markdown-it instance with minimal features to avoid errors
export const markdownRenderer = new MarkdownIt({
  html: false, // Disable HTML for security
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // Autoconvert URL-like text to links
});

// Manual markdown parser for reliable rendering when markdown-it fails
function parseMarkdownManually(content: string): string {
  if (!content) return "";

  // Split content into lines and process line by line
  const lines = content.split("\n");
  const processedLines: string[] = [];
  let inList = false;
  let listType = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines but track them for paragraph breaks
    if (line.trim() === "") {
      if (inList) {
        processedLines.push(`</${listType}>`);
        inList = false;
        listType = "";
      }
      processedLines.push(""); // Keep empty line for paragraph breaks
      continue;
    }

    // Handle headers
    if (line.match(/^#{1,6}\s/)) {
      if (inList) {
        processedLines.push(`</${listType}>`);
        inList = false;
        listType = "";
      }

      if (line.startsWith("### ")) {
        processedLines.push(`<h3>${line.substring(4)}</h3>`);
      } else if (line.startsWith("## ")) {
        processedLines.push(`<h2>${line.substring(3)}</h2>`);
      } else if (line.startsWith("# ")) {
        processedLines.push(`<h1>${line.substring(2)}</h1>`);
      }
      continue;
    }

    // Handle unordered lists
    if (line.match(/^\s*[-*+]\s/)) {
      if (!inList || listType !== "ul") {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push("<ul>");
        inList = true;
        listType = "ul";
      }
      const listContent = line.replace(/^\s*[-*+]\s/, "");
      processedLines.push(`<li>${applyInlineFormatting(listContent)}</li>`);
      continue;
    }

    // Handle ordered lists
    if (line.match(/^\s*\d+\.\s/)) {
      if (!inList || listType !== "ol") {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push("<ol>");
        inList = true;
        listType = "ol";
      }
      const listContent = line.replace(/^\s*\d+\.\s/, "");
      processedLines.push(`<li>${applyInlineFormatting(listContent)}</li>`);
      continue;
    }

    // Handle regular paragraphs
    if (inList) {
      processedLines.push(`</${listType}>`);
      inList = false;
      listType = "";
    }

    processedLines.push(applyInlineFormatting(line));
  }

  // Close any open lists
  if (inList) {
    processedLines.push(`</${listType}>`);
  }

  // Join lines and handle paragraphs
  let html = processedLines.join("\n");

  // Convert double newlines to paragraph breaks
  html = html.replace(/\n\s*\n/g, "</p><p>");

  // Wrap non-block content in paragraphs
  const lines2 = html.split("\n");
  const finalLines: string[] = [];
  let inParagraph = false;

  for (const line of lines2) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Check if line is a block element
    const isBlockElement =
      trimmed.match(/^<\/(h[1-6]|ul|ol|li|p)>$/) ||
      trimmed.match(/^<(h[1-6]|ul|ol|li|p)/) ||
      trimmed.includes("</p><p>");

    if (isBlockElement) {
      if (inParagraph) {
        finalLines[finalLines.length - 1] =
          finalLines[finalLines.length - 1] + "</p>";
        inParagraph = false;
      }
      finalLines.push(trimmed);
    } else {
      if (!inParagraph) {
        finalLines.push("<p>" + trimmed);
        inParagraph = true;
      } else {
        finalLines.push(trimmed);
      }
    }
  }

  if (inParagraph) {
    finalLines[finalLines.length - 1] =
      finalLines[finalLines.length - 1] + "</p>";
  }

  return finalLines.join("");
}

// Apply inline formatting (bold, italic, code)
function applyInlineFormatting(text: string): string {
  let formatted = text;

  // Handle bold text (** or __) - handle trailing spaces
  formatted = formatted.replace(
    /\*\*\s*([^*]+?)\s*\*\*/g,
    "<strong>$1</strong>"
  );
  formatted = formatted.replace(/__\s*([^_]+?)\s*__/g, "<strong>$1</strong>");

  // Handle italic text (* or _) - but not if it's part of bold
  formatted = formatted.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g, "<em>$1</em>");
  formatted = formatted.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, "<em>$1</em>");

  // Handle inline code
  formatted = formatted.replace(/`([^`]+?)`/g, "<code>$1</code>");

  return formatted;
}

// Safe render function with error handling
export function renderMarkdown(content: string): string {
  try {
    if (!content || typeof content !== "string") {
      return "";
    }

    // Clean content first
    const cleanContent = content
      .trim()
      // Normalize line breaks
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      // Remove excessive whitespace but preserve structure
      .replace(/[ \t]+/g, " ")
      .replace(/\n\s*\n\s*\n/g, "\n\n");

    if (!cleanContent) {
      return "";
    }

    console.log("Markdown input:", cleanContent);

    // Try markdown-it first, fallback to manual parser if it fails
    try {
      const rendered = markdownRenderer.render(cleanContent);
      console.log("Markdown output:", rendered);
      return rendered;
    } catch (markdownItError) {
      console.warn(
        "markdown-it failed, using manual parser:",
        markdownItError instanceof Error
          ? markdownItError.message
          : String(markdownItError)
      );
      const manualRendered = parseMarkdownManually(cleanContent);
      console.log("Manual markdown output:", manualRendered);
      return manualRendered;
    }
  } catch (error) {
    console.error("Markdown rendering error:", error);

    // Ultimate fallback - basic HTML conversion
    return content
      .replace(/\n/g, "<br>")
      .replace(/\*\*([^*]+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+?)\*/g, "<em>$1</em>")
      .replace(/`([^`]+?)`/g, "<code>$1</code>");
  }
}
