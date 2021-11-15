export function union(a: Set<any>, b: Set<any>): Set<any> {
  /*
   * Returns a set containing a ∪ b.
   */
  return new Set([...a, ...b]);
}

export function intersection(a: Set<any>, b: Set<any>): Set<any> {
  /*
   * Returns a set containing a ∩ b.
   */
  return new Set([...a].filter((x) => b.has(x)));
}

export function difference(a: Set<any>, b: Set<any>): Set<any> {
  /*
   * Returns a set containing a - b.
   */
  return new Set([...a].filter((x) => !b.has(x)));
}
