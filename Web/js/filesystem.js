class FSTools {
    constructor() {
        this.fs = null
        this.currentDir = null
        this.currentFile = null
        this.currentFileEntry = null
    }

    async init() {
        const requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem
        const fs = await new Promise(function (resolve, reject) {
            requestFileSystem(
                window.PERSISTENT,
                1024 * 1024 * 50,
                resolve,
                console.error
            )
        })
        console.log('fs name: ', fs.name, 'root: ', fs.root)
        this.fs = fs
        return fs
    }

    async cd(path = "/") {
        if (!this.fs) await this.init()
        const rootEntry = this.fs.root
        const dirEntry = await new Promise((resolve, reject) => {
            rootEntry.getDirectory(
                path,
                {},
                function (dirEntry) {
                    resolve(dirEntry)
                },
                function (error) {
                    console.error(error)
                    reject()
                }
            )
        })
        console.log(`dir: ${dirEntry.fullPath}`, dirEntry)
        this.currentDir = dirEntry
        return dirEntry
    }

    async ls(path) {
        if (!this.fs) await this.init()
        if (path) await this.cd(path)
        const dirEntry = this.currentDir || this.fs.root
        const dirReader = dirEntry.createReader()
        const entries = await new Promise((resolve, reject) => {
            dirReader.readEntries(
                function (results) {
                    resolve(results)
                },
                function (error) {
                    console.error(error)
                    reject()
                }
            )
        })
        entries.forEach((fe) => {
            console.log(`${fe.isFile ? '-' : 'd'}  ${fe.fullPath}`)
        })
        console.log('entries: ', entries)
        return entries
    }

    async find(name = "*") {
        if (!this.fs) await this.init()
        const currentDir = this.currentDir || this.fs.root
        const fileEntry = await new Promise((resolve, reject) => {
            currentDir.getFile(
                name,
                {},
                function (fileEntry) {
                    resolve(fileEntry)
                },
                function (e) {
                    console.error('e', e)
                    reject()
                }
            )
        })
        this.currentFileEntry = fileEntry
        console.log('File Entry: ', fileEntry)

        const file = await new Promise((resolve, reject) => {
            fileEntry.file(
                function (file) {
                    resolve(file)
                },
                function (e) {
                    console.error(e)
                    reject()
                }
            )
        })
        this.currentFile = file
        console.log('file ', file)

        return file
    }

    async download(fileName) {
        const file = this.currentFile
        const name = fileName || file.name || 'download'

        if (file) {
            const url = URL.createObjectURL(file)
            const a = document.createElement('a')
            a.href = url
            a.download = name
            a.click()
        }
    }

    async rmAll() {
        if (!this.fs) await this.init()
        const rootEntry = this.fs.root
        const dirReader = rootEntry.createReader()
        const entries = await new Promise((resolve, reject) => {
            dirReader.readEntries(
                function (results) {
                    resolve(results)
                },
                function (error) {
                    console.error(error)
                    reject()
                }
            )
        })
        console.log('entries: ', entries)
        entries.forEach((entry) => {
            if (entry.isFile) entry.remove(console.log, console.error)
            if (!entry.isFile) entry.removeRecursively(console.log, console.error)
        })
    }

    async save(fileName) {
        const input = document.createElement('input')
        input.type = 'file'
        const filePromise = new Promise((resolve, reject) => {
            input.onchange = () => {
                if (input.files.length === 0) return reject()
                const file = input.files[0]
                resolve(file)
            }
        })
        input.click()
        const file = await filePromise
        // console.log(file)

        if (!this.fs) await this.init()
        const dirEntry = this.currentDir || this.fs.root
        fileName = fileName || file.name
        const fileEntry = await new Promise((resolve, reject) => {
            dirEntry.getFile(fileName, { create: true }, resolve, console.error)
        })
        const fileWriter = await new Promise((resolve, reject) => {
            fileEntry.createWriter(resolve, console.error)
        })
        await new Promise((resolve, reject) => {
            fileWriter.write(file)
            fileWriter.onerror = console.error
            fileWriter.onwriteend = resolve
        })
        console.log('save success')
    }

    async mkdir(name = 'New Folder') {
        if (!this.fs) await this.init()
        const currentDir = this.currentDir || this.fs.root
        const dirEntry = await new Promise((resolve, reject) => {
            currentDir.getDirectory(name, { create: true }, resolve, console.error)
        })
        console.log('dir: ', dirEntry)
    }

    async metadata() {
        const fileEntry = this.currentFileEntry
        if (fileEntry) {
            const metadata = await new Promise((resolve) => {
                fileEntry.getMetadata(resolve)
            })
            const size = metadata.size
            console.log(`${(size / 1024 / 1024).toFixed(2)}MB`)
            console.log('file metadata: ', metadata)
        }

        const dirEntry = this.currentDir || this.fs.root
        const dirMetadata = await new Promise((resolve) => {
            dirEntry.getMetadata(resolve)
        })

        console.log('dir metadata: ', dirMetadata)
    }
}

const fs = new FSTools()
