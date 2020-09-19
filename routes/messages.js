var express = require('express');
var router = express.Router();

const Message = require('../persistencia/messages-sql')
const www = require('../bin/www')
const Joi = require('joi')


/*------------------Métodos GET -------------------- */

/* Retorna todos los mensajes */
router.get('/messages/', function(req, res) {
    Message.findAll().then((result)=> res.send(result))
    
});

router.get('/messages/:ts', function(req, res){
        
        Message.findAll({where: {ts:req.params.ts}}).then((result)=> res.send(result[0]))
    
});

/*------------------Métodos POST -------------------- */


router.post('/messages/', function(req, res){
    
    const {error} = validateMsg(req.body)

    if(error){
        res.status(400).send(error)
    }else{
        www.send(req.body)
        res.sendStatus(200) 
    }
   
})


module.exports = router;

/*------------------Métodos PUT -------------------- */

router.put('/messages/:id', function (req,res){
    const {error} = validateMsg(req.body)

    if(error){
        res.status(400).send(error) 

    }else{

            Message.update(req.body, {where:{ts:req.params.id}}).then((response)=>{
            if(response[0]!== 0 ){
                res.send({message:'Mensaje actualizado exitosamente'})
            }else{
                res.status(400).send({message:'No se encontró el mensaje con ts indicado'})
            }
        })
    }

    

})




/*------------------Métodos DELETE -------------------- */


router.delete('/messages/:id', function (req,res){
    //TODO: Validaciones

    Message.destroy({where:{ts:req.params.id}}).then((response)=>{
        if(response === 1 ){
            res.status(204).send()
        }else{
            res.status(404).send({message:'No se encontró el mensaje con ts indicado'})
        }
    })

})



/*------------------ Validaciones -------------------- */

const validateMsg = (msg) =>{

    const schema = Joi.object({
        message: Joi.string().min(5).required(),
        author: Joi.string().pattern(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+ [a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required(),
        ts: Joi.number().required()

    })

    return schema.validate(msg)
}   