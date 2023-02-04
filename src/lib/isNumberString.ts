export default function isNumberString(value: string): value is NumberString {
  return ! isNaN(Number(value)) || value === 'NaN'
}
