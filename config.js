const path = require('path');

const rootPath = __dirname;

module.exports = {
    rootPath,
    uploadPath: path.join(rootPath, 'public/uploads'),
    mysqlConfig: {
        host: 'localhost',
        user: 'root',
        password: 'a215509ppn',
        database: 'nazik_danilova_laba',
    }
};