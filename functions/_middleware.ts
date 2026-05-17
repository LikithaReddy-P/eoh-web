export async function onRequest(context) {
  try {
    const { default: handler } = await import('../dist/server/server.js')
    return handler(context.request)
  } catch (error) {
    console.error('Error loading handler:', error)
    return new Response('Server Error', { status: 500 })
  }
}
