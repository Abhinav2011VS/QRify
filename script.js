function generateQRCode() {
    const input = document.getElementById("qrInput").value;
    const qrCodeContainer = document.getElementById("qrCodeContainer");
    const loadingSpinner = document.getElementById("loadingSpinner");
    const actionButtons = document.getElementById("actionButtons");

    if (input === "") {
        alert("Please enter text or a URL");
        return;
    }

    // Show the loading spinner while the QR code is being generated
    loadingSpinner.style.display = "block";
    qrCodeContainer.style.display = "none"; // Hide QR code container if it's already visible
    actionButtons.style.display = "none"; // Hide action buttons while generating QR code

    // Clear any previous QR code
    qrCodeContainer.innerHTML = "";

    // Simulate QR Code generation (you can replace the setTimeout with actual API call)
    setTimeout(() => {
        // Hide loading spinner once the QR code is generated
        loadingSpinner.style.display = "none";

        // Encode the input text into a QR code URL using an API
        const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(input)}&size=200x200`;

        // Create an image element to display the QR code
        const img = document.createElement("img");
        img.src = qrCodeUrl;

        // Append the QR code to the container
        qrCodeContainer.appendChild(img);
        qrCodeContainer.style.display = "block"; // Make QR code visible after it's generated

        // Show the action buttons after the QR code is generated
        actionButtons.style.display = "flex"; // Show action buttons side by side
    }, 1500); // Simulate a 1.5-second wait for generating the QR code
}

function copyQRCode() {
    const qrCodeImage = document.querySelector("#qrCodeContainer img");
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas size to match QR code size
    canvas.width = qrCodeImage.width;
    canvas.height = qrCodeImage.height;

    // Draw the image on the canvas
    ctx.drawImage(qrCodeImage, 0, 0);

    // Copy image to clipboard
    canvas.toBlob(function(blob) {
        const data = [new ClipboardItem({'image/png': blob})];
        navigator.clipboard.write(data).then(() => {
            alert("QR Code copied to clipboard!");
        }, (error) => {
            alert("Failed to copy QR code: " + error);
        });
    });
}

function downloadQRCode() {
    const qrCodeImage = document.querySelector("#qrCodeContainer img");

    const link = document.createElement('a');
    link.href = qrCodeImage.src;
    link.download = 'qr_code.png';  // Set default download filename
    link.click();  // Trigger the download
}

// Disable right-click
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
