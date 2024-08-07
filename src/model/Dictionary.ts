export class Dictionary {
  readonly words: string[];

  private constructor(words: string[]) {
    this.words = words
      .filter((w) => w.trim() !== "")
      .map((w) => w.toUpperCase());
  }

  static readonly fromFile = async (file: string): Promise<Dictionary> => {
    const textFile = await Bun.file(file).text();
    const lines = textFile.split(/\r?\n|\r|\n/g);
    return new Dictionary(lines);
  };
}
