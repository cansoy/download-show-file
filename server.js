const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

// Serve static files from the 'public' directory (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Example route to download a file with custom headers
app.get('/download', (req, res) => {
  const filePath = path.join(__dirname,'./pdf.pdf');

  // Example custom headers
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="downloaded.pdf"',
    'Content-Length': fs.statSync(filePath).size
  });

  // Stream the file to the client
  const fileStream = fs.createReadStream(filePath);
  fileStream.pipe(res);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
