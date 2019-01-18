export const imports = {
  'src/New.mdx': () =>
    import(/* webpackPrefetch: true, webpackChunkName: "src-new" */ 'src/New.mdx'),
}
