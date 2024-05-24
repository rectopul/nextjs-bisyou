export const BLOG_ARTICLE_FIELDS = `fragment BlogArticleFields on Article {
    authorV2 {
        name
        lastName
        firstName
        bio
    }
    contentHtml
    excerptHtml
    handle
    id
    image {
        altText
        height
        id
        width
        url
        thumbnail: url(
            transform: { maxWidth: 520, maxHeight: 210, crop: CENTER }
        )
    }
    title
    tags
    publishedAt
}
`;
