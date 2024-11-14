let idCounter = 9;

function generateCertificate() {
    const name = document.getElementById("name").value;
    const photo = document.getElementById("photo").files[0];
    const rank = document.getElementById("rank").value;
    const idNumber = "#0000" + (idCounter++).toString().padStart(2, '0');

    document.getElementById("userName").innerText = name;
    document.getElementById("userID").innerText = idNumber;
    document.getElementById("userRank").innerText = rank;

    const reader = new FileReader();
    reader.onload = function(event) {
        document.getElementById("userPhoto").src = event.target.result;
        document.getElementById("preview").style.display = "block";
        generatePDF(name, idNumber, rank, event.target.result);
    };
    reader.readAsDataURL(photo);
}

function generatePDF(name, idNumber, rank, photoDataUrl) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add border
    doc.setLineWidth(1);
    doc.setDrawColor(0, 0, 255);
    doc.rect(10, 10, 190, 120);

    // Add user photo
    doc.addImage(photoDataUrl, "JPEG", 15, 15, 30, 30);

    // Add text
    doc.setFontSize(12);
    doc.text(`User Name: ${name}`, 55, 25);
    doc.text(`ID: ${idNumber}`, 150, 25);
    doc.setFontSize(18);
    doc.text("Congratulations!!", 60, 70);
    doc.setFont("bold");
    doc.text(`You have secured ${rank}`, 60, 90);

    // Save the PDF
    doc.save(`${name}_Certificate.pdf`);
}
