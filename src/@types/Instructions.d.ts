interface Step {
  goToNext: () => void;
}

interface InstructionRowI {
  title: string;
  row: number;
  chips: boolean[]; // same = true,  different = false
  result: boolean;
  circle?: number;
}
