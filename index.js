function processInstructions() {
    const [file] = document.getElementById("fileInput").files;
    const reader = new FileReader();

    const canvas = document.getElementById("grid");
    const context = canvas.getContext("2d");

    context.fillStyle = "black";
    context.fillRect(0, 0, 1000, 1000);

    reader.addEventListener("load", async () => {
        for (const instruction of reader.result.split("\n")) {
            const words = instruction.split(" ");

            let command = "";

            if (words.length == 5) {
                command = `${words[0]} ${words[1]}`; // turn on, turn off
            } else if (words.length == 4) {
                command = words[0]; // toggle
            }

            const [ulx, uly] = parseCorner(words[words.length - 3]);
            const [lrx, lry] = parseCorner(words[words.length - 1]);

            if (command == "turn on" || command == "turn off") {
                context.fillStyle = command == "turn on" ? "white" : "black";
                context.fillRect(parseInt(ulx), parseInt(uly), parseInt(lrx) - parseInt(ulx) + 1, parseInt(lry) - parseInt(uly) + 1)
            } else {
                context.globalCompositeOperation = "difference";
                context.fillStyle = "white";
                context.fillRect(parseInt(ulx), parseInt(uly), parseInt(lrx) - parseInt(ulx) + 1, parseInt(lry) - parseInt(uly) + 1)
                context.globalCompositeOperation = "source-over";
            }

            await delay(100);
        }
    }, false);

    if (file) {
        reader.readAsText(file);
    }
}

function parseCorner(corner) {
    return corner.split(",");
}

const delay = (ms) => {
    return new Promise(res => setTimeout(res, ms));
}