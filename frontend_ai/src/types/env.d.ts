declare interface ImportMeta {
  readonly env: {
    // Environment variables defined in .env
    readonly VITE_UNSPLASH_ACCESS_KEY: string;
    readonly VITE_GITHUB_CLIENT_ID: string;
    readonly VITE_API_BASE_URL: string;
    readonly VITE_OPENAI_API_KEY: string;
    readonly VITE_TTS_KEY: string;
    readonly VITE_TTS_REGION: string;
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_LOGO_TEXT: string;
    readonly VITE_WS_HOST: string;
    readonly VITE_UNSPLASH__ACCESS_KEY: string;
  };
}
