const inputElement = document.getElementById("upload");

inputElement.addEventListener("change", (e) => {
    if (!inputElement.files?.[0]) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        console.log(e.target.result);
    };
    reader.readAsText(inputElement.files[0]);
});
