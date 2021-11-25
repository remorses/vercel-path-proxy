import { NextResponse } from 'next/server'

let [PATH_1, PATH_2, PATH_3] = [
    process.env.PATH_1,
    process.env.PATH_2,
    process.env.PATH_3,
].map((path) => {
    if (!path) {
        return ''
    }
    if (!path.startsWith('/')) {
        return '/' + path
    }
    if (path.endsWith('/')) {
        return path.slice(0, -1)
    }
    return path
})

let [TARGET_URL_1, TARGET_URL_2, TARGET_URL_3] = [
    process.env.TARGET_URL_1,
    process.env.TARGET_URL_2,
    process.env.TARGET_URL_3,
].map(makeUrl)

const FALLBACK_URL = makeUrl(process.env.FALLBACK_URL)


export function middleware(req) {
    const { pathname } = req.nextUrl

    function samePath(p) {
        if (!p) {
            return false
        }
        return pathname === p || pathname.startsWith(p + '/')
    }
    if (samePath(PATH_1)) {
        return NextResponse.rewrite(`${TARGET_URL_1}${pathname}`)
    }
    if (samePath(PATH_2)) {
        return NextResponse.rewrite(`${TARGET_URL_2}${pathname}`)
    }
    if (samePath(PATH_3)) {
        return NextResponse.rewrite(`${TARGET_URL_3}${pathname}`)
    }
    if (FALLBACK_URL) {
        console.info(`Rewriting to FALLBACK_URL`)
        return NextResponse.rewrite(`${FALLBACK_URL}${pathname}`)
    }
    console.info(`Neither FALLBACK_URL or PATH_N found`)
}

function makeUrl(domain) {
    if (domain && !domain.startsWith('http')) {
        return `https://${domain}`
    }
    return domain
}
