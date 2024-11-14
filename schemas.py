from app import ma
from models import User, Modelo, Categoria, Equipo, Proveedor, Caracteristica, Stock, Accesorio, AccesorioEquipo, Celular, Fabricante, Fabrica, Marca
from marshmallow import validates, ValidationError  
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

# Esquema minimalista para el modelo User
class MinimalUserSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True


class BaseSchema(ma.SQLAlchemySchema):
    class Meta:
        load_instance = True

class UserSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = User

    id = ma.auto_field()
    username = ma.auto_field()
    password_hash = ma.auto_field()
    is_admin = ma.auto_field()

class ProveedorSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Proveedor

    id = ma.auto_field()
    nombre = ma.auto_field()
    contacto = ma.auto_field()
    direccion = ma.auto_field()

class CategoriaSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Categoria

    id = ma.auto_field()
    nombre = ma.auto_field()

class ModeloSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Modelo

    id = ma.auto_field()
    nombre = ma.auto_field()
    fabricante = ma.Nested('FabricanteSchema')  # Relación con Fabricante
    marca = ma.Nested('MarcaSchema')  # Relación con Marca

class EquipoSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Equipo

    id = ma.auto_field()
    nombre = ma.auto_field()
    costo = ma.auto_field()
    modelo = ma.Nested(ModeloSchema)  # Relación con Modelo
    categoria = ma.Nested(CategoriaSchema)  # Relación con Categoria
    proveedor = ma.Nested(ProveedorSchema)  # Relación con Proveedor
    stock = ma.Nested('StockSchema')  # Relación con Stock

class CaracteristicaSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Caracteristica

    id = ma.auto_field()
    tipo = ma.auto_field()
    descripcion = ma.auto_field()

class StockSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Stock

    id = ma.auto_field()
    cantidad = ma.auto_field()

    @validates('cantidad')
    def validate_cantidad(self, value):
        if value < 0:
            raise ValidationError('La cantidad no puede ser negativa')

class AccesorioSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Accesorio

    id = ma.auto_field()
    nombre = ma.auto_field()
    tipo = ma.auto_field()
    descripcion = ma.auto_field()

class AccesorioEquipoSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = AccesorioEquipo

    id = ma.auto_field()
    accesorio = ma.Nested(AccesorioSchema)  # Relación con Accesorio
    equipo = ma.Nested(EquipoSchema)  # Relación con Equipo

class CelularSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Celular

    id = ma.auto_field()
    nombre = ma.auto_field()
    fabrica = ma.Nested('FabricaSchema')  # Relación con Fabrica
    modelo = ma.Nested(ModeloSchema)  # Relación con Modelo
    categoria = ma.Nested(CategoriaSchema)  # Relación con Categoria
    equipo = ma.Nested(EquipoSchema)  # Relación con Equipo
    proveedor = ma.Nested(ProveedorSchema)  # Relación con Proveedor

    caracteristicas = ma.Nested(CaracteristicaSchema, many=True)
    stock = ma.Nested(StockSchema)
    accesorios = ma.Nested(AccesorioSchema, many=True)

# Nuevos esquemas para los modelos adicionales

class FabricanteSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Fabricante

    id = ma.auto_field()
    nombre = ma.auto_field()
    pais_origen = ma.auto_field()
    modelos = ma.Nested(ModeloSchema, many=True)  # Relación con Modelo

class FabricaSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Fabrica

    id = ma.auto_field()
    nombre = ma.auto_field()

class MarcaSchema(BaseSchema):
    class Meta(BaseSchema.Meta):
        model = Marca

    id = ma.auto_field()
    nombre = ma.auto_field()
    modelos = ma.Nested(ModeloSchema, many=True)  # Relación con Modelo
