export async function hashPassword(pw: string): Promise<string> {
  const data = new TextEncoder().encode(pw)
  const buf = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('')
}

const ADMIN_HASH = import.meta.env.VITE_ADMIN_HASH ?? ''

export async function verifyPassword(pw: string): Promise<boolean> {
  if (!ADMIN_HASH) return false
  return (await hashPassword(pw)) === ADMIN_HASH
}
