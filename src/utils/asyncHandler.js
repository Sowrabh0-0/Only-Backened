// const asyncHandler = (requestHandler) => {
//     (res,req,next)=> {
//         Promise.resolve(requestHandler).catch((err)=> next(err))
//     }
// }


// const asyncHandler = () => {}
// const asyncHandler = (fn) => {() => {}}
// const asyncHandler = (fn) => async () => {}

const asyncHandler = (fn) => async (res, req, next) => {
    try {
        await fn(res,req,next)
    } catch (error) {
        res.status(err.code || 500).json({
            success:false,
            message: err.message || "Server Error"
        })
    }

}

export {asyncHandler}