import express = require("express");

export enum StatusCode {
    OK = 200,
    ErrorFirestoreCreate = 501,
    ErrorCouldNoUploadImage = 502,
    ErrorBlogPostContentPreparation = 503,
    ErrorCouldNotDeleteImage = 504,
    ErrorCouldNotDeleteBlogPost = 505,
    RequestNoPrimaryImage = 401,
    RequestBlogPostDoNotExist = 402,
}

export const respond = (
    res: express.Response<any, Record<string, any>>, 
    param: {statusCode: StatusCode, message?: string, warning?: string, error?: string}) => {
    res.status(param.statusCode).json({
        message: param.message ?? "NONE",
        warning: param.warning ?? "NONE",
        error: param.error ?? "NONE"
    })
}