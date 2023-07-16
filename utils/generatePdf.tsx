const generateInvoicePDF = async (invoiceData) => {
    const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
    const { saveAs } = require('file-saver');
  
    // Crea un nuevo documento PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
  
    // Carga la fuente estándar Helvetica-Bold
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontSize = 12;
  
    // Define los colores utilizados en el diseño
    const primaryColor = rgb(0.149, 0.345, 0.592);
    const secondaryColor = rgb(0.949, 0.949, 0.949);
  
    // Define una función para dibujar texto en la página
    const drawText = (text, x, y, color = rgb(0, 0, 0), size = fontSize) => {
      page.drawText(text, { x, y, size, font, color });
    };
  
    // Dibuja el encabezado de la factura
    drawText('FACTURA', 50, 700, primaryColor, 18);
    drawText('Fecha: ' + invoiceData.fecha, 50, 670);
    drawText('Cliente: ' + invoiceData.cliente.nombre + ' ' + invoiceData.cliente.apellido, 50, 650);
  
    // Dibuja los detalles de la factura
    let y = 580;
    for (const detalle of invoiceData.detalles) {
      const { cantidad, precioUnitario, producto } = detalle;
      drawText(producto.nombre, 50, y, primaryColor, 14);
      drawText('Característica: ' + producto.caracteristica, 50, y - 20);
      drawText('Cantidad: ' + cantidad, 50, y - 40);
      drawText('Precio unitario: $' + precioUnitario.toFixed(2), 50, y - 60);
      drawText('Total: $' + (cantidad * precioUnitario).toFixed(2), 50, y - 80, primaryColor, 14);
      y -= 120;
    }
  
    // Dibuja los totales de la factura
    drawText('Subtotal: $' + invoiceData.subTotal.toFixed(2), 400, 200, primaryColor, 16);
    drawText('IVA: $' + invoiceData.iva.toFixed(2), 400, 180, primaryColor, 16);
    drawText('Total: $' + invoiceData.total.toFixed(2), 400, 160, primaryColor, 18);
  
    // Guarda el documento PDF en un objeto Blob
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
    // Descarga el PDF en el cliente
    saveAs(blob, 'factura.pdf');
  };
  

export default generateInvoicePDF
  