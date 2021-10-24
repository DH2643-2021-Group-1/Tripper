import express = require("express");

export enum StatusCode {
    OK = 200,
    ErrorFirestoreCreate = 551,
    ErrorCouldNoUploadImage = 552,
    ErrorBlogPostContentPreparation = 553,
    ErrorCouldNotDeleteImage = 554,
    ErrorCouldNotDeleteBlogPost = 555,
    RequestNoPrimaryImage = 452,
    RequestBlogPostDoNotExist = 453,
}

export const respond = (
    res: express.Response<any, Record<string, any>>, 
    param: {data?: any, statusCode: StatusCode, message?: string, warning?: string[], error?: string}) => {
    res.status(param.statusCode).json({
        message: param.message ?? "NONE",
        warning: param.warning ?? [],
        error: param.error ?? "NONE",
        data: param.data
    })
}