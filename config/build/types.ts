export type WebpackMode = "development" | "production";

export type WebpackEnv = {
    mode: WebpackMode;
    port?: number;
};

export type WebpackOptions = {
    mode: WebpackMode;
    port: number;
    paths: {
        src: string;
        entry: string;
        output: string;
        public: string;
        assets: string;
        favicon: string;
    };
};
