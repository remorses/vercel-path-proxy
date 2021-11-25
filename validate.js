const { PATH_1, TARGET_URL_1, FALLBACK_URL } = process.env

if (!PATH_1) {
    console.error('At least PATH_1 env var is required')
    process.exit(1)
}
if (!TARGET_URL_1) {
    console.error('At least TARGET_URL_1 env var is required')
    process.exit(1)
}
if (!FALLBACK_URL) {
    console.error('FALLBACK_URL env var is required')
    process.exit(1)
}
