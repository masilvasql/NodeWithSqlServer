const sql = require('mssql')
const config = require('../../src/config/dbConfig')

module.exports = (app=>{
    app.get('/alunos',(req,res)=>{
        sql.connect(config).then(()=>{
            return sql.query `SELECT * FROM ALUNO`
        }).then(result=>{
            res.send(result.recordset)
            sql.close()
        }).catch(err=>{
            res.send("Erro ao executar ação")
            sql.close()
        })
        
    })

    app.get('/aluno', (req,res)=>{
        sql.connect(config).then(()=>{
            return sql.query `SELECT 
                                * 
                              FROM 
                                ALUNO 
                              WHERE 
                                NOMEALUNO =  ${req.body.nome}`
        }).then(result =>{
            res.send(result.recordset)
            sql.close()
        }).catch(err=>{
            res.send("Erro ao executar ação 2")
            sql.close()
        })
    })

    app.post('/insereAluno', (req, res) => {
        const dados = req.body.data
        console.log(dados)
        sql.close()
        var conn = new sql.connect(config, (err) => {
        var transaction = new sql.Transaction(conn)
            transaction.begin(err => {
                const request = new sql.Request(conn)
                request.query(`INSERT INTO ALUNO 
                                    (NOMEALUNO, 
                                    SEXO, 
                                    NASCIMENTO, 
                                    EMAIL) 
                                VALUES 
                                    ('${dados.nome}', 
                                    '${dados.sexo}',
                                    '${dados.nascimento}',
                                    '${dados.email}'
                                    )
                                    `, (err, result) => {
                    transaction.commit(erro => {
                        if(!err){
                            res.send("Aluno Inserido")
                        }else{
                            console.log(err)
                        }
                        sql.close()
                    })
                })
            })
        })
    })

    
})