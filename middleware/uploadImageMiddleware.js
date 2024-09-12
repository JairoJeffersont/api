const fs = require('fs');
const path = require('path');

const uploadImageMiddleware = (req, res, next) => {
    if (req.body.usuario_foto) {
        const base64Data = req.body.usuario_foto.replace(/^data:image\/\w+;base64,/, "");
        const fileName = `foto_${Date.now()}.png`; // Você pode alterar a extensão se necessário
        const filePath = path.join(__dirname, '../public/arquivos/', fileName);

        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                return res.status(500).json({ status: 500, message: 'Erro ao salvar o arquivo.' });
            }
            req.body.usuario_foto = `/arquivos/${fileName}`;
            next();
        });
    } else {
        next();
    }
};

module.exports = uploadImageMiddleware;
