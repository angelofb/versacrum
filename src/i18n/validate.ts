import type { RichText, PrivacyBlock } from "./schema.ts";

export function assertRichText(value: unknown): asserts value is RichText {
  if (!Array.isArray(value) || !value.length)
    throw new Error("Missing rich text");
  for (const part of value) {
    if (typeof part === "string") {
      if (!part) throw new Error("Empty text segment");
      continue;
    }
    if (!part || typeof part !== "object")
      throw new Error("Invalid rich text node");
    const kind = Reflect.get(part, "kind");
    if (kind === "break") continue;
    if (
      !["strong", "code", "link"].includes(kind) ||
      typeof part.text !== "string" ||
      !part.text.trim()
    )
      throw new Error("Invalid rich text kind or text");
    if (
      kind === "link" &&
      (typeof part.href !== "string" ||
        !/^(https:\/\/|mailto:|#[a-z])/.test(part.href))
    )
      throw new Error("Unsafe rich text link");
  }
}

export function assertPrivacyBlocks(
  value: unknown,
): asserts value is PrivacyBlock[] {
  if (!Array.isArray(value) || !value.length)
    throw new Error("Missing privacy blocks");
  for (const block of value) {
    if (block?.kind === "paragraph") assertRichText(block.content);
    else if (
      block?.kind === "storage" &&
      Array.isArray(block.items) &&
      block.items.length
    ) {
      for (const item of block.items) {
        assertRichText(item.term);
        assertRichText(item.description);
      }
    } else throw new Error("Invalid privacy block");
  }
}

/** Validate the raw catalogs, never the output of a translator with fallback. */
export function assertCatalog(
  reference: unknown,
  candidate: unknown,
  path = "catalog",
): void {
  if (typeof reference === "string") {
    if (
      typeof candidate !== "string" ||
      (!candidate.trim() && !path.endsWith(".authority"))
    )
      throw new Error(`${path}: missing text`);
    const placeholders = (text: string) =>
      [...text.matchAll(/{{\s*(\w+)\s*}}/g)].map((match) => match[1]).sort();
    if (
      JSON.stringify(placeholders(reference)) !==
      JSON.stringify(placeholders(candidate))
    )
      throw new Error(`${path}: inconsistent placeholders`);
    return;
  }
  if (Array.isArray(reference)) {
    if (path.endsWith(".content")) {
      assertRichText(candidate);
      return;
    }
    if (path.endsWith(".blocks")) {
      assertPrivacyBlocks(candidate);
      return;
    }
    if (!Array.isArray(candidate) || !candidate.length)
      throw new Error(`${path}: missing array`);
    if (reference.length !== candidate.length)
      throw new Error(`${path}: inconsistent length`);
    candidate.forEach((value, index) =>
      assertCatalog(
        reference[Math.min(index, reference.length - 1)],
        value,
        `${path}.${index}`,
      ),
    );
    return;
  }
  if (reference && typeof reference === "object") {
    if (!candidate || typeof candidate !== "object" || Array.isArray(candidate))
      throw new Error(`${path}: missing object`);
    if (
      JSON.stringify(Object.keys(reference).sort()) !==
      JSON.stringify(Object.keys(candidate).sort())
    )
      throw new Error(`${path}: inconsistent keys`);
    for (const key of Object.keys(reference))
      assertCatalog(
        Reflect.get(reference, key),
        Reflect.get(candidate, key),
        `${path}.${key}`,
      );
    return;
  }
  if (reference !== candidate) throw new Error(`${path}: inconsistent value`);
}
