// Bengali digit helpers

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(value: number | string): string {
  return String(value).replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)]);
}
