export const stableVersion = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/;

export function resolveReleaseTag(version: string, tag?: string) {
  if (!stableVersion.test(version))
    throw new Error(`Invalid release version: ${version}`);
  const expected = `v${version}`;
  if (tag && tag !== expected)
    throw new Error(
      `Release tag ${tag} does not match package version ${expected}`,
    );
  return expected;
}
