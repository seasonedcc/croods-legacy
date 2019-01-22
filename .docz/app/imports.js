export const imports = {
  'src/docs/Edit.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-edit" */ 'src/docs/Edit.mdx'),
  'src/docs/GettingStarted.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-getting-started" */ 'src/docs/GettingStarted.mdx'),
  'src/docs/New.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-new" */ 'src/docs/New.mdx'),
}
s
