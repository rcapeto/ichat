type Word = string | undefined | null;

export function joinWords(...words: Word[]) {
  return words.map((word) => word ?? "").join(" ");
}
