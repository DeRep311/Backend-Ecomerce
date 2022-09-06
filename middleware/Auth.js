module.exports={
    Auth(req, res, next){
        const admin = true;
        if (admin) {
            next();
        } else {
            res.status(403).json({'error': 'No tiene el permiso necesario'})
        }
    }

}