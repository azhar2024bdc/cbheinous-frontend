function checkFraction(value: number): string {
  // check if value has fractional part
  if (Number.isInteger(value)) {
    return value.toString();
  } else {
    return value.toFixed(2);
  }
}

export default checkFraction;