export const imports = {
  'src/docs/Edit.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-edit" */ 'src/docs/Edit.mdx'),
  'src/docs/GettingStarted.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-getting-started" */ 'src/docs/GettingStarted.mdx'),
  'src/docs/Info.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-info" */ 'src/docs/Info.mdx'),
  'src/docs/List.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-list" */ 'src/docs/List.mdx'),
  'src/docs/New.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-new" */ 'src/docs/New.mdx'),
}
