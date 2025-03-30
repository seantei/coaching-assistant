'use server'

// import { getCloudflareContext } from '@opennextjs/cloudflare' // ❌ Removed to fix build
import { headers } from 'next/headers'

// 增加计数并记录访问
export async function increase() {
  const headerList = headers()
  const ip = headerList.get('x-real-ip') || 'unknown'

  console.log(`👤 New visitor from IP: ${ip}`)

  return { ip }
}
