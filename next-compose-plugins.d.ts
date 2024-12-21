declare module 'next-compose-plugins' {
  import { NextConfig } from 'next';

  type Plugin = (config: NextConfig) => NextConfig;

  function withPlugins(
    plugins: Array<Plugin | [Plugin, unknown]>,
    config?: NextConfig
  ): NextConfig;

  export = withPlugins;
}
