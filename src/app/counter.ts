'use server'

import { headers } from 'next/headers'

// 增加计数并记录访问
export async function increment(value: number) {
  const headersList = headers()
  const userAgent = headersList.get('user-agent') || 'unknown'

  console.log(`Visitor user agent: ${userAgent}`)

  return value + 1
}
