const InmuebleService = require('../services/InmuebleService');
const ImageneService = require('../services/ImagenesService');

exports.getAll = async(req,res)=>{
    const inmuebleService = new InmuebleService();
    const imagenesService = new ImageneService();
    try {
        const {query:{cantidad,order,desde}} = req;
        const admin = req.header('x-auth-token') ? 1 : 0;
        const inmuebles = await inmuebleService.getAll(admin,desde,cantidad,order,null);
        if(inmuebles.length === 0){
            res.status(200).json({
                ok:true,
                inmuebles:[]
            });
            return;
        }

        let casas = [];
        inmuebles.forEach((inmueble) => {
            casas.push(inmueble.id);
        });

        const imagenesHeaders = await imagenesService.getHeaders(casas);
        
        inmuebles.forEach(inmueble=>{
            imagenesHeaders.forEach(header=>{
                if(inmueble.id == header.idCasa){
                    inmueble.header = header.nombre;
                }
            })
        })
        res.status(200).json({
            ok:true,
            inmuebles
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.filtrar = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    const imagenesService = new ImageneService();
    try {
        const admin = req.header('x-auth-token') ? 1 : 0;
        const {query:{cantidad,order,desde},body:{filtros}} = req;
        const inmuebles = await inmuebleService.getAll(admin,desde,cantidad,order,filtros);
        if(inmuebles.length === 0){
            res.status(200).json({
                ok:true,
                inmuebles:[]
            });
            return;
        }

        let casas = [];
        inmuebles.forEach((inmueble) => {
            casas.push(inmueble.id);
        });

        const imagenesHeaders = await imagenesService.getHeaders(casas);
        
        inmuebles.forEach(inmueble=>{
            imagenesHeaders.forEach(header=>{
                if(inmueble.id == header.idCasa){
                    inmueble.header = header.nombre;
                }
            })
        })
        res.status(200).json({
            ok:true,
            inmuebles
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.findById = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    const imagenesService = new ImageneService();
    try {
        const {id} = req.params;
        const inmueble = await inmuebleService.getOne(id);
        const imagenes = await imagenesService.getByIdCasa(id);
        res.status(200).json({
            ok:true,
            inmueble,
            imagenes
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.create = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    try {
        const {body} = req;
        const createBarrio = await inmuebleService.create(body);
        res.status(200).json({
            ok:true,
            info:createBarrio
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.update = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    try {
        const {body,params:{id}} = req;
        const updateInmueble = await inmuebleService.update(body,id);
        res.status(200).json({
            ok:true,
            info:updateInmueble
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.delete = async (req,res)=>{
    const inmuebleService = new InmuebleService();
    try {
        const {params:{id}} = req;
        const deleteBarrio = await inmuebleService.delete(id);
        res.status(200).json({
            ok:true,
            info:deleteBarrio
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}

exports.updateEstado = async(req,res)=>{
    const inmuebleService = new InmuebleService();
    try {
        const {params:{id}} = req;
        const updateEstado = await inmuebleService.updateEstado(id);
        res.status(200).json({
            ok:true,
            info:updateEstado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:error.message,
            info:{error}
        })
    }
}