const sql = require('mssql')
const config = require('../../src/config/dbConfig')

module.exports = (app => {
    sql.close()
    app.get('/carros', (req, res) => {
        sql.connect(config).then(() => {
            return sql.query('SELECT * FROM CARROS')
        }).then(result => {
            res.send(result.recordset)
            sql.close()
        }).catch(err => {
            res.send("Erro ao executar ação")
            sql.close()
        })
    })

    app.post('/insereCarro', (req, res) => {
        sql.close()
        var conn = new sql.connect(config, (err) => {
        var transaction = new sql.Transaction(conn)
            transaction.begin(err => {
                const request = new sql.Request(conn)
                request.query(`INSERT INTO CARROS (CARRO, FABRICANTE) VALUES ('${req.body.carro}', '${req.body.fabricante}')`, (err, result) => {
                    transaction.commit(erro => {
                        if(!err){
                            res.send("Carro inserido")
                        }
                        sql.close()
                    })
                })
            })
        })
    })
 
})