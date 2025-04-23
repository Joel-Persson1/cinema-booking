export function createBookingNumber(prefix = "BK") {
  const timestamp = Date.now().toString(36).toUpperCase(); // t.ex. "L1F7HZL6"
  const random = Math.random().toString(36).substring(2, 6).toUpperCase(); // t.ex. "Z9K3"
  return `${prefix}-${timestamp}-${random}`;
}
