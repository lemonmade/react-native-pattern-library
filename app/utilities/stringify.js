export default function stringify(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return value.toString();
}
