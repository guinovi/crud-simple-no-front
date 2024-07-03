const path = require('path');
const db = require(path.join(__dirname, '..', 'db', 'db.js'));

// (/) all
const getAll = (req, res) => {
    const query = `
      SELECT estudiante.id, estudiante.name as NOMBRE, estudiante.lastname as APELLIDO, estudiante.escuela as ESCUELA, notas.lengua as LENGUA, notas.mate as MATEMATICA
      FROM estudiante
      JOIN notas ON estudiante.id = notas.estudiante_id;
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
};

const getID = (req, res) => {
    const id = req.params.id;
    const query = `
      SELECT estudiante.name as NOMBRE, estudiante.lastname as APELLIDO, estudiante.escuela as ESCUELA, notas.lengua as LENGUA, notas.mate as MATEMATICA
      FROM estudiante
      JOIN notas ON estudiante.id = notas.estudiante_id
      WHERE estudiante.id =?;`
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Server Error');
        }
        res.json(results);
    });
};

const postItem = (req, res)=>{
    console.log(req.body)
    const {name, lastname, escuela, lengua, mate} = req.body;
    const query = `INSERT INTO estudiante (name, lastname, escuela) VALUES (?,?,?)`
    db.query(query, [name, lastname, escuela], (err, result)=>{
        if(err){
            console.error('Error al insertar estudiante: '+err.stack);
            res.status(500).send('Error al insertar estudiante');
            return;
        }
        console.log('Estudiante '+name+' insertado correctamente');
        const idEstudiante = result.insertId;
        console.log(result.insertId)
        const query2 = `INSERT INTO notas (lengua, mate, estudiante_id) VALUES (?,?,?)`
        db.query(query2, [lengua, mate, idEstudiante], (err, result2)=>{
            if(err){
                console.error('Error al insertar notas: '+err.stack);
                res.status(500).send('Error al insertar notas');
                return;
            }
            console.log('Notas insertadas correctamente');
            res.status(201).send('Estudiante y notas insertados correctamente');
        });
    
    }); 

}


const putItem = (req, res)=>{
    const {name, lastname, escuela, lengua, mate} = req.body;
    const id = req.params.id;
    const query = `UPDATE estudiante SET name=?, lastname=?, escuela=? WHERE id=?`
    db.query(query, [name, lastname, escuela, id], (err, result)=>{
        if(err){
            console.error('Error al actualizar estudiante: '+err.stack);
            res.status(500).send('Error al actualizar estudiante');
            return;
        }
        console.log('Estudiante '+id+' actualizado correctamente');
        const query2 = `UPDATE notas SET lengua=?, mate=? WHERE estudiante_id=?`
        db.query(query2, [lengua, mate, id], (err, result2)=>{
            if(err){
                console.error('Error al actualizar notas: '+err.stack);
                res.status(500).send('Error al actualizar notas');
                return;
            }
            console.log('Notas actualizadas correctamente');
            res.status(200).send('Estudiante y notas actualizados correctamente');
        });
    });
}


const deleteItem = (req, res)=>{
    const id = req.params.id;
    const query2 = 'DELETE from notas WHERE estudiante_id=?';
    db.query(query2, id, (err, result)=>{
        if( err){
            console.error('Error al elminar las notas del ID N°: ',id);
            res.status(500).send('Error al eliminar registro')
            return;
        }
        console.log('Se eliminaron las NOTAS del registro N°:', id);
    })
    const query = `DELETE from estudiante WHERE id = ?`;
    db.query(query, id, (err, result)=>{
        if(err){
            console.error('Error al eliminar registro: '+err.stack);
            res.status(500).send('Error al eliminar registro')
            return;
        }
        console.log('Se elimino el registro N°:', id);
        res.status(200).send('REGISTRO ELIMINADO')
    })
    

};



//export modules
module.exports = {
    getAll,
    getID,
    postItem,
    putItem,
    deleteItem
};