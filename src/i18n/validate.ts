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
    // Italian practical information currently comes from site.config; foreign
    // copies contain the translated paragraph. Unified facts follow in #16.
    const placeholders = (text: string) =>
      [...text.matchAll(/{{\s*(\w+)\s*}}/g)]
        .map((match) => match[1])
        .filter((key) => key !== "parking" && key !== "pets")
        .sort();
    if (
      JSON.stringify(placeholders(reference)) !==
      JSON.stringify(placeholders(candidate))
    )
      throw new Error(`${path}: inconsistent placeholders`);
    return;
  }
  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate) || !candidate.length)
      throw new Error(`${path}: missing array`);
    const editorialParagraphs = /\.privacy\.sections\.\d+\.paragraphs$/.test(
      path,
    );
    if (!editorialParagraphs && reference.length !== candidate.length)
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
