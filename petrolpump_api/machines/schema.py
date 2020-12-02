import graphene
from graphene_django import DjangoObjectType
from graphql import GraphQLError
from django.contrib.auth import get_user_model
from django.db.models import Q

from .models import Machine
from account.models import Pump


class MachineType(DjangoObjectType):
    class Meta:
        model = Machine


class Query(graphene.ObjectType):
    machines = graphene.List(MachineType)
    machine_by_id = graphene.List(
        MachineType, machine_id=graphene.Int(required=True))

    def resolve_machines(self, info):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see machines.')

        return Machine.objects.filter(pump_id=user.pump_id)

    def resolve_machine_by_id(self, info, machine_id):
        # Getting authenticated user
        user = info.context.user or None

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to see machines.')

        return Machine.objects.filter(id=machine_id).filter(pump_id=user.pump_id)


class CreateMachine(graphene.Mutation):
    machine = graphene.Field(MachineType)

    class Arguments:
        machine_name = graphene.String(required=True)
        no_of_dispensers = graphene.Int(required=True)

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None
        # pump = Pump.objects.get(id=user.pump_id)

        # Returning error if user not authenticated
        if user.is_anonymous:
            raise GraphQLError('Please login to add machine.')

        machine = Machine(
            user=user,
            pump=user.pump,
            machine_name=kwargs.get('machine_name'),
            no_of_dispensers=kwargs.get('no_of_dispensers')
        )

        machine.save()

        return CreateMachine(machine=machine)


class UpdateMachine(graphene.Mutation):
    machine = graphene.Field(MachineType)

    class Arguments:
        machine_id = graphene.Int(required=True)
        machine_name = graphene.String()
        no_of_dispensers = graphene.Int()

    def mutate(self, info, **kwargs):
        # Getting authenticated user
        user = info.context.user or None

        # Getting machine
        machine = Machine.objects.get(id=kwargs.get('machine_id'))

        # Returning error if user not authenticated
        if user.is_anonymous or user.role != 'O' or machine.user_id != user.id:
            raise GraphQLError('You don\'t have the permission to edit.')

        machine.machine_name = kwargs.get('machine_name')
        machine.no_of_dispensers = kwargs.get('no_of_dispensers')
        machine.save()

        return UpdateMachine(machine=machine)


class Mutation(graphene.ObjectType):
    create_machine = CreateMachine.Field()
    update_machine = UpdateMachine.Field()
