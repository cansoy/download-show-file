const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

// Example buffer data (replace with actual buffer)
// const bufferData = Buffer.from('Hello, world!', 'utf-8');

// Example route to download buffer data
app.get('/download', (req, res) => {
  // Example headers
  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="data.buffer.pdf"', //just for download
  });

  // Convert buffer to readable stream and pipe it to response
    fs.readFile("./pdf.pdf",(err,data)=>{
        const bufferStream = new Readable();
        bufferStream.push(data);
        bufferStream.push(null); // Signals the end of the stream
      
        bufferStream.pipe(res);
        console.log("response-completed")
    })

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
