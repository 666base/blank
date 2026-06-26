class RandomPicker<T> {
  private _copyArray: T[];

  private readonly _originalArray: T[];

  constructor(array: T[]) {
    this._originalArray = [...array];
    this._copyArray = [...array];
  }

  private randomIndex(max: number): number {
    return Math.floor(Math.random() * max);
  }

  pick(): T {
    if (this._copyArray.length === 0) {
      this._copyArray = [...this._originalArray];
    }

    const index = this.randomIndex(this._copyArray.length);
    const item = this._copyArray[index];
    this._copyArray.splice(index, 1);
    return item;
  }
}

export const multiPlayersColor = new RandomPicker([
  'var(--blank-multi-players-purple)',
  'var(--blank-multi-players-magenta)',
  'var(--blank-multi-players-red)',
  'var(--blank-multi-players-orange)',
  'var(--blank-multi-players-green)',
  'var(--blank-multi-players-blue)',
  'var(--blank-multi-players-brown)',
  'var(--blank-multi-players-grey)',
]);
