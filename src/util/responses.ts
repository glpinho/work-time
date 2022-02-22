export const getResponse = (
    statusCode: number,
    payload: any
): LambdaResponse => {
    return {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        statusCode,
        body: JSON.stringify(payload),
    };
};

export const getHTMLResponse = (
    statusCode: number,
    payload: string
): LambdaResponse => {
    return {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/html",
        },
        statusCode,
        body: payload,
    };
};
