// app/sitemap.ts
import { MetadataRoute } from 'next'
import { allCommentsReq } from './actions/comment'
import { requestsReq } from './actions/request'

// ⏱️ TELL NEXT.JS TO REGENERATE THE SITEMAP EVERY 1 HOUR (3600 seconds)
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? ""

    // 1. fetch PUBLIC requests
    const allRequestsRes = await requestsReq({
        order: "visit",
        per_page: "all"
    })

    const allRequests = allRequestsRes?.data;

    const allRequestsUrls: MetadataRoute.Sitemap = allRequests?.map((req) => ({
        url: `${baseUrl}/requests/${req.id}`,
        lastModified: new Date(req.published_at),
        changeFrequency: 'weekly',
        priority: 0.7,
    })) ?? []

    // 2. fetch PUBLIC comments
    const allComments = await allCommentsReq()

    const allCommentsUrls: MetadataRoute.Sitemap = allComments?.map((comment) => ({
        url: `${baseUrl}/comment/${comment.id}`,
        lastModified: new Date(comment.updated_at),
        changeFrequency: 'weekly',
        priority: 0.6,
    })) ?? []

    const dynamicUrls = [...allRequestsUrls, ...allCommentsUrls]

    // 3. ONLY public static pages
    const staticUrls: MetadataRoute.Sitemap = [
        {
            url: baseUrl, // Home page
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/requests`, // Public list of requests (if it exists)
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/new-request`, // About page
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]

    return [...staticUrls, ...dynamicUrls]
}