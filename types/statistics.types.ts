export interface StatsError {
  absolute: number;
  relative: {
    type: "increase" | "decrease" | undefined;
    value: number;
  };
}
