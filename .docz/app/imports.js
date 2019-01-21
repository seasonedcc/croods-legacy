export const imports = {
  'src/docs/GettingStarted.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-getting-started" */ 'src/docs/GettingStarted.mdx'),
  'src/docs/Info.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-docs-info" */ 'src/docs/Info.mdx'),
}
