import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.contrib.auth import get_user_model

from .models import Supplier, ProductCategory, Product, SoldProduct


# Type for individual Supplier field
class SupplierType(DjangoObjectType):
    class Meta:
        model = Supplier


# Type for individual ProductCategory field
class ProductCategoryType(DjangoObjectType):
    class Meta:
        model = ProductCategory


# Type for individual Product field
class ProductType(DjangoObjectType):
    class Meta:
        model = Product


class SoldProductType(DjangoObjectType):
    class Meta:
        model = SoldProduct


class Query(graphene.ObjectType):
    suppliers = graphene.List(SupplierType)
    product_categories = graphene.List(ProductCategoryType)
    products = graphene.List(ProductType)

    def resolve_suppliers(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see suppliers.')

        return Supplier.objects.filter(pump_id=user.pump_id)

    def resolve_product_categories(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see product categories.')

        return ProductCategory.objects.filter(pump_id=user.pump_id)

    def resolve_products(self, info):

        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see products.')

        return Product.objects.filter(pump_id=user.pump_id)


class CreateSupplier(graphene.Mutation):
    supplier = graphene.Field(SupplierType)

    class Arguments:
        company_name = graphene.String(required=True)
        company_address = graphene.String(required=True)
        company_bank_name = graphene.String()
        company_bank_branch_name = graphene.String()
        company_bank_account_name = graphene.String()
        company_bank_account_number = graphene.String()
        company_bank_routing_number = graphene.String()
        method_of_payment = graphene.String()
        contact_person_name = graphene.String(required=True)
        contact_person_designation = graphene.String(required=True)
        contact_person_contact_info = graphene.String(required=True)

    def mutate(
        self,
        info,
        **kwargs
    ):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to add supplier.')

        supplier = Supplier(
            user=user,
            pump=user.pump,
            company_name=kwargs.get('company_name'),
            company_address=kwargs.get('company_address'),
            company_bank_name=kwargs.get('company_bank_name'),
            company_bank_branch_name=kwargs.get('company_bank_branch_name'),
            company_bank_account_name=kwargs.get('company_bank_account_name'),
            company_bank_account_number=kwargs.get(
                'company_bank_account_number'),
            company_bank_routing_number=kwargs.get(
                'company_bank_routing_number'),
            method_of_payment=kwargs.get('method_of_payment'),
            contact_person_name=kwargs.get('contact_person_name'),
            contact_person_designation=kwargs.get(
                'contact_person_designation'),
            contact_person_contact_info=kwargs.get(
                'contact_person_contact_info')
        )

        supplier.save()

        return CreateSupplier(supplier=supplier)


class UpdateSupplier(graphene.Mutation):
    supplier = graphene.Field(SupplierType)

    class Arguments:
        supplier_id = graphene.Int(required=True)
        company_name = graphene.String()
        company_address = graphene.String()
        company_bank_name = graphene.String()
        company_bank_branch_name = graphene.String()
        company_bank_account_name = graphene.String()
        company_bank_account_number = graphene.String()
        company_bank_routing_number = graphene.String()
        method_of_payment = graphene.String()
        contact_person_name = graphene.String()
        contact_person_designation = graphene.String()
        contact_person_contact_info = graphene.String()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # getting specific supplier
        supplier = Supplier.objects.get(id=kwargs.get('supplier_id'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O' or supplier.user_id != user.id:
            raise GraphQLError('You don\'t have the permission to edit.')

        supplier.company_name = kwargs.get('company_name')
        supplier.company_address = kwargs.get('company_address')
        supplier.company_bank_name = kwargs.get('company_bank_name')
        supplier.company_bank_branch_name = kwargs.get(
            'company_bank_branch_name')
        supplier.company_bank_account_name = kwargs.get(
            'company_bank_account_name')
        supplier.company_bank_account_number = kwargs.get(
            'company_bank_account_number')
        supplier.company_bank_routing_number = kwargs.get(
            'company_bank_routing_number')
        supplier.method_of_payment = kwargs.get('method_of_payment')
        supplier.contact_person_name = kwargs.get('contact_person_name')
        supplier.contact_person_designation = kwargs.get(
            'contact_person_designation')
        supplier.contact_person_contact_info = kwargs.get(
            'contact_person_contact_info')

        supplier.save()

        return UpdateSupplier(supplier=supplier)


class CreateProductCategory(graphene.Mutation):
    product_category = graphene.Field(ProductCategoryType)

    class Arguments:
        category = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to add product category.')
        if user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to do this operation.')

        product_category = ProductCategory(
            user=user,
            pump=user.pump,
            category=kwargs.get('category')
        )

        product_category.save()

        return CreateProductCategory(product_category=product_category)


class UpdateProductCategory(graphene.Mutation):
    product_category = graphene.Field(ProductCategoryType)

    class Arguments:
        product_category_id = graphene.Int(required=True)
        category = graphene.String()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # getting specific product_category
        product_category = ProductCategory.objects.get(
            id=kwargs.get('product_category_id'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O' or product_category.user_id != user.id:
            raise GraphQLError('You don\'t have the permission to edit.')

        product_category.category = kwargs.get('category')

        product_category.save()

        return UpdateProductCategory(product_category=product_category)


class CreateProduct(graphene.Mutation):
    product = graphene.Field(ProductType)

    class Arguments:
        product_category = graphene.Int(required=True)
        product_supplier = graphene.Int(required=True)
        product_quantity = graphene.Int(required=True)
        unit = graphene.String(required=True)
        purchase_price = graphene.Float(required=True)
        selling_price = graphene.Float(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        product_category_id = ProductCategory.objects.get(
            id=kwargs.get('product_category'))
        product_supplier_id = Supplier.objects.get(
            id=kwargs.get('product_supplier'))

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to add product.')
        if user.role != 'O':
            raise GraphQLError(
                'You don\'t have the permission to do this operation.')

        product = Product(
            user=user,
            pump=user.pump,
            product_category=product_category_id,
            product_supplier=product_supplier_id,
            product_quantity=kwargs.get('product_quantity'),
            unit=kwargs.get('unit'),
            purchase_price=kwargs.get('purchase_price'),
            selling_price=kwargs.get('selling_price'),
        )

        product.save()

        return CreateProduct(product=product)


class UpdateProduct(graphene.Mutation):
    product = graphene.Field(ProductType)

    class Arguments:
        product_id = graphene.Int(required=True)
        product_category = graphene.Int()
        product_supplier = graphene.Int()
        product_quantity = graphene.Int()
        unit = graphene.String()
        purchase_price = graphene.Float()
        selling_price = graphene.Float()

    def mutate(self, info, product_id, product_category, product_supplier, product_quantity, unit, purchase_price, selling_price):
        # getting Authenticated user
        user = info.context.user or None

        # getting specific product, supplier of this product, category of this product
        product = Product.objects.get(id=kwargs.get('product_id'))
        product_category_id = ProductCategory.objects.get(
            id=kwargs.get('product_category'))
        product_supplier_id = Supplier.objects.get(
            id=kwargs.get('product_supplier'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O' or product.user_id != user.id:
            raise GraphQLError('You don\'t have the permission to edit.')

        product.product_category = product_category_id
        product.product_supplier = product_supplier_id
        product.product_quantity = kwargs.get('product_quantity')
        product.unit = kwargs.get('unit')
        product.purchase_price = kwargs.get('purchase_price')
        product.selling_price = kwargs.get('selling_price')

        product.save()

        return UpdateProduct(product=product)


class CreateSoldProduct(graphene.Mutation):
    sold_product = graphene.Field(SoldProductType)

    class Arguments:
        product = graphene.Int(required=True)
        previous_product_quantity = graphene.Int(required=True)
        sold_product_quantity = graphene.Int(required=True)

    def mutate(self, info, **kwargs):
        user = info.context.user or None
        product_id = Product.objects.get(id=kwargs.get('product'))

        if user.is_anonymous:
            raise GraphQLError('Please login to add product.')

        sold_product = SoldProduct(
            user=user,
            pump=user.pump,
            product=product_id,
            previous_product_quantity=kwargs.get('previous_product_quantity'),
            sold_product_quantity=kwargs.get('sold_product_quantity')
        )

        sold_product.save()

        return CreateSoldProduct(sold_product=sold_product)


class Mutation(graphene.ObjectType):
    create_supplier = CreateSupplier.Field()
    create_product_category = CreateProductCategory.Field()
    create_product = CreateProduct.Field()
    create_sold_product = CreateSoldProduct.Field()
    update_supplier = UpdateSupplier.Field()
    update_product_category = UpdateProductCategory.Field()
    update_product = UpdateProduct.Field()
