const toToList = {
    success: true,
    data: ['上午去图书馆看书', '下去出去逛街']
}

export const get = (url) => {
    if (url === 'toToList.json') {
        return new Promise((resolve, reject) => {
            if (toToList.success) {
                resolve(toToList)
            } else {
                reject(new Error())
            }
        })
    }
}