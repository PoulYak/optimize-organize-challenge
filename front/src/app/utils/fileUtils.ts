export function getMediaBase64(files: File[]): Promise<any>[] {
    return files.map(file => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsBinaryString(file)
            reader.onloadend = function (event) {
                const result = reader.result
                resolve({
                    name: file.name,
                    type: file.type.startsWith("image") ? "p" : "d",
                    content: btoa(result as string)
                })
            }
            reader.onerror = function () {
                console.log("couldn't read the file")
                reject()
            }
        })
    });
}

export function downloadFile(url: string, filename: string) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}