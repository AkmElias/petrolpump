import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
import datetime

from .models import ExpenditureList


class ExpenditureListType(DjangoObjectType):
    class Meta:
        model = ExpenditureList


class Query(graphene.ObjectType):
    current_months_expenditure_list = graphene.List(ExpenditureListType)
    expenditure_list_by_category = graphene.List(
        ExpenditureListType, expenditure_category=graphene.String(required=True))
    expenditure_list_by_month = graphene.List(
        ExpenditureListType, expenditure_category=graphene.String(required=True))
    expenditure_list_by_selected_month = graphene.List(
        ExpenditureListType, month=graphene.Int(required=True), year=graphene.Int(required=True))

    def resolve_current_months_expenditure_list(self, info):
        today = datetime.date.today()

        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see expenditure list.')

        return ExpenditureList.objects.filter(pump_id=user.pump_id).filter(issued_date__year=today.year, issued_date__month=today.month)

    def resolve_expenditure_list_by_category(self, info, expenditure_category):
        expenditure_category = expenditure_category.lower()
        today = datetime.datetime.now()

        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see expenditure list.')

        return ExpenditureList.objects.filter(pump_id=user.pump_id).filter(expenditure_category=expenditure_category).filter(issued_date__date=datetime.datetime.date(today))

    def resolve_expenditure_list_by_selected_month(self, info, month, year):
        today = datetime.date.today()

        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see expenditure list.')

        return ExpenditureList.objects.filter(pump_id=user.pump_id).filter(issued_date__year=year, issued_date__month=month)


class CreateExpenditureList(graphene.Mutation):
    expenditure_list = graphene.Field(ExpenditureListType)

    class Arguments:
        voucher_no = graphene.String(required=True)
        expenditure_category = graphene.String(required=True)
        amount = graphene.Float(required=True)
        spent_by = graphene.String(required=True)
        description = graphene.String(required=True)
        issued_date = graphene.String()
        unix_issued_date = graphene.String()
        method_of_payment = graphene.String(required=True)
        approved_by = graphene.String(required=True)
        received_by = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        # pump = Pump.objects.get(id=user.pump_id)

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to add expenditure.')

        expenditure_list = ExpenditureList(
            user=user,
            pump=user.pump,
            voucher_no=kwargs.get('voucher_no'),
            expenditure_category=kwargs.get('expenditure_category'),
            amount=kwargs.get('amount'),
            spent_by=kwargs.get('spent_by'),
            description=kwargs.get('description'),
            issued_date=kwargs.get('issued_date'),
            unix_issued_date=kwargs.get('unix_issued_date'),
            method_of_payment=kwargs.get('method_of_payment'),
            approved_by=kwargs.get('approved_by'),
            received_by=kwargs.get('received_by')
        )

        expenditure_list.save()

        return CreateExpenditureList(expenditure_list=expenditure_list)


class UpdateExpenditureList(graphene.Mutation):
    expenditure_list = graphene.Field(ExpenditureListType)

    class Arguments:
        expenditure_list_id = graphene.Int(required=True)
        voucher_no = graphene.String()
        expenditure_category = graphene.String()
        amount = graphene.Float()
        spent_by = graphene.String()
        description = graphene.String()
        issued_date = graphene.String()
        unix_issued_date = graphene.String()
        method_of_payment = graphene.String()
        approved_by = graphene.String()
        received_by = graphene.String()

    def mutate(self, info, expenditure_list_id, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # getting specific DueCustomer
        expenditure_list = ExpenditureList.objects.get(id=expenditure_list_id)

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O':
            raise GraphQLError('You don\'t have the permission to edit.')

        expenditure_list.voucher_no = kwargs.get('voucher_no')
        expenditure_list.expenditure_category = kwargs.get(
            'expenditure_category')
        expenditure_list.amount = kwargs.get('amount')
        expenditure_list.spent_by = kwargs.get('spent_by')
        expenditure_list.description = kwargs.get('description')
        expenditure_list.issued_date = kwargs.get('issued_date')
        expenditure_list.unix_issued_date = kwargs.get('unix_issued_date')
        expenditure_list.method_of_payment = kwargs.get('method_of_payment')
        expenditure_list.approved_by = kwargs.get('approved_by')
        expenditure_list.received_by = kwargs.get('received_by')

        expenditure_list.save()

        return UpdateExpenditureList(expenditure_list=expenditure_list)


class Mutation(graphene.ObjectType):
    create_expenditure_list = CreateExpenditureList.Field()

    update_expenditure_list = UpdateExpenditureList.Field()
