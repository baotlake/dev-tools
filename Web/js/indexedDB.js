class DB {
    constructor() {

    }

    async open(name = '', version = '') {
        const request = indexedDB.open(name, version)
        const db = await new Promise((resolve) => {
            request.onsuccess = () => resolve(request.result)
        })
        this.db = db
        return db
    }

    async update(storeName, data, key) {
        const transaction = this.db.transaction([storeName], 'readwrite')
        const objectStore = transaction.objectStore(storeName)

        const request = objectStore.put(data, key)

        await new Promise((resolve) => {
            request.onsuccess = () => resolve()
        })
    }

    async get(storeName, key) {
        const transaction = this.db.transaction([storeName], 'readwrite')
        const objectStore = transaction.objectStore(storeName)

        const request = objectStore.get(key)

        const data = await new Promise((resolve)=>{
            request.onsuccess = () => resolve(request.result)
        })

        return data
    }
}

const db = new DB()
