const fs = require('fs');
const path = require('path');

const addLog = require('../middleware/logger');

const uploadImageMiddleware = (req, res, next) => {
    if (req.body.usuario_foto) {
        const base64Data = req.body.usuario_foto.replace(/^data:image\/\w+;base64,/, "");
        const fileName = `foto_${Date.now()}.png`;
        const directoryPath = path.join(__dirname, '../../public/arquivos/');
        const filePath = path.join(directoryPath, fileName);

        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }

        fs.writeFile(filePath, base64Data, 'base64', (err) => {
            if (err) {
                addLog('error_user', err.message);
                return res.status(500).json({ status: 500, message: 'Erro interno do servidor' });
            }
            req.body.usuario_foto = `/arquivos/${fileName}`;
            next();
        });
    } else {
        next();
    }
};

module.exports = uploadImageMiddleware;
