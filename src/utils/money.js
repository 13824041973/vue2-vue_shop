export const toFixed = (result) => {
    // 过滤两位小数 toFixed() 方法

    if (typeof result !== "number") {
        result = Number(result);
    }
    return result.toFixed(2);
}