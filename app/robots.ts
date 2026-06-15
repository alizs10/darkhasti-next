// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/', // Allow everything by default
            // Explicitly block private/protected routes
            disallow: ['/my', '/my/', '/api/'],
        },
        sitemap: `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    }
}