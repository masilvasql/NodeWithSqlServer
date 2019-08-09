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

    
})