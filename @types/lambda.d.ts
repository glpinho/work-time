declare type LambdaResponse = {
    headers: HeaderOption;
    statusCode: number;
    body: string;
};

declare interface HeaderOption {
    "Access-Control-Allow-Origin": string;
    "Content-Type"?: string;
}
