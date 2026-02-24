## FileSystem (Chromium) Tools

[MDN FileSystem Docs](https://developer.mozilla.org/en-US/docs/Web/API/FileSystem)

### 用法 Usage

1. 复制 `filesystem.js` 内容粘贴到控制台

2. 运行命令

```javascript
    // 切换目录 (change directory)
    fs.cd`/videos` // or fs.cd('/videos')

    // ls
    fs.ls()

    // 下载文件（download file）
    fs.find`video.mp4`
    fs.download`video-download.mp4`

    // 保存文件 (save file)
    fs.save`a.txt`      
    // save 'a.txt' in the current directory

    // 创建目录 (make directories)
    fs.mkdir`videos`

    // rm -rf
    fs.rmAll()

```