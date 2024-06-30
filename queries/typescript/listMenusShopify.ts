export const LIST_MENUS = `{
  translatableResources(resourceType: ONLINE_STORE_MENU, first: 10) {
    edges {
      node {
        resourceId
        translatableContent {
          key
          value
          type
          digest
          locale
        }
      }
    }
  }
}`

export const GET_MENUS = `query GetMenuShopify($handle: String!) {
  menu(handle: $handle) {
    handle
    id
    items {
      id
      tags
      title
      type
      url
      items {
        id
        tags
        title
        type
        url
      }
    }
    itemsCount
    title
  }
}`
