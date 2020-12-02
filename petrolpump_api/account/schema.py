import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.contrib.auth import get_user_model

from .models import Pump, Account

# Type for individual pump fields, which is assigned to the Pump model


class PumpType(DjangoObjectType):
    class Meta:
        model = Pump


# Type for individual account filed, which assigned to Account model
class AccountType(DjangoObjectType):
    class Meta:
        model = Account


# Query for pumps and account
class Query(graphene.ObjectType):
    pumps = graphene.List(PumpType)
    me = graphene.Field(AccountType)

    def resolve_pumps(self, info):
        return Pump.objects.all()

    def resolve_me(self, info):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('Not logged in.')
        return user


# Creating a petrol pump with owner
class CreatePump(graphene.Mutation):
    pump = graphene.Field(PumpType)

    # All of pump arguments
    class Arguments:
        pump_name = graphene.String(required=True)
        address = graphene.String(required=True)
        registration_id = graphene.String()
        owner_name = graphene.String(required=True)
        owner_phone = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        pump = Pump(
            pump_name=kwargs.get('pump_name'),
            address=kwargs.get('address'),
            registration_id=kwargs.get('registration_id'),
            owner_name=kwargs.get('owner_name'),
            owner_phone=kwargs.get('owner_phone'),
        )

        pump.save()

        return CreatePump(pump=pump)


class CreateAccount(graphene.Mutation):
    account = graphene.Field(AccountType)

    # All of account arguments
    class Arguments:
        pump = graphene.Int(required=True)
        username = graphene.String(required=True)
        phone = graphene.String(required=True)
        email = graphene.String()
        password = graphene.String(required=True)
        role = graphene.String(required=True)

    def mutate(self, info, **kwargs):
        pump_id = Pump.objects.get(id=kwargs.get('pump'))
        # Getting authenticated user
        user = info.context.user or None

        if user.is_anonymous:
            if pump_id.id != kwargs.get('pump') or kwargs.get('role') != 'O':
                raise GraphQLError(
                    'You don\'t have the permission to do this operation.')

        if not user.is_anonymous:
            if user.role != 'O' or pump_id.id != user.pump_id:
                raise GraphQLError(
                    'You don\'t have the permission to do this operation.')

        account = get_user_model()(
            pump=pump_id,
            username=kwargs.get('username'),
            phone=kwargs.get('phone'),
            email=kwargs.get('email'),
            role=kwargs.get('role'),
        )

        account.set_password(kwargs.get('password'),)
        account.save()

        return CreateAccount(account=account)


class Mutation(graphene.ObjectType):
    create_pump = CreatePump.Field()
    create_account = CreateAccount.Field()
