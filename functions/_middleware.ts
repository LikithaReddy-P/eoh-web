import { getAssetFromKV } from '@cloudflare/kv-asset-handler'

export async function onRequest(context) {
  try {
    // Try to get the asset from KV
    return await getAssetFromKV(context)
  } catch (e) {
    // If not found, return the server-rendered page
    const { default: handler } = await import('../dist/server/entry.js')
    return handler(context.request)
  }
}
