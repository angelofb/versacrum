export function fallbackImageWidth(widths: readonly number[], preferred = 800) {
  const width =
    widths.find((candidate) => candidate >= preferred) ?? widths.at(-1);
  if (!width) throw new Error("An image needs at least one responsive width");
  return width;
}
