export const imports = {
  'src/docs/GettingStarted.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-getting-started" */ 'src/docs/GettingStarted.mdx'),
  'src/docs/List.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-list" */ 'src/docs/List.mdx'),
  'src/docs/New.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-new" */ 'src/docs/New.mdx'),
}
