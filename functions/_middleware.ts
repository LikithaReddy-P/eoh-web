export async function onRequest(context) {
  // Import the SSR handler
  const { default: handler } = await import('../dist/server/server.js')
  return handler(context.request)
}
