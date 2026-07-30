/**
 * Renders structured data. Next.js recommends a plain <script> tag with
 * JSON-LD for App Router pages; `<` is escaped to keep the payload safe to
 * inline.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
