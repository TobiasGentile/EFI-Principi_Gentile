from app import db
from flask import Blueprint, request, jsonify, make_response
from models import Marca, Modelo, Categoria, Equipo, Proveedor, Caracteristica, Stock, Accesorio, AccesorioEquipo
from schemas import MarcaSchema, ModeloSchema, CategoriaSchema, EquipoSchema, ProveedorSchema, CaracteristicaSchema, StockSchema, AccesorioSchema, AccesorioEquipoSchema

celulares_bp = Blueprint('celulares', __name__)

@celulares_bp.route('/marcas', methods=['GET'])
def marcas():
    marcas = Marca.query.all()
    return MarcaSchema().dump(marcas, many=True)

celulares_bp.route('/modelos', methods=['GET', 'POST'])
def modelos():
    if request.method == 'POST':
        data = request.get_json()
        errors = ModeloSchema().validate(data)
        if errors:
            return make_response(jsonify(errors), 400)
        new_modelo = Modelo(**data)
        db.session.add(new_modelo)
        db.session.commit()
        return ModeloSchema().dump(new_modelo), 201

    modelos = Modelo.query.all()
    return ModeloSchema().dump(modelos, many=True)

@celulares_bp.route('/categorias', methods=['GET', 'POST'])
def categorias():
    if request.method == 'POST':
        data = request.get_json()
        errors = CategoriaSchema().validate(data)
        if errors:
            return make_response(jsonify(errors), 400)
        new_categoria = Categoria(**data)
        db.session.add(new_categoria)
        db.session.commit()
        return CategoriaSchema().dump(new_categoria), 201

    categorias = Categoria.query.all()
    return CategoriaSchema().dump(categorias, many=True)

celulares_bp.route('/equipos', methods=['GET', 'POST'])
def nuevo_equipo():
    data = request.get_json()
    
    # Verifica que 'proveedor_id' esté presente y no sea nulo
    if 'proveedor_id' not in data or data['proveedor_id'] is None:
        return make_response(jsonify({"error": "El campo 'proveedor_id' es requerido y no puede ser nulo"}), 400)
    
    errors = EquipoSchema().validate(data)
    if errors:
        return make_response(jsonify(errors), 400)
    
    new_equipo = Equipo(**data)
    db.session.add(new_equipo)
    db.session.commit()
    return EquipoSchema().dump(new_equipo), 201
def equipos():
    if request.method == 'POST':
        data = request.get_json()
        errors = EquipoSchema().validate(data)
        if errors:
            return make_response(jsonify(errors), 400)
        new_equipo = Equipo(**data)
        db.session.add(new_equipo)
        db.session.commit()
        return EquipoSchema().dump(new_equipo), 201

    equipos = Equipo.query.all()
    return EquipoSchema().dump(equipos, many=True)

celulares_bp.route('/proveedores', methods=['GET', 'POST'])
def proveedores():
    if request.method == 'POST':
        data = request.get_json()
        errors = ProveedorSchema().validate(data)
        if errors:
            return make_response(jsonify(errors), 400)
        new_proveedor = Proveedor(**data)
        db.session.add(new_proveedor)
        db.session.commit()
        return ProveedorSchema().dump(new_proveedor), 201

    proveedores = Proveedor.query.all()
    return ProveedorSchema().dump(proveedores, many=True)

@celulares_bp.route('/caracteristicas', methods=['GET', 'POST', 'PUT', 'DELETE'])
def caracteristicas():
    if request.method == 'POST':
        # Crear una nueva característica
        data = request.get_json()
        errors = CaracteristicaSchema().validate(data)
        if errors:
            return make_response(jsonify(errors), 400)
        new_caracteristica = Caracteristica(**data)
        db.session.add(new_caracteristica)
        db.session.commit()
        return CaracteristicaSchema().dump(new_caracteristica), 201

    elif request.method == 'PUT':
        # Actualizar una característica existente
        data = request.get_json()
        caracteristica_id = data.get('id')  # Se espera que el ID esté en el cuerpo de la solicitud

        if not caracteristica_id:
            return make_response(jsonify({"error": "El id de la característica es requerido"}), 400)

        caracteristica = Caracteristica.query.get(caracteristica_id)

        if not caracteristica:
            return make_response(jsonify({"error": "Característica no encontrada"}), 404)

        # Actualizar los campos de la característica con los nuevos datos
        for key, value in data.items():
            setattr(caracteristica, key, value)

        db.session.commit()

        return CaracteristicaSchema().dump(caracteristica), 200

    elif request.method == 'DELETE':
        # Eliminar una característica existente
        caracteristica_id = request.args.get('id')  # Se espera que el ID esté como parámetro en la URL

        if not caracteristica_id:
            return make_response(jsonify({"error": "El id de la característica es requerido"}), 400)

        caracteristica = Caracteristica.query.get(caracteristica_id)

        if not caracteristica:
            return make_response(jsonify({"error": "Característica no encontrada"}), 404)

        db.session.delete(caracteristica)
        db.session.commit()

        return make_response(jsonify({"message": "Característica eliminada"}), 200)

    else:
        # Obtener todas las características
        caracteristicas = Caracteristica.query.all()
        return CaracteristicaSchema().dump(caracteristicas, many=True)
celulares_bp.route('/stocks', methods=['GET', 'POST'])
def stocks():
    if request.method == 'POST':
        data = request.get_json()
        errors = StockSchema().validate(data)
        if errors:
            return make_response(jsonify(errors), 400)
        new_stock = Stock(**data)
        db.session.add(new_stock)
        db.session.commit()
        return StockSchema().dump(new_stock), 201

    stocks = Stock.query.all()
    return StockSchema().dump(stocks, many=True)

celulares_bp.route('/accesorios', methods=['GET', 'POST'])
def accesorios():
    if request.method == 'POST':
        data = request.get_json()
        errors = AccesorioSchema().validate(data)
        if errors:
            return make_response(jsonify(errors), 400)
        new_accesorio = Accesorio(**data)
        db.session.add(new_accesorio)
        db.session.commit()
        return AccesorioSchema().dump(new_accesorio), 201

    accesorios = Accesorio.query.all()
    return AccesorioSchema().dump(accesorios, many=True)

@celulares_bp.route('/accesorioequipo', methods=['GET', 'POST'])
def accesorio_equipo():
    if request.method == 'POST':
        data = request.get_json()
        errors = AccesorioEquipoSchema().validate(data)
        if errors:
            return make_response(jsonify(errors), 400)
        new_accesorio_equipo = AccesorioEquipo(**data)
        db.session.add(new_accesorio_equipo)
        db.session.commit()
        return AccesorioEquipoSchema().dump(new_accesorio_equipo), 201

    accesorio_equipo = AccesorioEquipo.query.all()
    return AccesorioEquipoSchema().dump(accesorio_equipo, many=True)
